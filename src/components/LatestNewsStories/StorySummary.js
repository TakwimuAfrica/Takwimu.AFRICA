import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    lineHeight: 2.05
  }
});

function StorySummary({ story }) {
  const classes = useStyles();
  return (
    <Typography
      gutterBottom
      variant="body1"
      component="p"
      classes={{ root: classes.root }}
    >
      {story.subtitle}
    </Typography>
  );
}

StorySummary.propTypes = {
  story: PropTypes.shape({
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

export default StorySummary;
