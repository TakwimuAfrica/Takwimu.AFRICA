import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';

import { getSitePage } from '../getTakwimuPage';
import AboutContent from '../components/AboutContent';
import ContentPage from '../components/ContentPage';
import Page from '../components/Page';
import TableOfContent from '../components/AboutContent/TableOfContent';

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

  const [current, setCurrent] = useState(-1);
  const changeActiveContent = useCallback(
    index => {
      setCurrent(index);

      if (contentHeadings[index].link === 'about') {
        window.scrollTo(0, 0);
      } else {
        const activeElement = document.getElementById(
          contentHeadings[index].link
        );
        if (activeElement) {
          window.scrollTo(0, activeElement.offsetTop - 90);
        }
      }
    },
    [contentHeadings]
  );
  useEffect(() => {
    const currentLink = pathname.split('/').pop();
    const foundIndex = contentHeadings.findIndex(x => x.link === currentLink);
    if (foundIndex !== -1) {
      changeActiveContent(foundIndex);
    }
  }, [pathname, changeActiveContent, contentHeadings]);

  return (
    <Page takwimu={takwimu} title={title}>
      <ContentPage
        aside={
          <TableOfContent
            current={current}
            contentHeadings={contentHeadings}
            changeActiveContent={changeActiveContent}
          />
        }
        classes={{ root: classes.root }}
      >
        <AboutContent
          title={title}
          contentNavigation={contentNavigation}
          aboutTakwimu={aboutTakwimu}
          methodology={methodology}
          relatedContent={relatedContent}
          faqs={faqs}
          services={services}
          whereToNext={whereToNext}
          current={current}
          contentHeadings={contentHeadings}
          changeActiveContent={changeActiveContent}
        />
      </ContentPage>
    </Page>
  );
}

About.getInitialProps = async () => {
  return getSitePage('about');
};

export default About;
