import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import StoryCard from './StoryCard';
import StorySummary from './StorySummary';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    flexGrow: 1
  },
  margin: {
    marginLeft: '2.53125rem',
    [breakpoints.up('lg')]: {
      marginLeft: '3.375rem'
    }
  },
  story: {
    width: '17.72625rem',
    [breakpoints.up('lg')]: {
      width: '23.625rem'
    }
  }
}));

function StoryBlocks({ stories }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {stories.slice(0, 3).map((story, index) => (
        <StoryCard
          key={story.url}
          story={story}
          classes={{
            root: classNames([classes.story, { [classes.margin]: index > 0 }])
          }}
        />
      ))}
      {stories.slice(0, 3).map((story, index) => (
        <StorySummary
          key={story.url}
          story={story}
          classes={{
            root: classNames([classes.story, { [classes.margin]: index > 0 }])
          }}
        />
      ))}
    </Grid>
  );
}

StoryBlocks.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
};

export default StoryBlocks;
