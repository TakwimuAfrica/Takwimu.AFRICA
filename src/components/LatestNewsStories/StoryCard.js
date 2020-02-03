import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import A from '@codeforafrica/hurumap-ui/core/A';
import LazyLoad from 'react-lazyload';

const styles = theme => ({
  root: {},
  media: {
    height: '17.625rem',
    cursor: 'grabbing'
  },
  title: {
    lineHeight: 'normal'
  },
  titleGutterBottom: {
    marginBottom: '1.375rem'
  },
  titleContent: {
    paddingBottom: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: theme.typography.body1.fontSize
  }
});

function StoryCard({ classes, story }) {
  return (
    <Card square classes={{ root: classes.root }}>
      <LazyLoad>
        <CardMedia
          className={classes.media}
          component="a"
          href={story.url}
          target="_blank"
          image={story.previewImageUrl}
          title={story.title}
        />
      </LazyLoad>
      <CardContent classes={{ root: classes.titleContent }}>
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
  classes: PropTypes.shape({}).isRequired,
  story: PropTypes.shape({
    previewImageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(StoryCard);
