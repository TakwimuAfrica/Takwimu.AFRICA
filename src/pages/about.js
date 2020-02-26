import React, { useMemo, useEffect } from 'react';

import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';

import { getSitePage } from '../cms';
import AboutContent from '../components/AboutContent';
import ContentPage from '../components/ContentPage';
import Page from '../components/Page';
import AsideTableOfContent from '../components/AsideTableOfContent';
import config from '../config';

const useStyles = makeStyles({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function About(takwimu) {
  const classes = useStyles();
  const { pathname } = useRouter();

  const {
    page: {
      title,
      content,
      navigation_title: contentNavigation,
      faqs_label: faqsLabel,
      faqs_title: faqsTitle,
      faqs_description: faqsDescription,
      questions_answers: questionsAnswers,
      related_content_title: relatedContentTitle,
      related_links: relatedLinks,
      where_to_next_title: whereToNextTitle,
      where_to_next_link: whereToNextLink
    }
  } = takwimu;

  const aboutTakwimu = content.find(c => c.type === 'about') || {};
  const methodology = content.find(c => c.type === 'methodology') || {};
  const services = content.find(c => c.type === 'services') || {};

  const faqs = {
    label: faqsLabel,
    title: faqsTitle,
    description: faqsDescription,
    questionsAnswers
  };
  const relatedContent = {
    title: relatedContentTitle,
    relatedLinks: relatedLinks || []
  };
  const whereToNext = {
    title: whereToNextTitle,
    whereToNextLink
  };
  const contentHeadings = [];
  if (aboutTakwimu) {
    contentHeadings.push({
      title: aboutTakwimu.label,
      link: 'about'
    });
  }
  if (methodology) {
    contentHeadings.push({
      title: methodology.label,
      link: 'methodology'
    });
  }
  if (services) {
    contentHeadings.push({
      title: services.label,
      link: 'services'
    });
  }
  if (faqs) {
    contentHeadings.push({ title: faqs.label, link: 'faqs' });
  }

  const current = useMemo(() => {
    const currentLink = pathname.split('/').pop();
    return contentHeadings.findIndex(x => x.link === currentLink);
  }, [pathname, contentHeadings]);

  useEffect(() => {
    if (current === -1) {
      return;
    }
    const { link } = contentHeadings[current];
    if (link === 'about') {
      window.scrollTo(0, 0);
    } else {
      const sectionEl = document.getElementById(link);
      if (sectionEl) {
        window.scrollTo(0, sectionEl.offsetTop - 90);
      }
    }
  }, [contentHeadings, current]);

  return (
    <Page takwimu={takwimu} title={title}>
      <ContentPage
        aside={
          <AsideTableOfContent
            current={current}
            contentHeadings={contentHeadings}
            generateHref={({ link }) => `/${link}`}
          />
        }
        classes={{ root: classes.root }}
      >
        <AboutContent
          title={title}
          faqs={faqs}
          contentNavigation={contentNavigation}
          aboutTakwimu={aboutTakwimu}
          methodology={methodology}
          relatedContent={relatedContent}
          services={services}
          whereToNext={whereToNext}
          current={current}
          contentHeadings={contentHeadings}
        />
      </ContentPage>
    </Page>
  );
}

About.getInitialProps = async props => {
  const {
    query: { lang: pageLanguage }
  } = props;
  const lang = pageLanguage || config.DEFAULT_LANG;
  return getSitePage('about', lang);
};

export default About;
