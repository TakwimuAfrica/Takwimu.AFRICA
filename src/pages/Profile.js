import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { MapIt, InsightContainer } from '@codeforafrica/hurumap-ui';
import { Grid, makeStyles } from '@material-ui/core';

import Page from '../components/Page';
import config from '../config';

import ProfileSection from '../components/ProfileSection';
import ProfileDetail from '../components/ProfileDetail';

import slugify from '../utils/slugify';

import ChartFactory from '../components/ChartFactory';
import Section from '../components/Section';
import useChartDefinitions from '../data/useChartDefinitions';
import useProfileLoader from '../data/useProfileLoader';

const useStyles = makeStyles(({ breakpoints }) => ({
  chart: {
    margin: '20px 0',
    backgroundColor: '#f6f6f6'
  },
  sourceGrid: {
    [breakpoints.up('md')]: {
      whiteSpace: 'nowrap'
    }
  },
  numberTitle: {
    fontWeight: 'bold'
  }
}));

function Profile({
  match: {
    params: { geoId }
  },
  history
}) {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(
    window.location.hash.slice(1) ? window.location.hash.slice(1) : 'all'
  );

  const sectionedCharts = useChartDefinitions();

  const [visuals] = useState(
    sectionedCharts
      .map(x => x.charts)
      .reduce((a, b) => a.concat(b))
      .map(x => x.visual)
  );

  const { profiles, chartData } = useProfileLoader(geoId, visuals);

  const onClickGeoLayer = useCallback(
    area => {
      history.push(`/profiles/${area.codes.AFR}`);
    },
    [history]
  );

  // get all available profiletabs
  const profileTabs = useMemo(
    () => [
      {
        name: 'All',
        slug: 'all'
      },
      ...sectionedCharts
        .map((section, i) => ({
          ...section,
          index: i
        }))
        // Filter empty sections
        .filter(
          section =>
            section.charts.filter(
              ({ visual: { queryAlias } }) =>
                chartData.isLoading ||
                !(
                  !chartData.profileVisualsData ||
                  chartData.profileVisualsData[queryAlias].nodes.length === 0
                )
            ).length !== 0
        )
        .map(section => ({
          name: section.sectionTitle,
          slug: slugify(section.sectionTitle),
          index: section.index
        }))
    ],
    [chartData.isLoading, chartData.profileVisualsData, sectionedCharts]
  );

  /**
   * Victory renders take alot of time
   * causing a few seconds UI block which is bad UX.
   * This caches the components so they do not have to render again.
   */
  const chartComponents = useMemo(
    () =>
      profileTabs.slice(1).map(tab => (
        <Grid item container spacing={4} id={tab.slug} key={tab.slug}>
          {/* <ProfileSectionTitle loading={chartData.isLoading} tab={tab} /> */}
          {sectionedCharts[tab.index].charts
            .filter(
              ({ visual: { queryAlias } }) =>
                chartData.isLoading ||
                (chartData.profileVisualsData &&
                  /* data is not missing */
                  chartData.profileVisualsData[queryAlias].nodes.length !== 0)
            )
            .map(chart => (
              <div style={{ margin: '40px 0', maxWidth: '100%' }}>
                <InsightContainer
                  classes={{
                    root: classes.chart,
                    sourceGrid: classes.sourceGrid
                  }}
                  key={chart.id}
                  loading={chartData.isLoading}
                  title={chart.title}
                  source={
                    !chartData.isLoading
                      ? chartData.sources[chart.visual.table].source
                      : {}
                  }
                >
                  {!chartData.isLoading &&
                    ChartFactory.build(
                      chart.stat,
                      chartData.profileVisualsData,
                      null,
                      profiles,
                      classes
                    )}
                  {!chartData.isLoading &&
                    ChartFactory.build(
                      chart.visual,
                      chartData.profileVisualsData,
                      null,
                      profiles
                    )}
                </InsightContainer>
              </div>
            ))}
        </Grid>
      )),
    [
      profileTabs,
      sectionedCharts,
      chartData.isLoading,
      chartData.profileVisualsData,
      chartData.sources,
      classes,
      profiles
    ]
  );

  // Show and hide sections
  useEffect(() => {
    if (activeTab === 'all') {
      profileTabs.slice(1).forEach(tab => {
        document.getElementById(tab.slug).style.display = 'flex';
      });
    } else {
      profileTabs.slice(1).forEach(tab => {
        if (tab.slug === activeTab) {
          document.getElementById(tab.slug).style.display = 'flex';
        } else {
          document.getElementById(tab.slug).style.display = 'none';
        }
      });
    }
  }, [profileTabs, activeTab]);

  return (
    <Page takwimu={config}>
      {!profiles.isLoading && (
        <ProfileDetail
          profile={{
            geo: profiles.profile
          }}
        />
      )}

      <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
        <MapIt
          drawProfile
          drawChildren={geoId.split('-')[1] === 'NG'}
          codeType="AFR"
          geoLevel={geoId.split('-')[0]}
          geoCode={geoId.split('-')[1]}
          onClickGeoLayer={onClickGeoLayer}
        />
      </div>
      {!profiles.isLoading && (
        <ProfileSection
          profile={{ geo: profiles.profile }}
          tabs={profileTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      <Section>{chartComponents}</Section>
    </Page>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      geoId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Profile);
