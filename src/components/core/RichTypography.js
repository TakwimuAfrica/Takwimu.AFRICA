/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& a': {
      color: theme.palette.primary.main
    }
  }
}));

function RichTypography({ children, variant, ...props }) {
  const classes = useStyles();

  if (!children) {
    return null;
  }

  return (
    <Typography
      variant={variant}
      component="span"
      className={classes.root}
      dangerouslySetInnerHTML={{
        __html: children
      }}
      {...props}
    />
  );
}

RichTypography.propTypes = {
  children: PropTypes.string,
  variant: PropTypes.string
};

RichTypography.defaultProps = {
  children: null,
  variant: 'body1'
};

export default RichTypography;
