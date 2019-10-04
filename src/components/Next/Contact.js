import React from 'react';
import { PropTypes } from 'prop-types';

import NextLink from 'next/link';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui/dist/A';
import Card from './Card';
import ContentSection from '../ContentSection';

const useStyles = makeStyles(theme => ({
  sectionRoot: {
    padding: 0
  },
  root: {
    flexGrow: 1,
    paddingBottom: '2.25rem'
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
      marginTop: 0
    }
  }
}));
function ContactWhereToNext({ socialMedia }) {
  const classes = useStyles();
  return (
    <ContentSection
      title="Where to next..."
      variant="h3"
      classes={{ root: classes.sectionRoot }}
    >
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.root}
      >
        <Card href={socialMedia.medium} variant="dual" component={A}>
          Read our latest articles <br /> on Medium
        </Card>

        <NextLink href="/about">
          <Card
            to="/about"
            classes={{ root: classes.cardMargin }}
            variant="dual"
          >
            About Us
          </Card>
        </NextLink>
      </Grid>
    </ContentSection>
  );
}

ContactWhereToNext.propTypes = {
  socialMedia: PropTypes.shape({
    medium: PropTypes.string
  }).isRequired
};

export default ContactWhereToNext;
