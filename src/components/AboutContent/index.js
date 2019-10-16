import React from 'react';
import { PropTypes } from 'prop-types';

import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import AboutUsContentNav from './AboutUsContentNav';
import { About as AboutWhereToNext } from '../Next';
import ContentNavigation from './ContentNavigation';
import ContentSection from '../ContentSection';
import Faqs from '../Faqs';
import RelatedContent from '../RelatedContent';
import RichTextSection from '../RichTextSection';

const styles = theme => ({
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
  }
});

class AboutContent extends React.Component {
  constructor(props) {
    super(props);

    this.showContent = this.showContent.bind(this);
  }

  showContent(currentContent) {
    const { changeActiveContent } = this.props;
    return () => {
      changeActiveContent(currentContent);
    };
  }

  render() {
    const {
      classes,
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
      socialMedia
    } = this.props;

    return (
      <>
        <AboutUsContentNav
          title={contentNavigation}
          current={current}
          contentHeadings={contentHeadings}
          changeActiveContent={this.showContent}
        />
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        <ContentNavigation
          title={contentNavigation}
          contentHeadings={contentHeadings}
          current={current}
          changeActiveContent={this.showContent}
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
        <AboutWhereToNext whereToNext={whereToNext} socialMedia={socialMedia} />
        <RelatedContent content={relatedContent} />
      </>
    );
  }
}

AboutContent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
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
  socialMedia: PropTypes.shape({}).isRequired,
  relatedContent: PropTypes.shape({}).isRequired,
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  changeActiveContent: PropTypes.func.isRequired
};

export default withStyles(styles)(AboutContent);
