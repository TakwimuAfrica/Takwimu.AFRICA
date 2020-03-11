import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Input from './Input';

const useStyles = makeStyles({
  root: {
    marginTop: '3.875rem',
    marginBottom: '0.6875rem'
  },
  title: {}
});

function SearchInput({ onRefresh, query, title, language }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
      <Input query={query} onRefresh={onRefresh} language={language} />
    </div>
  );
}

SearchInput.propTypes = {
  onRefresh: PropTypes.func,
  query: PropTypes.string.isRequired,
  title: PropTypes.string,
  language: PropTypes.string.isRequired
};

SearchInput.defaultProps = {
  onRefresh: null,
  title: 'Search Results'
};

export default SearchInput;
