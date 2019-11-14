import React from 'react';
import PropTypes from 'prop-types';

import FeaturedAnalysis from '../src/components/FeaturedAnalysis';
import FeaturedData from '../src/components/FeaturedData';
import Hero from '../src/components/Hero';
import LatestNewsStories from '../src/components/LatestNewsStories';
import MakingOfTakwimu from '../src/components/MakingOfTakwimu';
import Page from '../src/components/Page';
import WhatYouDoWithTakwimu from '../src/components/WhatYouCanDoWithTakwimu';
import WhereToNext from '../src/components/Next';
import { getChartDefinitions, getSitePage } from '../src/getTakwimuPage';

function Home({ chartDefinitions, indicatorId, latestMediumPosts, takwimu }) {
  const { hurumap, flourish } = chartDefinitions;
  /**
   * Apply queryAlias
   */
  const charts = {
    hurumap: hurumap.map((chart, i) => ({
      ...chart,
      visual: {
        ...JSON.parse(chart.visual),
        queryAlias: `v${i}`
      },
      stat: {
        ...JSON.parse(chart.stat),
        queryAlias: `v${i}`
      }
    })),
    flourish
  };
  const {
    page: {
      rendered: featuredData,
      where_to_next_title: whereToNextTitle,
      where_to_next_link: whereToNextLink
    }
  } = takwimu;

  return (
    <Page takwimu={takwimu} indicatorId={indicatorId}>
      <Hero takwimu={takwimu} />
      <FeaturedAnalysis takwimu={takwimu} />
      <FeaturedData charts={charts} takwimu={takwimu}>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: featuredData
          }}
        />
      </FeaturedData>
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
  chartDefinitions: PropTypes.shape({
    hurumap: PropTypes.arrayOf(PropTypes.shape({})),
    flourish: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
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
  const chartDefinitions = await getChartDefinitions();
  const res = await fetch('https://stories.hurumap.org/@takwimu_africa/latest');
  const latestMediumPosts = await res.json();
  const takwimu = await getSitePage('index');

  return {
    chartDefinitions,
    indicatorId,
    latestMediumPosts,
    takwimu
  };
};

export default Home;
