/* eslint-disable react/no-danger */
import React from 'react';
import { PropTypes } from 'prop-types';

import { withStyles } from '@material-ui/core';

import DataActions from './DataActions';
import { RichTypography } from '../core';

const styles = {
  root: {
    width: '100%'
  }
};

function DataContainer({ id, classes, data, countryName }) {
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
  classes: PropTypes.shape({}).isRequired,
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

export default withStyles(styles)(DataContainer);
