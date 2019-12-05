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

import Theme from '../theme';

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

    /**
     * Expose jss and theme
     * Used by the micro-frontend components
     */
    window.jss = MyApp.jss;
    window.Theme = Theme;
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
          <StylesProvider jss={MyApp.jss} sheetsRegistry={MyApp.sheetsRegistry}>
            <ThemeProvider theme={Theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </StylesProvider>
        </ApolloProvider>
      </>
    );
  }
}
