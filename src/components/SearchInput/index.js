import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Input from './Input';

const useStyles = makeStyles({
  root: {
    marginTop: '3.875rem',
    marginBottom: '4.75rem'
  },
  title: {}
});

function SearchInput({ onRefresh, query, title }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {title}
      </Typography>
      <Input query={query} onRefresh={onRefresh} />
    </div>
  );
}

SearchInput.propTypes = {
  onRefresh: PropTypes.func,
  query: PropTypes.string.isRequired,
  title: PropTypes.string
};

SearchInput.defaultProps = {
  onRefresh: null,
  title: 'Search Results'
};

export default SearchInput;
