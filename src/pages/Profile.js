import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { MapIt } from '@codeforafrica/hurumap-ui';
import { GET_PROFILE } from '../data/queries';

import Page from '../components/Page';
import NotFound from './404';
import config from '../config';

import ProfileSection from '../components/ProfileSection';
import ProfileDetail from '../components/ProfileDetail';

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
      <ProfileDetail
        profile={{
          geo
        }}
      />

      <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
        <MapIt
          codeType="AFR"
          geoLevel={geoId.split('-')[0]}
          geoCode={geoId.split('-')[1]}
        />
      </div>
      <ProfileSection profile={{ geo }} tabs={[]} />
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
