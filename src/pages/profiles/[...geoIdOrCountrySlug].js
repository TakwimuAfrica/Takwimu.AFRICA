import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import dynamic from 'next/dynamic';

import config from '../../config';

import getProfileProps from '../../components/ProfilePage/getInitialProps';
import getAnalysisProps from '../../components/AnalysisPage/getInitialProps';

const Analysis = dynamic({
  ssr: true,
  loader: () => import('../../components/AnalysisPage')
});
const Profile = dynamic({
  ssr: true,
  loader: () => import('../../components/ProfilePage')
});

function ProfileOrAnalysisPage({ isProfile, initialProps }) {
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
      {isProfile ? (
        <Profile {...initialProps} />
      ) : (
        <Analysis {...initialProps} />
      )}
    </>
  );
}

ProfileOrAnalysisPage.propTypes = {
  isProfile: PropTypes.bool.isRequired,
  initialProps: PropTypes.shape({}).isRequired
};

ProfileOrAnalysisPage.getInitialProps = async props => {
  const {
    query: { geoIdOrCountrySlug }
  } = props;
  const [, countryCode] = geoIdOrCountrySlug[0].split('-');
  const isProfile =
    config.countries.findIndex(c => c.iso_code === countryCode) !== -1;
  const getInitialProps = isProfile ? getProfileProps : getAnalysisProps;
  const initialProps = getInitialProps ? await getInitialProps(props) : {};

  return { isProfile, initialProps };
};

export default ProfileOrAnalysisPage;
