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

Search.getInitialProps = async ({
  query: { q: query, lang: pageLanguage }
}) => {
  const lang = pageLanguage || config.DEFAULT_LANG;
  let results = [];
  if (query && query.length) {
    results = await fetch(
      `${config.ES_URL}/takwimu/post/_search?q=${query}&size=50`
    ).then(response => {
      if (response.status === 200) {
        return response.json().then(data => data.hits.hits);
      }
      return Promise.resolve({});
    });
    config.page.search = { query, results };
  }
  config.language = lang;
  return config;
};

export default Search;
