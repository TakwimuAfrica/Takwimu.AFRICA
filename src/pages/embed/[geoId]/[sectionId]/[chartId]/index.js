import React from 'react';
import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';
import Typography from '@material-ui/core/Typography';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useProfileLoader } from '@codeforafrica/hurumap-ui/factory';

import config from '../../../../../config';
import { getChartDefinition } from '../../../../../getTakwimuPage';
import Error from '../../../../../components/Error';

import logo from '../../../../../assets/images/logo-white-all.png';

const Chart = dynamic({
  ssr: false,
  loader: () => {
    return import('@codeforafrica/hurumap-ui/factory/ChartFactory');
  }
});

function Embed(chart) {
  const {
    query: { geoId }
  } = useRouter();

  const { profiles, chartData } = useProfileLoader({
    geoId,
    visuals: chart ? [chart.visual] : [],
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
    chartData.profileVisualsData[chart.visual.queryAlias].nodes.length === 0
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
        logo={logo}
        source={{
          title: 'Community Survey 2016',
          href: 'http://dev.dominion.africa'
        }}
        title={chart.title}
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

Embed.getInitialProps = async ({ query: { chartId } }) => {
  const chart = await getChartDefinition(chartId);
  return chart
    ? {
        ...chart,
        visual: {
          ...chart.visual,
          queryAlias: 'vizEmbeded'
        },
        stat: {
          ...chart.stat,
          queryAlias: 'vizEmbeded'
        }
      }
    : null;
};

export default Embed;
