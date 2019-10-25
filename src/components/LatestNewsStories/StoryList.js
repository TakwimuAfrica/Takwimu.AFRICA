import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Story from './Story';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  margin: {
    marginTop: '3.375rem'
  }
});

function StoryList({ stories }) {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      justify="flex-start"
      alignItems="stretch"
    >
      {stories.slice(0, 3).map((story, index) => (
        <Story
          key={story.link}
          story={{
            title: story.title,
            img: `https://cdn-images-1.medium.com/max/2600/${story.virtuals.previewImage.imageId}`,
            link: `https://medium.com/@takwimu_africa/${story.uniqueSlug}`,
            summary: story.content.subtitle
          }}
          classes={{ root: classNames({ [classes.margin]: index > 0 }) }}
        />
      ))}
    </Grid>
  );
}

StoryList.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
};

export default StoryList;
