import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import { getSitePage } from '../getTakwimuPage';
import FeaturedAnalysis from '../components/FeaturedAnalysis';
import Hero from '../components/Hero';
import LatestNewsStories from '../components/LatestNewsStories';
import MakingOfTakwimu from '../components/MakingOfTakwimu';
import Page from '../components/Page';
import WhatYouDoWithTakwimu from '../components/WhatYouCanDoWithTakwimu';
import WhereToNext from '../components/Next';
import config from '../config';
import Section from '../components/Section';

function Home({ indicatorId, latestMediumPosts, takwimu }) {
  const {
    page: {
      rendered: featuredData,
      where_to_next_title: whereToNextTitle,
      where_to_next_link: whereToNextLink
    }
  } = takwimu;

  return (
    <Page takwimu={takwimu} indicatorId={indicatorId}>
      <Head>
        <script
          src={`${config.WP_BACKEND_URL}/wp-content/themes/hurumap/micro-frontend/build/hurumap-ui-blocks.js`}
        />
      </Head>
      <Hero takwimu={takwimu} />
      <FeaturedAnalysis takwimu={takwimu} />
      <Section title="Featured Data">
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: featuredData
          }}
        />
      </Section>
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
  indicatorId: PropTypes.string,
  latestMediumPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  takwimu: PropTypes.shape({
    page: PropTypes.shape({
      rendered: PropTypes.string,
      where_to_next_title: PropTypes.string,
      where_to_next_link: PropTypes.arrayOf(PropTypes.shape({}))
    })
  }).isRequired
};

Home.defaultProps = {
  indicatorId: undefined
};

Home.getInitialProps = async ({ query: { indicator: indicatorId } }) => {
  const res = await fetch('https://stories.hurumap.org/@takwimu_africa/latest');
  const latestMediumPosts = await res.json();
  const takwimu = await getSitePage('index');

  return {
    indicatorId,
    latestMediumPosts,
    takwimu
  };
};

export default Home;
