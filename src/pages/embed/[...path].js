import React from 'react';
import { PropTypes } from 'prop-types';
import dynamic from 'next/dynamic';

import { Box, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { getChartDefinition, getPostById } from '../../cms';

import Error from '../../components/Error';
import logo from '../../assets/images/logo-white-all.png';
import config from '../../config';

const Card = dynamic(() => import('@hurumap-ui/core/Card'), {
  ssr: false
});

function Embed({ error, type, id, geoId, definition }) {
  const { query } = useRouter();
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="fill-available"
      >
        <Box maxWidth="600px">
          <Error
            title={`${error} - ${
              error === 404 ? 'Not Found' : 'Invalid Request'
            }`}
          >
            <Typography variant="body1">
              The chart requested does not exist.
            </Typography>
          </Error>
        </Box>
      </Box>
    );
  }
  return (
    <Card
      id={id}
      type={type}
      logo={logo}
      geoId={geoId}
      definition={definition}
      showInsight={query.showInsight}
      showStatVisual={query.showStatVisual}
      insightTitle={query.insightTitle}
      insightSummary={query.insightSummary}
      dataLinkTitle={query.dataLinkTitle}
      analysisLinkCountrySlug={query.analysisLinkCountrySlug}
      analysisLinkTitle={query.analysisLinkTitle}
      dataGeoId={query.dataGeoId}
      flourishURL={
        type === `flourish`
          ? `${config.WP_BACKEND_URL}/wp-json/hurumap-data/flourish/${id}/`
          : undefined
      }
    />
  );
}

Embed.propTypes = {
  error: PropTypes.number,
  id: PropTypes.string,
  type: PropTypes.string,
  geoId: PropTypes.string,
  definition: PropTypes.shape({
    id: PropTypes.string
  })
};

Embed.defaultProps = {
  error: undefined,
  id: undefined,
  type: undefined,
  geoId: undefined,
  definition: undefined
};

Embed.getInitialProps = async ({ query: { path } }) => {
  const [$0, $1, $2] = path || [];
  let definition;

  if ($0 === 'hurumap' && $2) {
    definition = await getChartDefinition($2);
  } else if ($0 === 'flourish' && $1) {
    definition = await getChartDefinition($1);
  } else if ($0 === 'card' && $1 && $2) {
    definition = await getPostById($1, $2);
  } else {
    return {
      error: 400
    };
  }

  if (!definition) {
    return {
      error: 404
    };
  }
  return {
    type: $0 === 'card' ? $1 : $0,
    id: $0 === 'card' || $0 === 'hurumap' ? $2 : $1,
    geoId: $0 === 'hurumap' ? $1 : null,
    definition
  };
};

export default Embed;
