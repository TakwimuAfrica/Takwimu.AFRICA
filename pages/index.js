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

function Home({ takwimu, indicatorId }) {
  const {
    page: { where_to_next_title: whereToNextTitle, where_link: whereLink }
  } = takwimu;
  return (
    <Page takwimu={takwimu} indicatorId={indicatorId}>
      <Hero takwimu={takwimu} />
      <FeaturedAnalysis takwimu={takwimu} />
      {/* <FeaturedData takwimu={takwimu} /> */}
      <WhatYouDoWithTakwimu takwimu={takwimu} />
      <MakingOfTakwimu takwimu={takwimu} />
      <LatestNewsStories takwimu={takwimu} />
      <WhereToNext
        variant="triple"
        whereToNext={{ title: whereToNextTitle, whereLink }}
      />
    </Page>
  );
}

Home.propTypes = {
  takwimu: PropTyes.shape({
    page: PropTyes.shape({
      where_to_next_title: PropTyes.string,
      where_link: PropTyes.arrayOf(PropTyes.shape({}))
    })
  }).isRequired,
  indicatorId: PropTyes.string.isRequired
};

Home.getInitialProps = async ({ query: { indicator: indicatorId } }) => {
  return {
    indicatorId,
    takwimu: await getSitePage('index')
  };
};

export default Home;
