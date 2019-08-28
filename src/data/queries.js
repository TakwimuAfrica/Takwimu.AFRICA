// A file that defines needed graphql queries

import gql from 'graphql-tag';

const GET_PROFILE = gql`
  query profile($geoCode: String!, $geoLevel: String!) {
    geo: wazimapGeographyByGeoLevelAndGeoCodeAndVersion(
      geoLevel: $geoLevel
      geoCode: $geoCode
      version: "2009"
    ) {
      geoLevel
      geoCode
      squareKms
      parentLevel
      parentCode
      longName
      name
    }
  }
`;

export default GET_PROFILE;
