import React, { useMemo } from 'react';
import InsightContainer from '@codeforafrica/hurumap-ui/dist/InsightContainer';
import Typography from '@material-ui/core/Typography';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useChartDefinitions from '../../../../../src/data/useChartDefinitions';
import useProfileLoader from '../../../../../src/data/useProfileLoader';
import Error from '../../../../../src/components/Error';

const Chart = dynamic({
  ssr: false,
  loader: () => {
    return import('../../../../../src/components/ChartFactory');
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
        {!chartData.isLoading && (
          <Chart
            definition={chart.stat}
            primaryData={chartData.profileVisualsData}
            profiles={profiles}
          />
        )}
        {!chartData.isLoading && (
          <Chart
            definition={chart.visual}
            primaryData={chartData.profileVisualsData}
            profiles={profiles}
          />
        )}
      </InsightContainer>
    </div>
  );
}

export default Embed;
