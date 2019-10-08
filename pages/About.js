import React, { useCallback, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';

import { useRouter } from 'next/router';
import AboutContent from '../src/components/AboutContent';
import ContentPage from '../src/components/ContentPage';
import Page from '../src/components/Page';
import TableOfContent from '../src/components/AboutContent/TableOfContent';
import getTakwimuPage from '../src/getTakwimuPage';

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
      about_takwimu: aboutTakwimu,
      content_navigation: contentNavigation,
      faqs,
      methodology,
      related_content: relatedContent,
      services
    },
    settings: { socialMedia }
  } = takwimu;
  const contentHeadings = [];
  if (aboutTakwimu && aboutTakwimu.value) {
    contentHeadings.push({
      title: aboutTakwimu.value.label,
      link: 'about'
    });
  }
  if (methodology && methodology.value) {
    contentHeadings.push({
      title: methodology.value.label,
      link: 'methodology'
    });
  }
  if (services && services.value) {
    contentHeadings.push({
      title: services.value.label,
      link: 'services'
    });
  }
  if (faqs && faqs.value) {
    contentHeadings.push({ title: faqs.value.label, link: 'faqs' });
  }

  const [current, setCurrent] = useState(-1);
  const changeActiveContent = useCallback(
    index => {
      setCurrent(index);
      const activeElement = document.getElementById(
        contentHeadings[index].link
      );
      if (activeElement) {
        window.scrollTo(0, activeElement.offsetTop - 90);
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
          socialMedia={socialMedia}
          current={current}
          contentHeadings={contentHeadings}
          changeActiveContent={changeActiveContent}
        />
      </ContentPage>
    </Page>
  );
}

About.getInitialProps = async () => {
  return getTakwimuPage('takwimu.AboutPage');
};

export default About;
