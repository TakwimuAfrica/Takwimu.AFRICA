import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import DropDownContent from './DropDownContent';

import bg from '../../assets/images/a-chart-bg.svg';

const useStyles = makeStyles({
  container: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat'
  }
});

function profile(country) {
  return `country-${country.iso_code}-${country.slug}`;
}

function DataByTopic({
  countries,
  navigation: { data_by_topic: dataByTopic }
}) {
  const classes = useStyles();
  return (
    <DropDownContent
      classes={{
        container: classes.container
      }}
      title="Data by Topic"
      description={dataByTopic}
      countries={countries}
      profile={profile}
    />
  );
}

DataByTopic.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  navigation: PropTypes.shape({
    data_by_topic: PropTypes.string
  }).isRequired
};

export default DataByTopic;
