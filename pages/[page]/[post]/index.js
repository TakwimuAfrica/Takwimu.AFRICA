/* eslint-disable react/no-danger */
import React from 'react';
import PropTyes from 'prop-types';
import Head from 'next/head';
import Page from '../../../src/components/Page';

import { get } from '../../../src/getTakwimuPage';

function P({ takwimu, wp }) {
  return (
    <Page takwimu={takwimu}>
      <Head>
        <link
          rel="stylesheet"
          href="http://localhost:8080/wp-admin/load-styles.php?c=0&dir=ltr&load%5B%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5B%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,common,forms,admin-menu,dashboard,list-tables,edit,revisions,media,t&load%5B%5D=hemes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check,wp-color-picker&ver=5.2.3"
        />
        <link
          rel="stylesheet"
          href="http://localhost:8080/wp-includes/js/mediaelement/wp-mediaelement.min.css?ver=5.2.3"
        />
        <script
          type="text/javascript"
          src="http://localhost:8080/wp-content/themes/hurumap/assets/js/hurumap-iframe-handler.js"
        />
      </Head>
      <div
        style={{ margin: wp.acf.margin }}
        dangerouslySetInnerHTML={{ __html: wp.content.rendered }}
      />
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

P.getInitialProps = async ({ query: { post } }) => {
  return get('post', post);
};

export default P;
