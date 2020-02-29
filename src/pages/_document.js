import React from 'react';

import Document, { Head, Main, NextScript } from 'next/document';

import { ServerStyleSheets } from '@material-ui/core/styles';

import theme from '../theme';

class MyDocument extends Document {
  render() {
    const { lang } = this.props;
    return (
      <html lang={lang}>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta
            name="msapplication-TileColor"
            content={theme.palette.primary.main}
          />

          <link
            rel="preload"
            href="https://fonts.googleapis.com/css?family=Lora:400,700|Muli:400,600,700"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lora:400,700|Muli:400,600,700&display=swap"
            rel="stylesheet"
          />

          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    lang: ctx.query.lang || 'en',
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};

export default MyDocument;
