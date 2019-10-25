import React from 'react';
import PropTyes from 'prop-types';

import FeaturedAnalysis from '../src/components/FeaturedAnalysis';
// import FeaturedData from '../src/components/FeaturedData';
import Hero from '../src/components/Hero';
import LatestNewsStories from '../src/components/LatestNewsStories';
import MakingOfTakwimu from '../src/components/MakingOfTakwimu';
import Page from '../src/components/Page';
import WhatYouDoWithTakwimu from '../src/components/WhatYouCanDoWithTakwimu';
import WhereToNext from '../src/components/Next';
import { getSitePage } from '../src/getTakwimuPage';

function Home({ takwimu, indicatorId, latestMediumPosts }) {
  const {
    page: {
      where_to_next_title: whereToNextTitle,
      where_to_next_link: whereToNextLink
    }
  } = takwimu;
  return (
    <Page takwimu={takwimu} indicatorId={indicatorId}>
      <Hero takwimu={takwimu} />
      <FeaturedAnalysis takwimu={takwimu} />
      {/* <FeaturedData takwimu={takwimu} /> */}
      <WhatYouDoWithTakwimu takwimu={takwimu} />
      <MakingOfTakwimu takwimu={takwimu} />
      <LatestNewsStories takwimu={takwimu} stories={latestMediumPosts} />
      <WhereToNext
        variant="triple"
        whereToNext={{ title: whereToNextTitle, whereToNextLink }}
      />
    </Page>
  );
}

Home.propTypes = {
  takwimu: PropTyes.shape({
    page: PropTyes.shape({
      where_to_next_title: PropTyes.string,
      where_to_next_link: PropTyes.arrayOf(PropTyes.shape({}))
    })
  }).isRequired,
  indicatorId: PropTyes.string.isRequired,
  latestMediumPosts: PropTyes.arrayOf(PropTyes.shape({})).isRequired
};

Home.getInitialProps = async ({ query: { indicator: indicatorId } }) => {
  const takwimu = await getSitePage('index');
  const res = await fetch('https://stories.hurumap.org/@takwimu_africa/latest');
  return {
    takwimu,
    indicatorId,
    latestMediumPosts: await res.json()
  };
};

export default Home;
