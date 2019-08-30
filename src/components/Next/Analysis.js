import React from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Card from './Card';
import Section from '../Section';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    [breakpoints.up('md')]: {
      width: '100%'
    },
    [breakpoints.up('lg')]: {
      width: '100%'
    }
  },
  container: {
    flexGrow: 1,
    paddingBottom: '6.25rem'
  },
  cardMargin: {
    marginTop: '2rem',
    [breakpoints.up('md')]: {
      marginTop: 0,
      marginLeft: '1.734375rem' // .75 of lg
    }
  }
}));

function AnalysisReadNext({ current, content, showContent, title }) {
  const hasContent = current < content.body.length - 1;
  const classes = useStyles();

  return hasContent ? (
    <Section classes={{ root: classes.root }} title={title} variant="h3">
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        className={classes.container}
      >
        {content.body.map((c, index) =>
          index > current && index - current <= 2 ? (
            <Card
              key={c.id}
              variant="dual"
              classes={{
                root: classNames({ [classes.cardMargin]: index - current > 1 })
              }}
              onClick={showContent(index)}
            >
              {c.value.title}
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
    body: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
  }).isRequired,
  showContent: PropTypes.func.isRequired
};

export default AnalysisReadNext;
