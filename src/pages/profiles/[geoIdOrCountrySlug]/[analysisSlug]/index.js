import React from 'react';

import Head from 'next/head';

import getInitialProps from '../../../../components/AnalysisPage/getInitialProps';
import Analysis from '../../../../components/AnalysisPage';

function AnalysisPage(props) {
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
      </Head>
      <Analysis {...props} />
    </>
  );
}

AnalysisPage.propTypes = {};

AnalysisPage.getInitialProps = getInitialProps;

export default AnalysisPage;
