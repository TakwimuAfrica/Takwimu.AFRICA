import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui';

const useStyles = makeStyles(theme => ({
  root: {},
  media: {
    height: '17.625rem',
    cursor: 'grabbing'
  },
  titleGutterBottom: {
    marginBottom: '1.375rem'
  },
  title: {
    lineHeight: 'normal'
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  }
}));

function StoryCard({ story }) {
  const classes = useStyles();
  return (
    <Card classes={{ root: classes.root }}>
      <CardMedia
        className={classes.media}
        component="a"
        href={story.url}
        target="_blank"
        image={story.preview_image.url}
        title={story.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="h2"
          classes={{ gutterBottom: classes.titleGutterBottom }}
          className={classes.title}
        >
          <A href={story.url} className={classes.link}>
            {story.title}
          </A>
        </Typography>
      </CardContent>
    </Card>
  );
}

StoryCard.propTypes = {
  story: PropTypes.shape({
    preview_image: PropTypes.shape({
      url: PropTypes.string
    }).isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default StoryCard;
