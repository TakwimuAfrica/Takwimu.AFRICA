/* eslint-disable react/no-danger */
import React from 'react';
import PropTyes from 'prop-types';
import Head from 'next/head';
import ErrorPage from 'next/error';
import Page from '../../components/Page';

import { getPage } from '../../cms';
import Section from '../../components/Section';
import config from '../../config';

function P({ takwimu, wp }) {
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
      </Head>
      <Section>
        <div
          style={{ margin: wp.acf && wp.acf.margin }}
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
    })
  }).isRequired
};

P.getInitialProps = async ({ query: { page } }) => {
  return getPage('pages', page);
};

export default P;
