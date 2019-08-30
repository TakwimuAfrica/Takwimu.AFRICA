/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '58.265625rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '77.6875rem'
    }
  },
  title: {
    [theme.breakpoints.up('md')]: {
      width: '51.125rem'
    }
  }
}));

function Layout({ children, ...props }) {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;
