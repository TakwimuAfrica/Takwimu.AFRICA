import React from 'react';
import PropTypes from 'prop-types';

import NextLink from 'next/link';

import { makeStyles, Grid } from '@material-ui/core';

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

function HomeWhereToNext({
  takwimu: {
    settings: { mailingList }
  },
  ...props
}) {
  const classes = useStyles(props);

  return (
    <Section title="Where to next" variant="h3">
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Card href={mailingList.href} component={A}>
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

HomeWhereToNext.propTypes = {
  takwimu: PropTypes.shape({
    settings: PropTypes.shape({
      mailingList: PropTypes.shape({ href: PropTypes.string.isRequired })
        .isRequired
    }).isRequired
  }).isRequired
};

export default HomeWhereToNext;
