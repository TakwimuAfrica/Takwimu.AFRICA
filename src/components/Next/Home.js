import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui';
import Card from './Card';
import Section from '../Section';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: '6.25rem'
  },
  link: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  },
  cardMargin: {
    marginTop: '2rem',
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      marginLeft: '1.5rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '2rem'
    }
  }
}));

function HomeWhereToNext() {
  const classes = useStyles();
  return (
    <Section title="Where to next" variant="h3">
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Card href="//eepurl.com/dynuAX" component={A}>
          Stay up-to-date with <br /> new data and analysis
        </Card>

        <Card
          component={RouterLink}
          to="/services"
          classes={{ root: classes.cardMargin }}
        >
          Looking for other <br /> services?
        </Card>

        <Card
          component={RouterLink}
          to="/contact"
          classes={{ root: classes.cardMargin }}
        >
          Talk to us
        </Card>
      </Grid>
    </Section>
  );
}

HomeWhereToNext.propTypes = {};

export default HomeWhereToNext;
