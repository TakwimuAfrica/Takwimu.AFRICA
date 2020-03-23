import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Head from 'next/head';
import config from '../../config';
import AnalysisContent from '../AnalysisContent';
import ContentPage from '../ContentPage';
import Page from '../Page';
import AsideTableOfContent from '../AsideTableOfContent';
import CountrySelector from '../CountrySelector';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '5.5rem'
  },
  asideRoot: {},
  countrySelectorLabel: {
    fontSize: theme.typography.caption.fontSize
  }
}));

function AnalysisPage({
  takwimu,
  initial,
  activeAnalysis,
  analyses,
  analysisLink,
  readNextTitle,
  topicsNavigation,
  contentSelector,
  contentActionsLabels,
  indicatorId
}) {
  const classes = useStyles();

  useEffect(() => {
    const el = document.getElementById(indicatorId);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        });
      }, 1000);
    }
  }, [indicatorId]);

  if (analyses.length === 0) {
    return null;
  }
  return (
    <Page
      takwimu={takwimu}
      title={`${takwimu.country.short_name}'s ${activeAnalysis.post_title} Analysis`}
    >
      <Head>
        <link
          rel="stylesheet"
          href={`${config.WP_BACKEND_URL}/wp-admin/load-styles.php?c=0&dir=ltr&load%5B%5D=dashicons,buttons,media-views,wp-components,wp-nux,wp-block-library,wp-block-&load%5B%5D=library-theme,wp-format-library,common,forms,dashboard,list-tables,edit,revisions,media,t&load%5B%5D=hemes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-color-picker`}
        />
        <link
          rel="stylesheet"
          href={`${config.WP_BACKEND_URL}/wp-includes/js/mediaelement/wp-mediaelement.min.css`}
        />
      </Head>
      <ContentPage
        aside={
          <AsideTableOfContent
            hideTitle
            top={120}
            current={initial}
            contentHeadings={analyses.map(section => ({
              title: section.post_title,
              postName: section.post_name
            }))}
            generateHref={({ postName }, index) => {
              const {
                country: { slug: countrySlug, lang },
                language
              } = takwimu;

              const initUrl =
                lang === language
                  ? `/profiles/${countrySlug}`
                  : `/profiles/${countrySlug}?lang=${language}`;
              const sectionUrl =
                lang === language
                  ? `/profiles/${countrySlug}/${postName}`
                  : `/profiles/${countrySlug}/${postName}?lang=${language}`;

              const href =
                index === 0
                  ? `/profiles/[geoIdOrCountrySlug]` // if politics
                  : `/profiles/[geoIdOrCountrySlug]/[analysisSlug]`;
              const as =
                index === 0
                  ? initUrl // if politics
                  : sectionUrl;
              return { href, as };
            }}
          >
            <CountrySelector
              context="analysis"
              country={takwimu.country}
              classes={{ label: classes.countrySelectorLabel }}
            />
          </AsideTableOfContent>
        }
        classes={{ root: classes.root, aside: classes.asideRoot }}
      >
        <AnalysisContent
          content={activeAnalysis}
          takwimu={takwimu}
          analysisLink={analysisLink}
          readNextTitle={readNextTitle}
          topicsNavigation={topicsNavigation}
          contentSelector={contentSelector}
          contentActionsLabels={contentActionsLabels}
        />
      </ContentPage>
    </Page>
  );
}

AnalysisPage.propTypes = {
  initial: PropTypes.number.isRequired,
  activeAnalysis: PropTypes.shape({
    post_title: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        ID: PropTypes.number
      })
    )
  }).isRequired,
  analyses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  takwimu: PropTypes.shape({
    country: PropTypes.shape({
      short_name: PropTypes.string,
      slug: PropTypes.string,
      lang: PropTypes.string
    }),
    language: PropTypes.string.isRequired
  }).isRequired,
  analysisLink: PropTypes.string.isRequired,
  readNextTitle: PropTypes.string.isRequired,
  topicsNavigation: PropTypes.string.isRequired,
  contentSelector: PropTypes.shape({}).isRequired,
  contentActionsLabels: PropTypes.shape({}).isRequired,
  indicatorId: PropTypes.shape({})
};

AnalysisPage.defaultProps = {
  indicatorId: undefined
};
export default AnalysisPage;
