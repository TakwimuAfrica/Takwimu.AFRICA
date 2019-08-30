import React from 'react';
import { PropTypes } from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import AnalysisListItem from './AnalysisListItem';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    [breakpoints.up('md')]: {
      width: '14.53125rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: '19.375rem'
    }
  },
  content: {}
}));

function AnalysisList({ countrifyTitle, content, current, onClick }) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      className={classes.root}
    >
      {content.map((c, index) => (
        <AnalysisListItem
          key={`${c.value.country.slug}-${c.value.slug}`}
          isCurrent={index === current}
          onClick={() => onClick(index)}
        >
          {countrifyTitle(c.value)}
        </AnalysisListItem>
      ))}
    </Grid>
  );
}

AnalysisList.propTypes = {
  countrifyTitle: PropTypes.func.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.shape({}).isRequired
    })
  ).isRequired,
  current: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

AnalysisList.defaultProps = {
  current: 0
};

export default AnalysisList;
