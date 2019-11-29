import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    lineHeight: 2.05
  }
};

function StorySummary({ classes, subtitle }) {
  return (
    <Typography
      gutterBottom
      variant="body1"
      component="p"
      classes={{ root: classes.root }}
    >
      {subtitle}
    </Typography>
  );
}

StorySummary.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  subtitle: PropTypes.string.isRequired
};

export default withStyles(styles)(StorySummary);
