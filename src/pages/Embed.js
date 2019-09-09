import React, { useMemo } from 'react';
import { InsightContainer } from '@codeforafrica/hurumap-ui';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ChartFactory from '../components/ChartFactory';

import slugify from '../utils/slugify';
import useChartDefinitions from '../data/useChartDefinitions';
import useProfileLoader from '../data/useProfileLoader';
import Error from '../components/Error';

function Embed({
  match: {
    params: { geoId, sectionTitleSlug, chartTitleSlug }
  }
}) {
  const sectionedCharts = useChartDefinitions();

  const chart = useMemo(() => {
    const section = sectionedCharts.find(
      s => slugify(s.sectionTitle) === sectionTitleSlug
    );
    return section
      ? section.charts.find(c => slugify(c.title) === chartTitleSlug)
      : null;
  }, [sectionedCharts, sectionTitleSlug, chartTitleSlug]);

  const { profiles, chartData } = useProfileLoader(
    geoId,
    chart ? chart.visuals : []
  );

  if (!chart) {
    return (
      <Error title="404 - Chart Not Found">
        <Typography variant="body1">
          The chart requested does not exist.
        </Typography>
      </Error>
    );
  }

  if (
    !chartData.isLoading &&
    chart.visuals.find(
      visual => chartData.profileVisualsData[visual.id].nodes.length === 0
    )
  ) {
    return (
      <Error title="400 - Bad request">
        <Typography variant="body1">
          Data is missing for visualization.
        </Typography>
      </Error>
    );
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <InsightContainer
        key={chart.id}
        loading={chartData.isLoading}
        title={chart.title}
        source={{
          title: 'Community Survey 2016',
          href: 'http://dev.dominion.africa'
        }}
      >
        {!chartData.isLoading &&
          ChartFactory.build(
            { ...chart.visuals[0], type: 'number' },
            chartData.profileVisualsData,
            null,
            profiles
          )}
        {!chartData.isLoading &&
          chart.visuals.map(visual =>
            ChartFactory.build(
              visual,
              chartData.profileVisualsData,
              null, // No comparison data
              profiles
            )
          )}
      </InsightContainer>
    </div>
  );
}

Embed.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      geoId: PropTypes.string.isRequired,
      sectionTitleSlug: PropTypes.string.isRequired,
      chartTitleSlug: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Embed;
