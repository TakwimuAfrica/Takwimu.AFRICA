/* eslint-disable react/no-danger */
import React from 'react';
import { PropTypes } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import DataActions from './DataActions';
import { RichTypography } from '../core';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

function DataContainer({ id, data, countryName }) {
  const classes = useStyles();
  return (
    <>
      <div id={`data-indicator-${id}`} className={classes.root}>
        <RichTypography component="div">{data.raw_html}</RichTypography>
      </div>
      <DataActions title={`${countryName}: ${data.title}`} />
    </>
  );
}

DataContainer.propTypes = {
  countryName: PropTypes.string.isRequired,
  data: PropTypes.shape({
    raw_html: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  id: PropTypes.string
};

DataContainer.defaultProps = {
  id: ''
};

export default DataContainer;
