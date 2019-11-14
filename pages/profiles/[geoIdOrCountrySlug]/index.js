import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Analysis from '../../../src/pages/Analysis';
import Profile from '../../../src/pages/Profile';
import config from '../../../src/config';

function ProfileOrAnalysis({ isAnalysis, initialProps }) {
  return (
    <>
      <Head>
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
  const isAnalysis = config.countries
    .map(c => c.slug)
    .includes(geoIdOrCountrySlug);

  const getInitialProps = isAnalysis
    ? Analysis.getInitialProps
    : Profile.getInitialProps;

  if (getInitialProps) {
    return { isAnalysis, initialProps: await getInitialProps(props) };
  }

  return { isAnalysis, initialProps: {} };
};

export default ProfileOrAnalysis;
