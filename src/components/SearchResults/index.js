import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import SearchInput from '../SearchInput';
import SearchResultsContainer from './SearchResultsContainer';
import Section from '../Section';
import config from '../../config';

const useStyles = makeStyles({
  root: {
    marginTop: '3.875rem',
    marginBottom: '4.75rem'
  }
});

function SearchResults({ takwimu: { page } }) {
  const [search, setSearch] = useState(page.search);
  const classes = useStyles();

  const handleSearch = useCallback(searchTerm => {
    fetch(
      `${config.ES_URL}/takwimu/post/_search?q=${searchTerm}&size=100`
    ).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          setSearch({ query: searchTerm, results: data.hits.hits });
        });
      }
    });
  }, []);

  const { query, results } = search || {};

  return (
    <Section classes={{ root: classes.root }}>
      <SearchInput onRefresh={handleSearch} query={query} />
      <SearchResultsContainer results={results} filter="All" />
    </Section>
  );
}

SearchResults.propTypes = {
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      search: PropTypes.shape({
        query: PropTypes.string,
        results: PropTypes.arrayOf(PropTypes.shape({}))
      }).isRequired
    }).isRequired
  }).isRequired
};

export default SearchResults;
