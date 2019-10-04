import React from 'react';

import FeaturedAnalysis from '../src/components/FeaturedAnalysis';
import FeaturedData from '../src/components/FeaturedData';
import Hero from '../src/components/Hero';
import LatestNewsStories from '../src/components/LatestNewsStories';
import MakingOfTakwimu from '../src/components/MakingOfTakwimu';
import Page from '../src/components/Page';
import WhatYouDoWithTakwimu from '../src/components/WhatYouCanDoWithTakwimu';
import WhereToNext from '../src/components/Next';
import getTakwimuPage from '../src/getTakwimuPage';

function Home(props) {
  return (
    <Page takwimu={props}>
      <Hero takwimu={props} />
      <FeaturedAnalysis takwimu={props} />
      <FeaturedData takwimu={props} />
      <WhatYouDoWithTakwimu takwimu={props} />
      <MakingOfTakwimu takwimu={props} />
      <LatestNewsStories takwimu={props} />
      <WhereToNext />
    </Page>
  );
}

Home.getInitialProps = async () => {
  return getTakwimuPage('takwimu.IndexPage');
};

export default Home;
