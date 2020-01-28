import React from 'react';
import { PropTypes } from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Section from './Section';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '3.875rem'
  },
  aside: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '16rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '19.0625rem'
    }
  },
  main: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '42.265625rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.4375rem'
    }
  }
}));

function ContentPage({ aside, children }) {
  const classes = useStyles();
  return (
    <Section classes={{ root: classes.root }}>
      <Grid container direction="row">
        <div className={classes.aside}>{aside}</div>
        <div className={classes.main}>{children}</div>
      </Grid>
    </Section>
  );
}

ContentPage.propTypes = {
  aside: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ContentPage;
