import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ChartContainer } from '@codeforafrica/hurumap-ui';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import ChartFactory from '@codeforafrica/hurumap-ui/factory/ChartFactory';

import useProfileLoader from '@codeforafrica/hurumap-ui/factory/useProfileLoader';
import useChartDefinitions from '../../data/useChartDefinitions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '1.25rem'
  },
  dataContainer: {
    padding: '0.625rem',
    backgroundColor: theme.palette.data.light,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      padding: '1.25rem'
    }
  }
}));

function HURUmapChart({ geoId, chartId }) {
  const classes = useStyles();
  const sections = useChartDefinitions();
  const charts = useMemo(
    () => sections.reduce((a, b) => a.concat(b.charts), []),
    [sections]
  );
  const chart = useMemo(() => charts.find(c => c.id === chartId), [
    charts,
    chartId
  ]);

  const visuals = useMemo(() => (chart ? [chart.visual] : []), [chart]);
  const { profiles, chartData } = useProfileLoader(geoId, visuals);

  if (
    !chart ||
    (!chartData.isLoading &&
      chartData.profileVisualsData[chart.visual.queryAlias] &&
      chartData.profileVisualsData[chart.visual.queryAlias].nodes.length === 0)
  ) {
    return (
      <Typography>{`"${chart.title}" chart cannot be visualized`}</Typography>
    );
  }
  return (
    <div id={`indicator-hurumap-${chart.id}`} className={classes.root}>
      <ChartContainer
        classes={{ root: classes.dataContainer }}
        key={chart.id}
        loading={chartData.isLoading}
        title={chart.title}
        subtitle={chart.subtitle}
        source={
          !chartData.isLoading && chartData.sources[chart.visual.table]
            ? chartData.sources[chart.visual.table].source
            : {}
        }
      >
        {!chartData.isLoading &&
          chartData.profileVisualsData[chart.visual.queryAlias] && (
            <ChartFactory
              definition={chart.visual}
              data={chartData.profileVisualsData[chart.visual.queryAlias].nodes}
              profiles={profiles}
            />
          )}
      </ChartContainer>
    </div>
  );
}

HURUmapChart.propTypes = {
  geoId: PropTypes.string,
  chartId: PropTypes.string
};

HURUmapChart.defaultProps = {
  geoId: undefined,
  chartId: undefined
};

export default HURUmapChart;
