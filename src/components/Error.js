import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  title: {
    fontWeight: 'normal'
  },
  description: {
    marginTop: '2.6875rem',
    padding: '1.3125rem 2rem 1.5625rem 2.125rem',
    backgroundColor: theme.palette.info.main
  }
}));

function Error({ children, title, ...props }) {
  const classes = useStyles();
  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <div className={classes.root} {...props}>
      <Typography variant="h1" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.description}>{children}</div>
    </div>
  );
}

Error.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string
};
Error.defaultProps = {
  title: ''
};

export default Error;
