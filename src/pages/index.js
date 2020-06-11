import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import renderBlocks from '@hurumap-ui/content/renderBlocks';
import logo from '../assets/images/logo-white-all.png';

import { getSitePage } from '../cms';

import FeaturedAnalysis from '../components/FeaturedAnalysis';
import Hero from '../components/Hero';
import LatestNewsStories from '../components/LatestNewsStories';
import MakingOfTakwimu from '../components/MakingOfTakwimu';
import Page from '../components/Page';
import WhatYouDoWithTakwimu from '../components/WhatYouCanDoWithTakwimu';
import WhereToNext from '../components/Next';
import Section from '../components/Section';
import fetchStories from '../utils/fetchStories';
import config from '../config';

function Home({ latestMediumPosts, takwimu }) {
  const {
    page: {
      rendered: featuredData,
      where_to_next_title: whereToNextTitle,
      where_to_next_link: whereToNextLink
    },
    language
  } = takwimu;

  const [blocks, setBlocks] = useState();
  useEffect(
    () =>
      setBlocks(
        renderBlocks({
          logo,
          flourishURL: id =>
            `${config.WP_BACKEND_URL}/wp-json/hurumap-data/flourish/${id}/?lang=${language}`,
          fetchDefinitionUrl: (type, id) => {
            switch (type) {
              case 'flourish':
              case 'hurumap':
                return `${config.WP_BACKEND_URL}/wp-json/hurumap-data/charts/${id}?lang=${language}`;
              case 'snippet':
                return `${config.WP_BACKEND_URL}/wp-json/wp/v2/${type}/${id}?lang=${language}`;
              default:
                return '';
            }
          }
        })
      ),
    [language]
  );

  return (
    <Page takwimu={takwimu}>
      <Hero takwimu={takwimu} />
      <FeaturedAnalysis takwimu={takwimu} />
      <Section title="Featured Data">
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: featuredData
          }}
        />
        {blocks}
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
  latestMediumPosts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  takwimu: PropTypes.shape({
    language: PropTypes.string,
    page: PropTypes.shape({
      rendered: PropTypes.string,
      where_to_next_title: PropTypes.string,
      where_to_next_link: PropTypes.arrayOf(PropTypes.shape({}))
    })
  }).isRequired
};

Home.getInitialProps = async props => {
  const {
    query: { lang: pageLanguage }
  } = props;
  const lang = pageLanguage || config.DEFAULT_LANG;
  const latestMediumPosts = await fetchStories();
  const takwimu = await getSitePage('index', lang);

  return {
    latestMediumPosts,
    takwimu
  };
};

export default Home;
