import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import SearchInput from '../SearchInput';
import SearchResultsContainer from './SearchResultsContainer';
import Section from '../Section';

const styles = () => ({
  root: {
    marginTop: '3.875rem',
    marginBottom: '4.75rem'
  }
});

function SearchResults({ classes, takwimu: { url, page } }) {
  const [search, setSearch] = useState(page.search);

  const handleSearch = useCallback(
    searchTerm => {
      fetch(`${url}/api/search/?q=${searchTerm}&format=json`).then(response => {
        if (response.status === 200) {
          response.json().then(data => {
            setSearch(data.search);
          });
        }
      });
    },
    [url]
  );

  const { query, results } = search || {};
  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [handleSearch, query]);

  return (
    <Section classes={{ root: classes.root }}>
      <SearchInput onRefresh={handleSearch} query={query} />
      <SearchResultsContainer results={results} filter="All" />
    </Section>
  );
}

SearchResults.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  takwimu: PropTypes.shape({
    url: PropTypes.string.isRequired,
    page: PropTypes.shape({
      search: PropTypes.shape({
        query: PropTypes.string,
        results: PropTypes.arrayOf(PropTypes.shape({}))
      })
    }).isRequired
  }).isRequired
};

export default withStyles(styles)(SearchResults);
