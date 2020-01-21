import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import StoryCard from './StoryCard';
import StorySummary from './StorySummary';

const useStyles = makeStyles({
  root: {},
  story: {
    width: '100%'
  }
});

function Story({ story }) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      className={classNames([classes.root, classes.story])}
      justify="space-between"
      alignItems="center"
    >
      <StoryCard story={story} classes={{ root: classes.story }} />
      <StorySummary
        subtitle={story.subtitle}
        classes={{ root: classes.story }}
      />
    </Grid>
  );
}

Story.propTypes = {
  story: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
  }).isRequired
};

export default Story;
