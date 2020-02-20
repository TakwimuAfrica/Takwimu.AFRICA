import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useProfileLoader } from '@codeforafrica/hurumap-ui/factory';
import Card from '@codeforafrica/hurumap-ui/components/Card';
import { shareIndicator } from '@codeforafrica/hurumap-ui/components/utils';

import config from '../config';

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
    lineHeight: 1.71,
    wordBreak: 'break-word'
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
    marginTop: '1rem',
    paddingRight: '1.25rem' // On the same line as chart title hence better to have spacing between them
  },
  title: {
    fontFamily: typography.fontText,
    lineHeight: 2.05,
    marginTop: '1rem'
  }
}));

const overrideTypePropsFor = chartType => {
  switch (chartType) {
    case 'column': // Fall through
    case 'grouped_column':
      return {
        parts: {
          axis: {
            dependent: {
              style: {
                grid: {
                  display: 'none'
                },
                tickLabels: {
                  display: 'none'
                }
              }
            }
          }
        }
      };
    default:
      return {};
  }
};

function Profile({ sectionedCharts }) {
  const router = useRouter();
  const classes = useStyles();

  const {
    query: { geoIdOrCountrySlug: geoId = '' }
  } = router;

  const [activeTab, setActiveTab] = useState(
    process.browser && window.location.hash.slice(1)
      ? window.location.hash.slice(1)
      : 'all'
  );

  const filterByGeography = useCallback(
    ({ type, inGeographies }) =>
      type !== 'hurumap' ||
      inGeographies
        .map(({ geoLevel, geoCode }) => `${geoLevel}-${geoCode}`)
        .includes(geoId),
    [geoId]
  );

  const visuals = useMemo(
    () =>
      sectionedCharts
        .reduce((a, b) => a.concat(b.charts), [])
        .filter(filterByGeography)
        .map(({ visual }) => visual),
    [filterByGeography, sectionedCharts]
  );

  const { profiles, chartData } = useProfileLoader({
    geoId,
    visuals,
    populationTables: config.populationTables
  });

  const useProfileAndChartData = useCallback(
    () => ({
      profiles,
      chartData
    }),
    [chartData, profiles]
  );
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

  // get all available profile tabs
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
            sectionCharts.filter(filterByGeography).length !== 0
        )
    ],
    [sectionedCharts, filterByGeography]
  );

  // Show and hide sections
  useEffect(() => {
    if (activeTab === 'all') {
      profileTabs.slice(1).forEach(tab => {
        const tabElement = document.getElementById(tab.slug);
        // Remember to display all section titles
        tabElement.children[0].children[0].style.display = 'block';
        tabElement.style.display = 'flex';
      });
    } else {
      profileTabs.slice(1).forEach(tab => {
        const tabElement = document.getElementById(tab.slug);
        if (tab.slug === activeTab) {
          // Hide section title for active tab
          tabElement.children[0].children[0].style.display = 'none';
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
      <Box width="100%" height="500px" overflow="hidden">
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
      </Box>
      {!profiles.isLoading && (
        <ProfileSection
          profile={{ geo: profiles.profile }}
          tabs={profileTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      <Section>
        {profileTabs.slice(1).map(tab => (
          <Grid item id={tab.slug} key={tab.slug}>
            <Grid container>
              <ProfileSectionTitle tab={tab} />
              <Grid item>
                <Grid container spacing={4}>
                  {tab.charts
                    // Filter loaded charts
                    .filter(filterByGeography)
                    .map(chart => {
                      return (
                        <Grid item xs={12} key={chart.id}>
                          <Card
                            key={chart.id}
                            type="hurumap"
                            geoId={geoId}
                            id={chart.id}
                            logo={logo}
                            showInsight
                            showStatVisual
                            definition={{
                              ...chart,
                              visual: {
                                ...chart.visual,
                                typeProps: {
                                  ...chart.visual.typeProps,
                                  ...overrideTypePropsFor(chart.visual.type)
                                }
                              }
                            }}
                            useLoader={useProfileAndChartData}
                            dataLinkHref="#"
                            dataLinkTitle="Read the country analysis"
                            analysisLinkCountrySlug={country.slug}
                            actions={{
                              handleShare: shareIndicator.bind(
                                null,
                                chart.id,
                                geoId,
                                '/api/share'
                              ),
                              handleShowData: null,
                              handleCompare: null
                            }}
                            classes={{
                              insight: classes.insight,
                              actionsCompareButton:
                                classes.actionsCompareButton,
                              actionsShareButton: classes.actionsShareButton,
                              actionsShowDataButton:
                                classes.actionsShowDataButton,
                              actionsRoot: classes.actionsRoot,
                              root: classes.containerRoot,
                              sourceGrid: classes.containerSourceGrid,
                              sourceLink: classes.containerSourceLink,
                              insightAnalysisLink:
                                classes.containerInsightAnalysisLink,
                              insightDataLink: classes.containerInsightDataLink,
                              insightGrid: classes.insightGrid,
                              highlightGrid:
                                chart.type === 'flourish' &&
                                classes.hideHighlightGrid,
                              title: classes.title
                            }}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Section>
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
