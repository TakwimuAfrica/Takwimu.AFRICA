import React from 'react';
import { PropTypes } from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import WhereToNext from './Next';
import ContentNavigation from './PageContentNavigation';
import ContentSection from './ContentSection';
import Faqs from './Faqs';
import RelatedContent from './RelatedContent';
import RichTextSection from './RichTextSection';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '933px'
  },
  title: {
    marginBottom: '1.375rem',
    padding: '0 0.75rem'
  },
  body: {
    padding: '0 19px'
  },
  section: {
    marginTop: '2.5rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    borderTop: `4px solid ${theme.palette.primary.main}`
  },
  whereToNext: {
    width: '100%',
    margin: 0,
    padding: 0,
    [theme.breakpoints.up('md')]: {
      width: '43.734375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.3125rem'
    }
  }
}));

function AboutContent({
  title,
  contentNavigation,
  aboutTakwimu,
  methodology,
  relatedContent,
  current,
  contentHeadings,
  faqs,
  services,
  whereToNext,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <>
      <ContentNavigation
        navigation
        current={current}
        title={contentNavigation}
        content={contentHeadings}
        generateHref={content => `/${content.link}`}
        generateTitle={content => content.title}
      />
      <Typography variant="h2" className={classes.title}>
        {title}
      </Typography>
      <ContentNavigation
        current={current}
        title={contentNavigation}
        content={contentHeadings}
        generateHref={content => `/${content.link}`}
        generateTitle={content => content.title}
      />
      <RichTextSection
        classes={{ root: classes.section }}
        title={aboutTakwimu.title}
        value={aboutTakwimu.description}
        id="about"
        component={ContentSection}
      />

      <RichTextSection
        classes={{ root: classes.section }}
        title={methodology.title}
        value={methodology.description}
        id="methodology"
        component={ContentSection}
      />
      <RichTextSection
        classes={{ root: classes.section }}
        title={services.title}
        value={services.description}
        id="services"
        component={ContentSection}
      />
      <Faqs classes={{ root: classes.section }} faqs={faqs} id="faqs" />
      <WhereToNext
        classes={{ sectionRoot: classes.whereToNext }}
        whereToNext={whereToNext}
        variant="dual"
      />
      <RelatedContent content={relatedContent} />
    </>
  );
}

AboutContent.propTypes = {
  title: PropTypes.string.isRequired,
  contentNavigation: PropTypes.string.isRequired,
  aboutTakwimu: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  methodology: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  faqs: PropTypes.shape({}).isRequired,
  services: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  whereToNext: PropTypes.shape({
    title: PropTypes.string,
    whereLink: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  relatedContent: PropTypes.shape({}).isRequired,
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  changeActiveContent: PropTypes.func.isRequired
};

export default AboutContent;
