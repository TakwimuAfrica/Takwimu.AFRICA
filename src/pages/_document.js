import React from 'react';

import Document, { Head, Main, NextScript } from 'next/document';

import { ServerStyleSheets } from '@material-ui/core/styles';

import theme from '../theme';

function getSendInBlueTracker() {
  return {
    __html: `
        (function() {
            window.sib = {
                equeue: [],
                client_key: "a3us3x5ho12d5naxgoea66p6"
            };
            /* OPTIONAL: email for identify request*/
            // window.sib.email_id = 'example@domain.com';
            window.sendinblue = {};
            for (var j = ['track', 'identify', 'trackLink', 'page'], i = 0; i < j.length; i++) {
            (function(k) {
                window.sendinblue[k] = function() {
                    var arg = Array.prototype.slice.call(arguments);
                    (window.sib[k] || function() {
                            var t = {};
                            t[k] = arg;
                            window.sib.equeue.push(t);
                        })(arg[0], arg[1], arg[2]);
                    };
                })(j[i]);
            }
            var n = document.createElement("script"),
                i = document.getElementsByTagName("script")[0];
            n.type = "text/javascript", n.id = "sendinblue-js", n.async = !0, n.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key, i.parentNode.insertBefore(n, i), window.sendinblue.page();
        })();
      `
  };
}

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

          <script
            type="text/javascript"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={getSendInBlueTracker()}
          />
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
