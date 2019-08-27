import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import config from '../config';
import AboutContent from '../components/AboutContent/index';
import ContentPage from '../components/ContentPage';
import Page from '../components/Page';
import TableOfContent from '../components/AboutContent/TableOfContent';

const styles = () => ({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function About({ classes }) {
  const [takwimu, setTakwimu] = useState(undefined);
  useEffect(() => {
    const { url } = config;
    fetch(`${url}/api/v2/pages/?type=takwimu.AboutPage&fields=*&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length) {
          Object.assign(config.page, data.items[0]);
          setTakwimu(config);
        }
      });
  }, []);

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
  } = takwimu || {
    page: {
      about_takwimu: {},
      methodology: {},
      faqs: {},
      services: {},
      related_content: {}
    },
    settings: {}
  };
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
    contentHeadings.push({ title: services.value.label, link: 'services' });
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
      window.scrollTo(0, activeElement.offsetTop - 90);
    },
    [contentHeadings]
  );
  useEffect(() => {
    const foundIndex = contentHeadings.findIndex(
      x => x.link === window.location.pathname.replace(/^\//, '')
    );
    if (foundIndex !== -1) {
      changeActiveContent(foundIndex);
    }
  }, [changeActiveContent, contentHeadings]);

  if (!takwimu) {
    return null;
  }

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

About.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.shape({}).isRequired
  }).isRequired
};

export default withStyles(styles)(About);
