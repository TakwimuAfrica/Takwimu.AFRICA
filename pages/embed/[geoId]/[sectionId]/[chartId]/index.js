import React, { useMemo } from 'react';
import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';
import Typography from '@material-ui/core/Typography';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useProfileLoader } from '@codeforafrica/hurumap-ui/factory';
import useChartDefinitions from '../../../../../src/data/useChartDefinitions';
import Error from '../../../../../src/components/Error';
import config from '../../../../../src/config';

const Chart = dynamic({
  ssr: false,
  loader: () => {
    return import('@codeforafrica/hurumap-ui/factory/ChartFactory');
  }
});

function Embed() {
  const {
    query: { geoId, sectionId, chartId }
  } = useRouter();
  const sectionedCharts = useChartDefinitions();

  const chart = useMemo(() => {
    const section = sectionedCharts.find(s => s.id === sectionId);
    return section ? section.charts.find(c => c.id === chartId) : null;
  }, [sectionedCharts, sectionId, chartId]);

  const { profiles, chartData } = useProfileLoader({
    geoId,
    visuals: chart ? chart.visuals : [],
    populationTables: config.populationTables
  });

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
        {!chartData.isLoading && (
          <Chart
            profiles={profiles}
            definition={chart.stat}
            data={chartData.profileVisualsData[chart.visual.queryAlias].nodes}
          />
        )}
        {!chartData.isLoading && (
          <Chart
            profiles={profiles}
            definition={chart.visual}
            data={chartData.profileVisualsData[chart.visual.queryAlias].nodes}
          />
        )}
      </InsightContainer>
    </div>
  );
}

export default Embed;
