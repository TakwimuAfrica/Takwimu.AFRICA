import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

import config from '../config';
import ContentPage from '../components/ContentPage';
import LegalContent from '../components/LegalContent';
import Page from '../components/Page';
import TableOfContent from '../components/LegalContent/TableOfContent';

const styles = () => ({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function Legal({ classes }) {
  const [takwimu, setTakwimu] = useState(undefined);
  useEffect(() => {
    const { url } = config;
    fetch(`${url}/api/v2/pages/?type=takwimu.LegalPage&fields=*&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data.items && data.items.length) {
          Object.assign(config.page, data.items[0]);
          setTakwimu(config);
        }
      });
  }, []);
  const [current, setCurrent] = useState(-1);
  const contentHeadings = [];
  const {
    page: {
      title,
      content_navigation: {
        value: { title: navigationTitle }
      },
      body: contents = [],
      related_content: relatedContent
    }
  } = takwimu || { page: { content_navigation: { value: {} } } };
  const termsIndex = contents.findIndex(c => c.type === 'terms');
  const privacyIndex = contents.findIndex(c => c.type === 'privacy');
  contentHeadings.length = contents.length;
  if (termsIndex !== -1) {
    contentHeadings[termsIndex] = {
      title: contents[termsIndex].value.label,
      link: 'terms'
    };
  }
  if (privacyIndex !== -1) {
    contentHeadings[privacyIndex] = {
      title: contents[privacyIndex].value.label,
      link: 'privacy'
    };
  }

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
    const currentLink = window.location.pathname
      .split('/')
      .filter(value => value && value.length)
      .pop();
    const foundIndex = contentHeadings.findIndex(x => x.link === currentLink);
    if (foundIndex !== -1) {
      changeActiveContent(foundIndex);
    }
  }, [changeActiveContent, contentHeadings]);

  if (contents.length === 0) {
    return null;
  }

  return (
    <Page takwimu={takwimu} title="Legal">
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
        <LegalContent
          title={title}
          navigationTitle={navigationTitle}
          contents={contents}
          contentHeadings={contentHeadings}
          current={current}
          changeActiveContent={changeActiveContent}
          relatedContent={relatedContent}
        />
      </ContentPage>
    </Page>
  );
}

Legal.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.shape({}).isRequired
  }).isRequired
};

export default withStyles(styles)(Legal);
