import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import GET_PROFILE from '../data/queries';

import Page from '../components/Page';
import NotFound from './404';
import config from '../config';

function Profile({
  match: {
    params: { geoId }
  }
}) {
  const {
    loading,
    error,
    data: { geo }
  } = useQuery(GET_PROFILE, {
    variables: {
      geoCode: geoId.split('-')[1],
      geoLevel: geoId.split('-')[0]
    }
  });

  if (loading) return null;
  if (error) return <NotFound />;
  return (
    <Page takwimu={config}>
      <Typography variant="body1">
        Testing graphql: You have accessed {geo.name} hurumap profile
      </Typography>
    </Page>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      geoId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Profile;
