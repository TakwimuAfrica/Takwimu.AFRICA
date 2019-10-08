import React, { useEffect, useState, useMemo, useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import InsightContainer from '@codeforafrica/hurumap-ui/dist/InsightContainer';
import { Grid, makeStyles } from '@material-ui/core';

import config from '../config';
import { shareIndicator, uploadImage } from '../common';
import slugify from '../utils/slugify';
import useChartDefinitions from '../data/useChartDefinitions';
import useProfileLoader from '../data/useProfileLoader';

import Page from '../components/Page';
import ProfileDetail from '../components/ProfileDetail';
import ProfileSection, {
  ProfileSectionTitle
} from '../components/ProfileSection';
import Section from '../components/Section';

const Chart = dynamic({
  ssr: false,
  loader: () => {
    return import('../components/ChartFactory');
  }
});
const MapIt = dynamic({
  ssr: false,
  loader: () => {
    return (
      typeof window !== 'undefined' &&
      import('@codeforafrica/hurumap-ui/dist/MapIt')
    );
  }
});

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    marginBottom: '0.625rem',
    maxWidth: '100%'
  },
  containerRoot: {
    backgroundColor: '#f6f6f6',
    margin: 0
  },
  containerSourceGrid: {
    [breakpoints.up('md')]: {
      whiteSpace: 'nowrap'
    }
  },
  numberTitle: {
    fontWeight: 'bold'
  }
}));

function Profile() {
  const router = useRouter();
  const {
    query: { geoIdOrCountrySlug: geoId = '' }
  } = router;

  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(
    process.browser && window.location.hash.slice(1)
      ? window.location.hash.slice(1)
      : 'all'
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
      router.push(`/profiles/${area.codes.AFR}`);
    },
    [router]
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

  const handleShare = (id, e, dataURL) => {
    uploadImage(id, dataURL).then(success => {
      if (success) {
        shareIndicator(id);
      }
    });
  };

  /**
   * Victory renders take alot of time
   * causing a few seconds UI block which is bad UX.
   * This caches the components so they do not have to render again.
   */
  const chartComponents = useMemo(
    () =>
      !process.browser
        ? null
        : profileTabs.slice(1).map(tab => (
            <Grid item container id={tab.slug} key={tab.slug}>
              <ProfileSectionTitle loading={chartData.isLoading} tab={tab} />
              {sectionedCharts[tab.index].charts
                .filter(
                  ({ visual: { queryAlias } }) =>
                    chartData.isLoading ||
                    (chartData.profileVisualsData &&
                      /* data is not missing */
                      chartData.profileVisualsData[queryAlias].nodes.length !==
                        0)
                )
                .map(chart => (
                  <div className={classes.container}>
                    <InsightContainer
                      classes={{
                        root: classes.containerRoot,
                        sourceGrid: classes.containerSourceGrid
                      }}
                      key={chart.id}
                      loading={chartData.isLoading}
                      title={chart.title}
                      source={
                        !chartData.isLoading
                          ? chartData.sources[chart.visual.table].source
                          : {}
                      }
                      insightActions={{
                        handleShare: handleShare.bind(null, chart.id),
                        handleShowData: () => {},
                        handleCompare: () => {}
                      }}
                    >
                      {!chartData.isLoading ? (
                        <Chart
                          definition={chart.stat}
                          primaryData={chartData.profileVisualsData}
                          profiles={profiles}
                          classes={classes}
                        />
                      ) : (
                        <div />
                      )}
                      {!chartData.isLoading ? (
                        <Chart
                          definition={chart.visual}
                          primaryData={chartData.profileVisualsData}
                          profiles={profiles}
                        />
                      ) : (
                        <div />
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
        const tabElement = document.getElementById(tab.slug);
        // Remember to display all section titles
        tabElement.children[0].style.display = 'block';
        tabElement.style.display = 'flex';
      });
    } else {
      profileTabs.slice(1).forEach(tab => {
        const tabElement = document.getElementById(tab.slug);
        if (tab.slug === activeTab) {
          // Hide section title for active tab
          tabElement.children[0].style.display = 'none';
          tabElement.style.display = 'flex';
        } else {
          tabElement.style.display = 'none';
        }
      });
    }
  }, [activeTab, profileTabs]);

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
          codeType="AFR"
          drawChildren={geoId.split('-')[1] === 'NG'}
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

export default Profile;
