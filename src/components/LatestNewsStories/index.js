import React from 'react';
import PropTypes from 'prop-types';

import { Button, Grid } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui/core/A';
import { RichTypography } from '../core';
import Section from '../Section';
import StoryBlocks from './StoryBlocks';
import StoryList from './StoryList';

const useStyles = makeStyles({
  sectionTitle: {
    margin: '0 0 1.1875rem 0'
  },
  root: {},
  descriptionRoot: {
    marginBottom: '2.1875rem',
    padding: '1rem 0'
  },
  buttonRoot: {
    marginBottom: '3.0625rem'
  }
});

function LatestNewsStories({
  takwimu: {
    page: {
      latest_news_title: title,
      latest_news_description: description,
      read_more_link_label: readMore
    },
    settings: {
      socialMedia: { medium }
    }
  },
  width,
  stories = []
}) {
  const classes = useStyles();
  if (!title) {
    return null;
  }

  // Wagtail inserts div/p when RichTextField is empty
  const hasDescription = () =>
    description &&
    description.length > 0 &&
    description !== '<p></p>' &&
    description !== '<div class="rich-text"></div>';
  const Stories = isWidthUp('md', width) ? StoryBlocks : StoryList;

  return (
    <Section
      title={title}
      variant="h2"
      classes={{ title: classes.sectionTitle }}
    >
      <Grid
        container
        justify="flex-start"
        alignItems="flex-start"
        className={classes.root}
      >
        {hasDescription() && (
          <Grid item xs={12}>
            <RichTypography classes={{ root: classes.descriptionRoot }}>
              {description}
            </RichTypography>
          </Grid>
        )}
        <Grid item xs={12}>
          <A href={medium} underline="none">
            <Button classes={{ root: classes.buttonRoot }}>{readMore}</Button>
          </A>
        </Grid>
        {stories && stories.length > 0 && (
          <Grid item xs={12}>
            <Stories stories={stories} />
          </Grid>
        )}
      </Grid>
    </Section>
  );
}

LatestNewsStories.defaultProps = {
  stories: []
};

LatestNewsStories.propTypes = {
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      latest_news_title: PropTypes.string.isRequired,
      latest_news_description: PropTypes.string.isRequired,
      read_more_link_label: PropTypes.string.isRequired
    }).isRequired,
    settings: PropTypes.shape({
      socialMedia: PropTypes.shape({
        medium: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired,
  stories: PropTypes.arrayOf(PropTypes.shape({})),
  width: PropTypes.string.isRequired
};

export default withWidth({
  initialWidth: 'md'
})(LatestNewsStories);
