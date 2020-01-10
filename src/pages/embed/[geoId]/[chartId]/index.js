import React, { useMemo } from 'react';
import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';
import Typography from '@material-ui/core/Typography';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useProfileLoader } from '@codeforafrica/hurumap-ui/factory';

import config from '../../../../config';
import { getChartDefinition } from '../../../../getTakwimuPage';
import Error from '../../../../components/Error';

import logo from '../../../../assets/images/logo-white-all.png';

const Chart = dynamic({
  ssr: false,
  loader: () => {
    return import('@codeforafrica/hurumap-ui/factory/ChartFactory');
  }
});

function HURUmap({ geoId, chart, render }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const visuals = useMemo(() => [chart.visual], []);

  const { profiles, chartData } = useProfileLoader({
    geoId,
    visuals,
    populationTables: config.populationTables
  });

  return render(chartData, profiles);
}

function Embed(chart) {
  const {
    query: { geoId }
  } = useRouter();

  if (!chart) {
    return (
      <Error title="404 - Chart Not Found">
        <Typography variant="body1">
          The chart requested does not exist.
        </Typography>
      </Error>
    );
  }

  return chart.type === 'hurumap' ? (
    <HURUmap
      geoId={geoId}
      chart={chart}
      render={(chartData, profiles) =>
        !chartData.isLoading &&
        chartData.profileVisualsData[chart.visual.queryAlias].nodes.length ===
          0 ? (
          <Error title="400 - Bad request">
            <Typography variant="body1">
              Data is missing for visualization.
            </Typography>
          </Error>
        ) : (
          <InsightContainer
            key={chart.id}
            loading={chartData.isLoading}
            hideInsight
            variant="analysis"
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
                data={
                  chartData.profileVisualsData[chart.visual.queryAlias].nodes
                }
              />
            )}
            {!chartData.isLoading && (
              <Chart
                profiles={profiles}
                definition={chart.visual}
                data={
                  chartData.profileVisualsData[chart.visual.queryAlias].nodes
                }
              />
            )}
          </InsightContainer>
        )
      }
    />
  ) : (
    <InsightContainer
      key={chart.id}
      hideInsight
      variant="analysis"
      loading={false}
      logo={logo}
      source={{
        title: 'Community Survey 2016',
        href: 'http://dev.dominion.africa'
      }}
      title={chart.title}
    >
      <div />
      <iframe
        id={`data-indicator-${chart.id}`}
        frameBorder="0"
        scrolling="no"
        title={chart.title}
        src={`${config.WP_BACKEND_URL}/wp-json/hurumap-data/flourish/${chart.id}/`}
      />
    </InsightContainer>
  );
}

Embed.getInitialProps = async ({ query: { chartId } }) => {
  const chart = await getChartDefinition(chartId);
  if (!chart) {
    return null;
  }
  return chart.type !== 'hurumap'
    ? chart
    : {
        ...chart,
        visual: {
          ...chart.visual,
          queryAlias: 'vizEmbeded'
        },
        stat: {
          ...chart.stat,
          queryAlias: 'vizEmbeded'
        }
      };
};

export default Embed;
