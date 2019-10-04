import React from 'react';

import NextLink from 'next/link';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui/dist/A';
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

        <NextLink href="/services">
          <Card component="a" classes={{ root: classes.cardMargin }}>
            Looking for other <br /> services?
          </Card>
        </NextLink>

        <NextLink href="/contact">
          <Card component="a" classes={{ root: classes.cardMargin }}>
            Talk to us
          </Card>
        </NextLink>
      </Grid>
    </Section>
  );
}

HomeWhereToNext.propTypes = {};

export default HomeWhereToNext;
