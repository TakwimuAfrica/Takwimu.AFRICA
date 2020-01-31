import React from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Card from './Card';
import Section from '../Section';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '43.734375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.3125rem'
    }
  },
  container: {
    flexGrow: 1,
    paddingBottom: '0.9375rem'
  },
  cardMargin: {
    marginTop: '2rem',
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
      marginLeft: '1.734375rem' // .75 of lg
    }
  }
}));

function AnalysisReadNext({ current, content, onClick, title }) {
  const hasContent = current < content.topics.length - 1;
  const generateHref = index => {
    const item = content.topics[index];
    return `#${item.post_name}`;
  };
  const classes = useStyles();

  return hasContent ? (
    <Section classes={{ root: classes.root }} title={title} variant="h3">
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        className={classes.container}
      >
        {content.topics.map((c, index) =>
          index > current && index - current <= 2 ? (
            <Card
              key={generateHref(index)}
              href={generateHref(index)}
              component="a"
              variant="dual"
              classes={{
                root: classNames({
                  [classes.cardMargin]: index - current > 1
                })
              }}
              onClick={() => onClick(index)}
            >
              {c.post_title}
            </Card>
          ) : null
        )}
      </Grid>
    </Section>
  ) : null;
}

AnalysisReadNext.propTypes = {
  title: PropTypes.string.isRequired,
  current: PropTypes.number.isRequired,
  content: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        post_name: PropTypes.string,
        post_title: PropTypes.string
      }).isRequired
    )
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default AnalysisReadNext;
