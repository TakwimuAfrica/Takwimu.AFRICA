import React, { useEffect, useState, useMemo, useCallback } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';
import { Grid, makeStyles } from '@material-ui/core';

import { useProfileLoader } from '@codeforafrica/hurumap-ui/factory';
import ChartFactory from '@codeforafrica/hurumap-ui/factory/ChartFactory';
import useChartDefinitions from '../data/useChartDefinitions';
import config from '../config';
import { shareIndicator, uploadImage } from '../common';
import slugify from '../utils/slugify';

import Page from '../components/Page';
import ProfileDetail from '../components/ProfileDetail';
import ProfileSection, {
  ProfileSectionTitle
} from '../components/ProfileSection';
import Section from '../components/Section';

import chartSources from '../data/sources.json';

const MapIt = dynamic({
  ssr: false,
  loader: () => {
    return (
      typeof window !== 'undefined' &&
      import('@codeforafrica/hurumap-ui/core/MapIt')
    );
  }
});

const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    marginBottom: '0.625rem'
  },
  containerRoot: {
    width: '100%',
    minHeight: '500px',
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

function Chart({ chartData, definition, profiles, classes }) {
  return (
    !chartData.isLoading && (
      <ChartFactory
        definition={definition}
        data={chartData.profileVisualsData[definition.queryAlias].nodes}
        profiles={profiles}
        classes={classes}
      />
    )
  );
}

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

  const { profiles, chartData } = useProfileLoader({
    geoId,
    visuals,
    populationTables: config.populationTables
  });

  const country = useMemo(() => {
    if (!profiles.profile || !profiles.profile.geoLevel) {
      return {};
    }
    if (profiles.profile.geoLevel === 'country') {
      return config.countries.find(
        c => c.iso_code === profiles.profile.geoCode
      );
    }
    return config.countries.find(c => c.iso_code === profiles.parent.geoCode);
  }, [profiles]);

  const getSource = useCallback(
    table => {
      return chartSources[country.slug][profiles.profile.geoLevel][table]
        .source;
    },
    [profiles, country]
  );

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
                  <Grid
                    item
                    xs={12}
                    key={chart.id}
                    className={classes.container}
                  >
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
                          ? getSource(chart.visual.table).source
                          : {}
                      }
                      insightActions={{
                        handleShare: handleShare.bind(null, chart.id),
                        handleShowData: () => {},
                        handleCompare: () => {}
                      }}
                      insight={{
                        dataLink: {
                          href: `/profiles/${country.slug}`,
                          title: 'Read the country analysis'
                        }
                      }}
                    >
                      <Chart
                        chartData={chartData}
                        definition={chart.stat}
                        profiles={profiles}
                        classes={classes}
                      />
                      <Chart
                        chartData={chartData}
                        definition={chart.visual}
                        profiles={profiles}
                        classes={classes}
                      />
                    </InsightContainer>
                  </Grid>
                ))}
            </Grid>
          )),
    [
      profileTabs,
      chartData,
      sectionedCharts,
      classes,
      getSource,
      country.slug,
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
