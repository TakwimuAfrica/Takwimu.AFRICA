import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {
  Typography,
  ButtonBase,
  Grid,
  Input,
  Popper,
  Paper,
  MenuList,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import flags from '../../flags';
import ButtonLink from '../Link/Button';
import Layout from '../Layout';

import searchIcon from '../../assets/images/icon-search.svg';
import downArrow from '../../assets/images/down-arrow-green.svg';
import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: props => ({
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.63)',
    display: 'flex',
    flexDirection: 'column',
    height: props.comparable ? '30rem' : '25.5rem',
    justifyContent: 'space-between',
    lineHeight: 'normal',
    padding: '0.875rem 1.438rem 1.5625rem 1.438rem',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '23.375rem',
      border: 'solid 0.063rem rgba(0, 0, 0, 0.19)',
      borderRadius: '0 0 1.063rem 1.063rem',
      pointerEvents: 'all',
      zIndex: '1'
    }
  }),
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
    color: '#231f20',
    fontWeight: 'normal',
    fontSize: '0.938rem',
    lineHeight: 'normal'
  },
  verticalLine: {
    width: '0.25rem',
    height: '12.125rem',
    marginLeft: '1.063rem',
    marginRight: '2.188rem',
    backgroundColor: theme.palette.primary.main
  },
  countryName: {
    fontSize: '1.75rem',
    fontFamily: theme.typography.fontHeading,
    marginLeft: '1.125rem',
    marginRight: '1.125rem',
    textAlign: 'start'
  },
  chooserButton: {
    marginTop: '0.938rem',
    marginBottom: '1.375rem'
  },
  changeCountryLabel: {
    fontWeight: 600,
    fontSize: '0.8125rem',
    color: '#848484'
  },
  valueLabel: {
    fontSize: '2rem',
    fontWeight: 600
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
    <Grid container direction="column">
      <Grid item>
        <Typography
          variant="caption"
          className={classNames([classes.label, classes.changeCountryLabel])}
        >
          Change Country
        </Typography>
      </Grid>
      <Grid item>
        <ButtonBase
          disableRipple
          disableTouchRipple
          style={{ outline: 'none' }}
          className={classes.chooserButton}
          onClick={process.browser && window.toggleDrawer(context)}
        >
          <img alt="" height="37" src={flags[country.iso_code]} />
          <Typography variant="subtitle2" className={classes.countryName}>
            {country.short_name}
          </Typography>
          <img alt="" src={downArrow} />
        </ButtonBase>
      </Grid>
    </Grid>
  );
}

CountrySelectorComponent.propTypes = {
  context: PropTypes.string.isRequired,
  country: PropTypes.shape({
    iso_code: PropTypes.string,
    slug: PropTypes.string,
    short_name: PropTypes.string
  }).isRequired
};

const CountrySelector = CountrySelectorComponent;

export { CountrySelector };

function ProfileDetail({ profile: { comparable = false, geo = {} } }) {
  const classes = useStyles({ comparable });
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

  const { squareKms, geoLevel, totalPopulation, parentCode } = geo;
  const population = totalPopulation.toFixed(0);
  const populationDensity = (population / squareKms).toFixed(1);
  let country;
  if (geoLevel === 'country') {
    const { geoCode } = geo;
    country = config.countries.find(c => c.iso_code === geoCode);
  } else {
    // if level is not country, then we are in level 1
    country = config.countries.find(c => c.iso_code === parentCode);
  }

  return (
    <Grid container justify="center" className={classes.rootContainer}>
      <Layout classes={{ root: classes.layout }}>
        <div className={classes.root}>
          <Grid container direction="column" justify="flex-start">
            <Grid item>
              <CountrySelector country={country} context="topic" />
            </Grid>
            <Grid item>
              <Grid container direction="row" wrap="nowrap">
                <Grid item>
                  <div className={classes.verticalLine} />
                </Grid>
                <Grid item container direction="column" justify="space-between">
                  {population && (
                    <Grid item>
                      <Typography variant="body1" className={classes.label}>
                        Population
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classNames([
                          classes.label,
                          classes.valueLabel
                        ])}
                      >
                        {Number(population).toLocaleString()}
                      </Typography>
                    </Grid>
                  )}
                  {squareKms && (
                    <Grid item>
                      <Typography variant="body1" className={classes.label}>
                        Square kilometres
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classNames([
                          classes.label,
                          classes.valueLabel
                        ])}
                      >
                        {Number(squareKms).toLocaleString()}
                      </Typography>
                    </Grid>
                  )}
                  {populationDensity && (
                    <Grid item>
                      <Typography variant="body1" className={classes.label}>
                        People per square kilometre
                      </Typography>
                      <Typography
                        variant="body1"
                        className={classNames([
                          classes.label,
                          classes.valueLabel
                        ])}
                      >
                        {Number(populationDensity).toLocaleString()}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {comparable && (
              <Grid item>
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
              </Grid>
            )}
          </Grid>
          <ButtonLink
            href="/profiles/[geoIdOrCountrySlug]"
            as={`/profiles/${country.slug}`}
            fullWidth
          >
            Read the full country analysis
          </ButtonLink>
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
      parentCode: PropTypes.string,
      name: PropTypes.string,
      squareKms: PropTypes.number,
      totalPopulation: PropTypes.number
    })
  }).isRequired
};

export default ProfileDetail;
