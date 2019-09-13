import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  ButtonBase,
  Button,
  Grid,
  Input,
  Popper,
  Paper,
  MenuList,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import classNames from 'classnames';
import Layout from '../Layout';

import searchIcon from '../../assets/images/icon-search.svg';
import downArrow from '../../assets/images/down-arrow-green.svg';
import config from '../../config';

const flagSrc = require.context('../../assets/images/flags', false, /\.svg$/);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '30rem',
    padding: '1.438rem',
    backgroundColor: 'rgba(255, 255, 255, 0.63)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      width: '23.375rem',
      border: 'solid 0.063rem rgba(0, 0, 0, 0.19)',
      borderRadius: '0 0 1.063rem 1.063rem',
      pointerEvents: 'all',
      zIndex: '1'
    }
  },
  layout: {
    zIndex: 999,
    position: 'relative',
    height: '34rem',
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      pointerEvents: 'none'
    }
  },
  label: {
    fontSize: '0.938rem',
    fontWeight: '600'
  },
  verticalLine: {
    width: '0.25rem',
    height: '12.125rem',
    marginLeft: '1.063rem',
    marginRight: '2.188rem',
    backgroundColor: theme.palette.primary.main
  },
  countryName: {
    marginLeft: '1.125rem',
    textAlign: 'start',
    fontSize: '1.75rem',
    width: '11.9rem',
    fontFamily: theme.typography.fontHeading
  },
  chooserButton: {
    marginTop: '0.938rem',
    marginBottom: '1.375rem'
  },
  changeCountryLabel: {
    color: '#848484'
  },
  detailLabel: {
    color: '#231f20',
    lineHeight: 'normal'
  },
  detail: {
    fontSize: '2rem',
    lineHeight: 'normal',
    fontWeight: '600',
    color: '#231f20'
  },
  datasetName: {
    fontSize: '0.938rem',
    textDecoration: 'underline',
    marginRight: '0.625rem',
    marginLeft: '0.25rem'
  },
  searchBar: {
    position: 'relative',
    width: '100%'
  },
  searchBarInput: {
    padding: '0.625rem',
    borderRadius: '0.25rem',
    border: 'solid 0.063rem rgba(151, 151, 151, 0.3)'
  },
  searchBarIcon: {
    position: 'absolute',
    right: '1rem',
    top: '1rem'
  },
  popperIndex: {
    zIndex: 2
  }
}));

function CountrySelectorComponent({ context, country }) {
  const classes = useStyles();
  return (
    <div>
      <Typography
        variant="caption"
        className={classNames([classes.label, classes.changeCountryLabel])}
      >
        Change Country
      </Typography>

      <ButtonBase
        disableRipple
        disableTouchRipple
        style={{ outline: 'none' }}
        className={classes.chooserButton}
        onClick={window.toggleDrawer(context)}
      >
        <img alt="" height="37" src={flagSrc(`./${country.slug}.svg`)} />
        <Typography variant="subtitle2" className={classes.countryName}>
          {country.short_name}
        </Typography>
        <img alt="" src={downArrow} />
      </ButtonBase>
    </div>
  );
}

CountrySelectorComponent.propTypes = {
  context: PropTypes.string.isRequired,
  country: PropTypes.shape({
    slug: PropTypes.string,
    short_name: PropTypes.string
  }).isRequired
};

const CountrySelector = CountrySelectorComponent;

export { CountrySelector };

function ProfileDetail({ profile: { comparable = false, geo = {} } }) {
  const classes = useStyles();
  const searchBarRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = e => {
    const newSearchTerm = e && e.target ? e.target.value : searchTerm;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const { squareKms, geoLevel, totalPopulation } = geo;
  const population = totalPopulation.toFixed(0);
  const populationDensity = (population / squareKms).toFixed(1);
  let country;
  if (geoLevel === 'country') {
    const { geoCode } = geo;
    country = config.countries.find(c => c.iso_code === geoCode);
  } else {
    // if level is not country, then we are in level 1
    // const { parent_geoid: countryGeoId } = geography.this;
    // country = config.countries.find(c => c.iso_code === countryGeoId.slice(8));
    // country.name = geography.this.name;
  }

  return (
    <Grid container justify="center" className={classes.rootContainer}>
      <Layout classes={{ root: classes.layout }}>
        <div className={classes.root}>
          <Grid container direction="column">
            <CountrySelector country={country} context="topic" />
            <Grid container direction="row" wrap="nowrap">
              <Grid item>
                <div className={classes.verticalLine} />
              </Grid>
              <Grid item container direction="column" justify="space-between">
                {population && (
                  <Grid item>
                    <Typography
                      variant="body1"
                      className={classNames([
                        classes.label,
                        classes.detailLabel
                      ])}
                    >
                      Population
                    </Typography>
                    <Typography variant="body1" className={classes.detail}>
                      {Number(population).toLocaleString()}
                    </Typography>
                  </Grid>
                )}
                {squareKms && (
                  <Grid item>
                    <Typography
                      variant="body1"
                      className={classNames([
                        classes.label,
                        classes.detailLabel
                      ])}
                    >
                      Square kilometres
                    </Typography>
                    <Typography variant="body1" className={classes.detail}>
                      {Number(squareKms).toLocaleString()}
                    </Typography>
                  </Grid>
                )}
                {populationDensity && (
                  <Grid item>
                    <Typography
                      variant="body1"
                      className={classNames([
                        classes.label,
                        classes.detailLabel
                      ])}
                    >
                      People per square kilometre
                    </Typography>
                    <Typography variant="body1" className={classes.detail}>
                      {Number(populationDensity).toLocaleString()}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {comparable && (
              <Grid container>
                <div ref={searchBarRef} className={classes.searchBar}>
                  <Input
                    fullWidth
                    disableUnderline
                    className={classes.searchBarInput}
                    onFocus={handleSearch}
                    onBlur={() => setShowSearchResults(false)}
                    placeholder="Compare with"
                    onChange={handleSearch}
                  />
                  <img
                    alt=""
                    src={searchIcon}
                    className={classes.searchBarIcon}
                  />
                </div>

                <Popper
                  className={classes.popperIndex}
                  open={showSearchResults}
                  anchorEl={searchBarRef}
                  style={{
                    width: searchBarRef ? searchBarRef.clientWidth : null
                  }}
                >
                  <Paper>
                    <MenuList>
                      <MenuItem>Example</MenuItem>
                    </MenuList>
                  </Paper>
                </Popper>
              </Grid>
            )}
          </Grid>
          <Button href={`/profiles/${country.slug}`} fullWidth>
            Read the full country analysis
          </Button>
        </div>
      </Layout>
    </Grid>
  );
}

ProfileDetail.propTypes = {
  profile: PropTypes.shape({
    comparable: PropTypes.bool,
    demographics: PropTypes.shape({
      population_density: PropTypes.shape({
        values: PropTypes.shape({
          this: PropTypes.number
        })
      }),
      total_population: PropTypes.shape({
        values: PropTypes.shape({
          this: PropTypes.number
        })
      })
    }),
    geo: PropTypes.shape({
      geoCode: PropTypes.string,
      geoLevel: PropTypes.string,
      name: PropTypes.string,
      squareKms: PropTypes.number,
      totalPopulation: PropTypes.number
    })
  }).isRequired
};

export default ProfileDetail;
