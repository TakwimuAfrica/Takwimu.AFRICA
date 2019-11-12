import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Links from './Links';
import Section from '../Section';

const useStyles = makeStyles({
  sectionRoot: {
    margin: '0 0 2.3125rem 0'
  },
  root: {
    flexGrow: 1
  }
});

function RelatedContent({ content: relatedContent }) {
  const classes = useStyles();
  if (!(relatedContent && relatedContent.relatedLinks)) {
    return null;
  }
  const { title, relatedLinks } = relatedContent;
  const firstBatch = relatedLinks.slice(0, 4);
  const secondBatch = relatedLinks.slice(4, 8);
  return (
    firstBatch.length > 0 && (
      <Section
        title={title}
        variant="h3"
        classes={{ root: classes.sectionRoot }}
      >
        <Grid
          container
          className={classes.root}
          justify="flex-start"
          alignItems="flex-start"
        >
          <Links items={firstBatch} />
          {secondBatch.length > 0 && <Links items={secondBatch} />}
        </Grid>
      </Section>
    )
  );
}

RelatedContent.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    relatedLinks: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        link: PropTypes.string
      })
    )
  }).isRequired
};

export default RelatedContent;
