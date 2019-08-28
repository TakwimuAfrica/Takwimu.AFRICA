import React, { useEffect, useState } from 'react';

import config from '../config';
import Page from '../components/Page';
import SearchResults from '../components/SearchResults';

function Search() {
  const [takwimu, setTakwimu] = useState(undefined);
  useEffect(() => {
    const params = new URL(window.location).searchParams;
    const query = params.get('q');
    if (query && query.length) {
      config.page.search = { query };
    }
    setTakwimu(config);
  }, []);

  if (!takwimu) {
    return null;
  }
  return (
    <Page takwimu={takwimu} title="Search">
      <SearchResults takwimu={takwimu} />
    </Page>
  );
}

Search.propTypes = {};

export default Search;
