import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import DropDownContent from './DropDownContent';

import bg from '../../assets/images/file-paragraph-bg.svg';

const useStyles = makeStyles({
  container: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat'
  }
});

function profile(country) {
  return country.slug;
}

function CountryAnalysis({
  countries,
  navigation: { country_analysis: countryAnalysis }
}) {
  const classes = useStyles();
  return (
    <DropDownContent
      classes={{
        container: classes.container
      }}
      title="Country Analysis"
      description={countryAnalysis}
      countries={countries}
      profile={profile}
    />
  );
}

CountryAnalysis.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  navigation: PropTypes.shape({
    country_analysis: PropTypes.string
  }).isRequired
};

export default CountryAnalysis;
