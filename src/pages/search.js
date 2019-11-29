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
  let results = [];
  if (query && query.length) {
    results = await fetch(
      `${config.url}/api/search?q=${query}&format=json`
    ).then(response => {
      if (response.status === 200) {
        return response.json().then(data => data.search);
      }
      return Promise.resolve({});
    });
    config.page.search = { query, results };
  }
  return config;
};

export default Search;
