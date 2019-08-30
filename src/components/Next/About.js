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
function AboutWhereToNext({ socialMedia, title }) {
  const classes = useStyles();
  return (
    <ContentSection
      title={title}
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
          to="/contact"
          classes={{ root: classes.cardMargin }}
          variant="dual"
        >
          Contact Us
        </Card>
      </Grid>
    </ContentSection>
  );
}

AboutWhereToNext.propTypes = {
  socialMedia: PropTypes.shape({
    medium: PropTypes.string
  }).isRequired,
  title: PropTypes.string
};

AboutWhereToNext.defaultProps = {
  title: 'Where to next...'
};

export default AboutWhereToNext;
