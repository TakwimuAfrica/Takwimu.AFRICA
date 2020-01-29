import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Typography, ButtonBase, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import flags from '../flags';

import downArrow from '../assets/images/down-arrow-green.svg';

const useStyles = makeStyles(theme => ({
  label: {
    color: '#231f20',
    fontWeight: 'normal',
    fontSize: '0.938rem',
    lineHeight: 'normal'
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
  }
}));

export default function CountrySelector({ context, country }) {
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

CountrySelector.propTypes = {
  context: PropTypes.string.isRequired,
  country: PropTypes.shape({
    iso_code: PropTypes.string,
    slug: PropTypes.string,
    short_name: PropTypes.string
  }).isRequired
};
