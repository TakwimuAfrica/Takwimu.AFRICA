import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Story from './Story';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  margin: {
    marginTop: '3.375rem'
  }
});

function StoryList({ stories, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid
      container
      className={classes.root}
      justify="flex-start"
      alignItems="stretch"
    >
      {stories.slice(0, 3).map((story, index) => (
        <Story
          key={story.uniqueSlug}
          story={{
            previewImageUrl: `https://cdn-images-1.medium.com/max/480/${story.virtuals.previewImage.imageId}`,
            subtitle: story.content.subtitle,
            title: story.title,
            url: `https://medium.com/@takwimu_africa/${story.uniqueSlug}`
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
