import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import config from '../config';
import FeaturedAnalysis from '../components/FeaturedAnalysis';
import FeaturedData from '../components/FeaturedData';
import Hero from '../components/Hero';
import LatestNewsStories from '../components/LatestNewsStories';
import MakingOfTakwimu from '../components/MakingOfTakwimu';
import Page from '../components/Page';
import WhatYouDoWithTakwimu from '../components/WhatYouCanDoWithTakwimu';
import WhereToNext from '../components/Next';

const styles = () => ({
  root: {
    marginBottom: '14.375rem'
  }
});

function Home() {
  const [takwimu, setTakwimu] = useState(undefined);
  useEffect(() => {
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

Home.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Home);
