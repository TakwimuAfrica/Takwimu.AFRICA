import React from 'react';
import { PropTypes } from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import A from '../A';
import Card from './Card';
import ContentSection from '../ContentSection';

const useStyles = makeStyles(({ breakpoints }) => ({
  sectionRoot: {
    padding: 0
  },
  root: {
    flexGrow: 1,
    paddingBottom: '2.25rem'
  },
  link: {
    width: '100%',
    [breakpoints.up('md')]: {
      width: 'auto'
    }
  },
  cardMargin: {
    marginTop: '2rem',
    [breakpoints.up('md')]: {
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

        <Card
          component={RouterLink}
          to="/about"
          classes={{ root: classes.cardMargin }}
          variant="dual"
        >
          About Us
        </Card>
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
