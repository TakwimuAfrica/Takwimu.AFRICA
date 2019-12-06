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
      `${config.WP_BACKEND_URL}/wp-json/wp/v2/search?search=${query}`
    ).then(response => {
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      return Promise.resolve({});
    });
    config.page.search = { query, results };
  }
  return config;
};

export default Search;
