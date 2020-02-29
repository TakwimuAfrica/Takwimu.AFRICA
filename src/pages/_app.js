import 'cross-fetch/polyfill';

import React from 'react';

import App from 'next/app';
import Head from 'next/head';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider,
  StylesProvider,
  jssPreset
} from '@material-ui/core/styles';
import { create } from 'jss';

import theme from '../theme';

const client = new ApolloClient({
  uri: 'https://graphql.takwimu.africa/graphql'
});

export default class MyApp extends App {
  static jss = create(jssPreset());

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta charSet="utf-8" />
        </Head>
        <ApolloProvider client={client}>
          <StylesProvider jss={MyApp.jss}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
              {/* <!-- Google Analytics --> */}
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
                    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                    ga('create', 'UA-115543098-1', 'auto');
                
                    // Ensures consistency in the URL paths that get reported to Google Analytics;
                    // avoiding the problem where separate rows in your pages reports actually point to the same page.
                    ga('require', 'cleanUrlTracker');
                    // Enables declarative event tracking, via HTML attributes in the markup.
                    ga('require', 'eventTracker', {
                        hitFilter: (model) => {
                            if (model.get('eventCategory') === 'Twitter') { 
                                // event to social
                                model.set('hitType', 'social');
                                model.set('socialNetwork', model.get('eventCategory'));
                                model.set('socialAction', model.get('eventAction'));
                                model.set('socialTarget', model.get('eventLabel'));
                                model.set('eventCategory', null);
                                model.set('eventAction', null);
                                model.set('eventLabel', null);
                            }
                        }
                    });
                    // Allows you to track when elements are visible within the viewport.
                    ga('require', 'impressionTracker');
                    // Automatically tracks how far down the page a user scrolls.
                    ga('require', 'maxScrollTracker', {
                        fieldsObj: {
                            eventAction: 'Scrolled',
                            eventLabel: window.location.href
                        }
                    });
                    // Automatically tracks link clicks to external domains e.g. Medium
                    // To track all types of link clicks i.e. Tracking right-clicks and middle-clicks
                    ga('require', 'outboundLinkTracker', {
                        events: ['click', 'auxclick', 'contextmenu']
                    });
                    // Automatically tracks how long pages are in the visible state 
                    // (as opposed to in a background tab)
                    ga('require', 'pageVisibilityTracker');
                    // Automatically tracks URL changes for single page applications.
                    // Analysis page changes the url like a single page app.
                    ga('require', 'urlChangeTracker');
                    
                    ga('send', 'pageview');
                    ga('create', 'UA-44795600-8', 'auto', {'name': 't0'});
                    ga('t0.send', 'pageview');`
                }}
              />
              {/* <!-- impressionTracker browser support --> */}
              <script
                async
                src="https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"
              />
              <script
                async
                src="https://www.google-analytics.com/analytics.js"
              />
              <script
                async
                src="https://cdnjs.cloudflare.com/ajax/libs/autotrack/2.4.1/autotrack.js"
              />
              {/* <!-- End Google Analytics --> */}
            </ThemeProvider>
          </StylesProvider>
        </ApolloProvider>
      </>
    );
  }
}
