/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTyes from 'prop-types';
import Head from 'next/head';
import { Typography } from '@material-ui/core';
import ErrorPage from 'next/error';
import Page from '../../../components/Page';
import { get } from '../../../getTakwimuPage';
import Section from '../../../components/Section';
import config from '../../../config';

import Theme from '../../../theme';

function P({ takwimu, wp }) {
  useEffect(() => {
    // Expose theme
    window.Theme = Theme;
  }, []);
  if (!wp) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Page takwimu={takwimu}>
      <Head>
        <link
          rel="stylesheet"
          href={`${config.WP_BACKEND_URL}/wp-admin/load-styles.php?c=0&dir=ltr&load%5B%5D=dashicons,buttons,media-views,wp-components,wp-nux,wp-block-library,wp-block-&load%5B%5D=library-theme,wp-format-library,common,forms,dashboard,list-tables,edit,revisions,media,t&load%5B%5D=hemes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-color-picker`}
        />
        <link
          rel="stylesheet"
          href={`${config.WP_BACKEND_URL}/wp-includes/js/mediaelement/wp-mediaelement.min.css`}
        />
        <script
          crossOrigin
          src={`${config.WP_BACKEND_URL}/wp-content/themes/hurumap/micro-frontend/build/hurumap-ui-blocks.js`}
        />
      </Head>
      <Section>
        <Typography variant="h2">{wp.title.rendered}</Typography>
        <div
          style={{ margin: wp.acf.margin }}
          dangerouslySetInnerHTML={{ __html: wp.content.rendered }}
        />
      </Section>
    </Page>
  );
}

P.propTypes = {
  takwimu: PropTyes.shape({}).isRequired,
  wp: PropTyes.shape({
    acf: PropTyes.shape({
      margin: PropTyes.string
    }),
    content: PropTyes.shape({
      rendered: PropTyes.string
    }),
    title: PropTyes.shape({
      rendered: PropTyes.string
    })
  }).isRequired
};

P.getInitialProps = async ({ query: { page, post } }) => {
  return get(page, post);
};

export default P;
