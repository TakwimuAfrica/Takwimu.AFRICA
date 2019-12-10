import React from 'react';

import config from '../config';
import Page from '../components/Page';
import SearchResults from '../components/SearchResults';

function Search(takwimu) {
  return (
    <Page takwimu={takwimu} title="Search">
      <SearchResults takwimu={takwimu} />
    </Page>
  );
}

Search.propTypes = {};

Search.getInitialProps = async ({ query: { q: query } }) => {
  let searchResults = [];
  if (query && query.length) {
    searchResults = await fetch(
      `${config.ES_URL}/takwimu/post/_search?q=${query}`
    ).then(response => {
      if (response.status === 200) {
        return response.json().then(data => data.hits);
      }
      return Promise.resolve({});
    });
    config.page.search = {
      query,
      results: searchResults.hits,
      total: searchResults.total
    };
  }
  return config;
};

export default Search;
