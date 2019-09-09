import React, { useEffect, useState, useMemo } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import { MapIt, InsightContainer } from '@codeforafrica/hurumap-ui';
import { Grid, makeStyles } from '@material-ui/core';
import { GET_PROFILE, buildVisualsQuery } from '../data/queries';

import Page from '../components/Page';
import config from '../config';

import ProfileSection from '../components/ProfileSection';
import ProfileDetail from '../components/ProfileDetail';
import sectionedCharts from '../data/chart.json';

import slugify from '../utils/slugify';

import ChartFactory from '../components/ChartFactory';
import Section from '../components/Section';

const useStyles = makeStyles({
  chart: {
    margin: '20px 0',
    backgroundColor: '#f6f6f6'
  }
});

function Profile({
  match: {
    params: { geoId }
  }
}) {
  const classes = useStyles();
  const client = useApolloClient();

  const [activeTab, setActiveTab] = useState(
    window.location.hash.slice(1) ? window.location.hash.slice(1) : 'all'
  );
  const [chartData, setChartsData] = useState({
    isLoading: true
  });
  const [profiles, setProfiles] = useState({
    isLoading: true
  });

  // Provide the visuals with unique ids for fetching
  // The unique ids will be used to set alias in graphql
  let index = 0;
  sectionedCharts.forEach(x =>
    x.charts.forEach(y => {
      // eslint-disable-next-line no-param-reassign
      y.id = `chart${index}`;
      const { visuals, blockStat } = y;
      visuals.id = `viz${index}`;
      blockStat.id = `viz${index}`;
      index += 1;
    })
  );

  const [visuals] = useState(
    sectionedCharts
      .map(x => x.charts)
      .reduce((a, b) => a.concat(b))
      .map(x => x.visuals)
  );

  useEffect(() => {
    (async () => {
      setProfiles({
        isLoading: true
      });

      const {
        data: { geo: profile }
      } = await client.query({
        query: GET_PROFILE,
        variables: {
          geoCode: geoId.split('-')[1],
          geoLevel: geoId.split('-')[0]
        }
      });
      const {
        data: { geo: parentProfile }
      } = await client.query({
        query: GET_PROFILE,
        variables: {
          geoCode: profile.parentCode,
          geoLevel: profile.parentLevel
        }
      });

      setProfiles({
        isLoading: false,
        profile,
        parent: parentProfile
      });
    })();
  }, [client, geoId]);

  useEffect(() => {
    if (!profiles.isLoading) {
      (async () => {
        setChartsData({
          isLoading: true
        });

        const parent = {
          geoLevel: profiles.parent.parentLevel,
          geoCode: profiles.parent.parentCode
        };
        const { data: profileVisualsData } = await client.query({
          query: buildVisualsQuery(visuals, parent),
          variables: {
            geoCode: profiles.profile.geoCode,
            geoLevel: profiles.profile.geoLevel
          }
        });

        setChartsData({
          isLoading: false,
          profileVisualsData
        });
      })();
    }
  }, [profiles, visuals, client]);

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
              chart =>
                chartData.isLoading ||
                !chart.visuals.find(
                  visual =>
                    !chartData.profileVisualsData ||
                    chartData.profileVisualsData[visual.id].nodes.length === 0
                )
            ).length !== 0
        )
        .map(section => ({
          name: section.sectionTitle,
          slug: slugify(section.sectionTitle),
          index: section.index
        }))
    ],
    [chartData]
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
              ({ visuals: v }) =>
                chartData.isLoading ||
                (chartData.profileVisualsData &&
                  /* data is not missing */
                  !v.find(
                    ({ id }) =>
                      chartData.profileVisualsData[id].nodes.length === 0
                  ))
            )
            .map(chart => (
              <div style={{ margin: '40px 0', maxWidth: '100%' }}>
                <InsightContainer
                  classes={{ root: classes.chart }}
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
                      chart.blockStat,
                      chartData.profileVisualsData,
                      null,
                      profiles
                    )}
                  {!chartData.isLoading &&
                    ChartFactory.build(
                      chart.visuals,
                      chartData.profileVisualsData,
                      null,
                      profiles
                    )}
                </InsightContainer>
              </div>
            ))}
        </Grid>
      )),
    [chartData, profileTabs, profiles, classes]
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
  }).isRequired
};

export default Profile;
