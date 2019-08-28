import React, { useEffect, useState } from 'react';

import config from '../config';
import Page from '../components/Page';
import SearchResults from '../components/SearchResults';

function Search() {
  const [query, setQuery] = useState(undefined);
  useEffect(() => {
    const params = new URL(window.location).searchParams;
    const q = params.get('q');
    if (q && q.length) {
      setQuery(q);
    }
  }, []);

  return (
    <Page takwimu={config} title="Search">
      <SearchResults searchParams={query} takwimu={config} />
    </Page>
  );
}

Search.propTypes = {};

export default Search;
