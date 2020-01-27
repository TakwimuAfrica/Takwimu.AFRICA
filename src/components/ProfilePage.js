import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import InsightContainer from '@codeforafrica/hurumap-ui/core/InsightContainer';
import { useProfileLoader } from '@codeforafrica/hurumap-ui/factory';
import ChartFactory from '@codeforafrica/hurumap-ui/factory/ChartFactory';

import config from '../config';
import { shareIndicator } from '../common';

import Page from './Page';
import ProfileDetail from './ProfileDetail';
import ProfileSection, { ProfileSectionTitle } from './ProfileSection';
import Section from './Section';

import { getSectionedCharts } from '../cms';

import logo from '../assets/images/logo-white-all.png';

const MapIt = dynamic({
  ssr: false,
  loader: () => {
    return (
      typeof window !== 'undefined' &&
      import('@codeforafrica/hurumap-ui/core/MapIt')
    );
  }
});

const useStyles = makeStyles(({ palette, breakpoints, typography }) => ({
  actionsShareButton: {
    minWidth: '4rem'
  },
  actionsRoot: {
    border: 'solid 1px #eaeaea'
  },
  container: {
    marginBottom: '0.625rem'
  },
  containerRoot: ({ loading }) => ({
    width: '100%',
    minHeight: loading && '300px',
    backgroundColor: '#f6f6f6',
    margin: 0
  }),
  containerInsightAnalysisLink: {
    padding: 0
  },
  containerInsightDataLink: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: `solid 2px ${palette.primary.main}`,
    padding: 0
  },
  containerSourceGrid: {
    [breakpoints.up('md')]: {
      whiteSpace: 'nowrap'
    }
  },
  containerSourceLink: {
    fontSize: typography.caption.fontSize,
    color: palette.text.primary
  },
  insight: {
    paddingTop: '1.275rem'
  },
  insightGrid: {
    [breakpoints.up('lg')]: {
      maxWidth: '23.6875rem'
    }
  },
  numberTitle: {
    fontWeight: 'bold'
  },
  hideHighlightGrid: {
    display: 'none'
  },
  statDescription: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.71
  },
  statStatistic: {
    fontWeight: 'bold',
    fontSize: '2.5rem',
    lineHeight: 1.03,
    marginBottom: '0.6875rem',
    marginTop: '1.125rem'
  },
  statSubtitle: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginTop: '1rem'
  },
  title: {
    fontFamily: typography.fontText,
    lineHeight: 2.05,
    marginTop: '1rem'
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

function Profile({ sectionedCharts }) {
  const router = useRouter();
  const {
    query: { geoIdOrCountrySlug: geoId = '' }
  } = router;

  const [activeTab, setActiveTab] = useState(
    process.browser && window.location.hash.slice(1)
      ? window.location.hash.slice(1)
      : 'all'
  );

  const charts = useMemo(
    () =>
      sectionedCharts
        .map(({ charts: definitions }) => definitions)
        .reduce((a, b) => a.concat(b), []),
    [sectionedCharts]
  );

  const [visuals] = useState(
    charts.filter(({ type }) => type === 'hurumap').map(({ visual }) => visual)
  );

  const { profiles, chartData } = useProfileLoader({
    geoId,
    visuals,
    populationTables: config.populationTables
  });
  const classes = useStyles({ loading: chartData.isLoading });

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
        // Filter empty sections
        .filter(
          ({ charts: sectionCharts }) =>
            sectionCharts.filter(
              ({ type, visual }) =>
                type !== 'hurumap' ||
                chartData.isLoading ||
                !(
                  !chartData.profileVisualsData ||
                  /* hurumap data is missing */
                  chartData.profileVisualsData[visual.queryAlias].nodes
                    .length === 0
                )
            ).length !== 0
        )
    ],
    [chartData.isLoading, chartData.profileVisualsData, sectionedCharts]
  );

  /**
   * Victory renders take a lot of time
   * causing a few seconds UI block which is bad UX.
   * This caches the components so they do not have to render again.
   */
  const chartComponents = useMemo(
    () =>
      profileTabs.slice(1).map(tab => (
        <Grid item container id={tab.slug} key={tab.slug}>
          <ProfileSectionTitle loading={chartData.isLoading} tab={tab} />
          {tab.charts
            // Filter loaded charts
            .filter(
              ({ type, visual }) =>
                type !== 'hurumap' ||
                chartData.isLoading ||
                (chartData.profileVisualsData &&
                  /* hurumap data is not missing */
                  chartData.profileVisualsData[visual.queryAlias].nodes
                    .length !== 0)
            )
            .map(chart => {
              const embedPath =
                chart.type === 'hurumap'
                  ? `hurumap/${geoId}/${chart.id}`
                  : `flourish/${chart.id}`;

              const sourceResult = chartData.profileVisualsData
                ? chartData.profileVisualsData[
                    `${chart.visual.queryAlias}Source`
                  ]
                : null;
              const source =
                sourceResult && sourceResult.nodes && sourceResult.nodes.length
                  ? sourceResult.nodes[0]
                  : null;
              return (
                <Grid item xs={12} key={chart.id} className={classes.container}>
                  <InsightContainer
                    key={chart.id}
                    actions={{
                      handleShare: shareIndicator.bind(null, chart.id),
                      handleShowData: null,
                      handleCompare: null
                    }}
                    classes={{
                      insight: classes.insight,
                      actionsCompareButton: classes.actionsCompareButton,
                      actionsShareButton: classes.actionsShareButton,
                      actionsShowDataButton: classes.actionsShowDataButton,
                      actionsRoot: classes.actionsRoot,
                      root: classes.containerRoot,
                      sourceGrid: classes.containerSourceGrid,
                      sourceLink: classes.containerSourceLink,
                      insightAnalysisLink: classes.containerInsightAnalysisLink,
                      insightDataLink: classes.containerInsightDataLink,
                      insightGrid: classes.insightGrid,
                      highlightGrid:
                        chart.type === 'flourish' && classes.hideHighlightGrid,
                      title: classes.title
                    }}
                    embedCode={`<iframe
                        id="${chart.id}"
                        src="${config.url}/embed/${embedPath}"
                        title="${chart.title}"
                        allowFullScreen
                      />`}
                    insight={{
                      dataLink: {
                        href: `/profiles/${country.slug}`,
                        title: 'Read the country analysis'
                      }
                    }}
                    loading={chartData.isLoading}
                    logo={logo}
                    source={source}
                    title={chart.title}
                  >
                    {chart.type === 'hurumap'
                      ? [
                          <Chart
                            key={chart.id}
                            chartData={chartData}
                            definition={{
                              ...chart.stat,
                              typeProps: {
                                ...chart.stat.typeProps,
                                classes: {
                                  description: classes.statDescription,
                                  statistic: classes.statStatistic,
                                  subtitle: classes.statSubtitle
                                }
                              }
                            }}
                            profiles={profiles}
                            classes={classes}
                          />,
                          <Chart
                            key={chart.id}
                            chartData={chartData}
                            definition={chart.visual}
                            profiles={profiles}
                            classes={classes}
                          />
                        ]
                      : [
                          <div key={chart.id} />,
                          <iframe
                            key={chart.id}
                            width="100%"
                            scrolling="no"
                            frameBorder="0"
                            title={chart.title}
                            src={`${config.WP_HURUMAP_DATA_API}/flourish/${chart.id}`}
                          />
                        ]}
                  </InsightContainer>
                </Grid>
              );
            })}
        </Grid>
      )),
    [profileTabs, chartData, classes, country.slug, profiles, geoId]
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
          drawChildren={
            geoId.split('-')[1] === 'NG' || geoId.split('-')[1] === 'KE'
          }
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
  sectionedCharts: PropTypes.arrayOf(
    PropTypes.shape({
      charts: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string
        })
      ).isRequired
    })
  ).isRequired
};

Profile.getInitialProps = async () => {
  return {
    sectionedCharts: await getSectionedCharts()
  };
};

export default Profile;
