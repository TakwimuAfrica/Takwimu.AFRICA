import React, { useMemo } from 'react';
import InsightContainer from '@codeforafrica/hurumap-ui/dist/InsightContainer';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ChartFactory from '../src/components/ChartFactory';

import useChartDefinitions from '../src/data/useChartDefinitions';
import useProfileLoader from '../src/data/useProfileLoader';
import Error from '../src/components/Error';

function Embed({
  match: {
    params: { geoId, sectionId, chartId }
  }
}) {
  const sectionedCharts = useChartDefinitions();

  const chart = useMemo(() => {
    const section = sectionedCharts.find(s => s.id === sectionId);
    return section ? section.charts.find(c => c.id === chartId) : null;
  }, [sectionedCharts, sectionId, chartId]);

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
      ({ queryAlias }) =>
        chartData.profileVisualsData[queryAlias].nodes.length === 0
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
      sectionId: PropTypes.string.isRequired,
      chartId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default Embed;
