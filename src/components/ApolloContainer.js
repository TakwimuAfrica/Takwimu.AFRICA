import React from 'react';
import { PropTypes } from 'prop-types';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://graphql.takwimu.africa/graphql'
});

function ApolloContainer({ children }) {
  if (!children) {
    return null;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

ApolloContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ApolloContainer;
