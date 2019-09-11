import React, { useEffect, useState } from 'react';

import config from '../config';
import FeaturedAnalysis from '../components/FeaturedAnalysis';
import FeaturedData from '../components/FeaturedData';
import Hero from '../components/Hero';
import LatestNewsStories from '../components/LatestNewsStories';
import MakingOfTakwimu from '../components/MakingOfTakwimu';
import Page from '../components/Page';
import WhatYouDoWithTakwimu from '../components/WhatYouCanDoWithTakwimu';
import WhereToNext from '../components/Next';

function Home() {
  const [takwimu, setTakwimu] = useState(undefined);
  useEffect(() => {
    // Same-Origin Policy
    document.domain = 'takwimu.africa';

    const { url } = config;
    fetch(`${url}/api/v2/pages/?type=takwimu.IndexPage&fields=*&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length) {
          Object.assign(config.page, data.items[0]);
          setTakwimu(config);
        }
      });
  }, []);
  if (!takwimu) {
    return null;
  }

  return (
    <Page takwimu={takwimu}>
      <Hero takwimu={takwimu} />
      <FeaturedAnalysis takwimu={takwimu} />
      <FeaturedData takwimu={takwimu} />
      <WhatYouDoWithTakwimu takwimu={takwimu} />
      <MakingOfTakwimu takwimu={takwimu} />
      <LatestNewsStories takwimu={takwimu} />
      <WhereToNext />
    </Page>
  );
}

export default Home;
