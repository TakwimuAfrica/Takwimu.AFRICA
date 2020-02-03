import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';

import config from '../../../config';
import Analysis from '../../../components/AnalysisPage';
import Profile from '../../../components/ProfilePage';

function ProfileOrAnalysis({ isAnalysis, initialProps }) {
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://dashboard.takwimu.africa"
          crossOrigin="anonymous"
        />
        {/** Flourish */}
        <link
          rel="preconnect"
          href="https://upload.wikimedia.org"
          crossOrigin="anonymous"
        />
        {/** Graphql Preconnect */}
        <link
          rel="preconnect"
          href="https://graphql.takwimu.africa"
          crossOrigin="anonymous"
        />
        {/** MapIt Preconnect */}
        <link
          rel="preconnect"
          href="https://mapit.hurumap.org"
          crossOrigin="anonymous"
        />
        {/** Map Tiles Preconnect */}
        <link
          rel="preconnect"
          href="https://server.arcgisonline.com"
          crossOrigin="anonymous"
        />
      </Head>
      {isAnalysis ? (
        <Analysis {...initialProps} />
      ) : (
        <Profile {...initialProps} />
      )}
    </>
  );
}

ProfileOrAnalysis.propTypes = {
  isAnalysis: PropTypes.bool.isRequired,
  initialProps: PropTypes.shape({}).isRequired
};

ProfileOrAnalysis.getInitialProps = async props => {
  const {
    query: { geoIdOrCountrySlug }
  } = props;
  const isAnalysis =
    config.countries.findIndex(
      c => c.slug === geoIdOrCountrySlug.toLowerCase()
    ) !== -1;
  const getInitialProps = isAnalysis
    ? Analysis.getInitialProps
    : Profile.getInitialProps;
  const initialProps = getInitialProps ? await getInitialProps(props) : {};

  return { isAnalysis, initialProps };
};

export default ProfileOrAnalysis;
