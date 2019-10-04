import React, { useCallback, useEffect, useState, useMemo } from 'react';

import makeStyles from '@material-ui/styles/makeStyles';

import { useRouter } from 'next/router';
import ContentPage from '../components/ContentPage';
import LegalContent from '../components/LegalContent';
import Page from '../components/Page';
import TableOfContent from '../components/LegalContent/TableOfContent';
import getTakwimuPage from '../getTakwimuPage';

const useStyles = makeStyles({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function Legal(takwimu) {
  const classes = useStyles();
  const { pathname } = useRouter();
  const [current, setCurrent] = useState(-1);
  const {
    page: {
      title,
      content_navigation: {
        value: { title: navigationTitle }
      },
      body: contents = [],
      related_content: relatedContent
    }
  } = takwimu;

  const contentHeadings = useMemo(() => {
    const {
      page: { body = [] }
    } = takwimu;
    const termsIndex = body.findIndex(c => c.type === 'terms');
    const privacyIndex = body.findIndex(c => c.type === 'privacy');
    const headings = [];
    if (termsIndex !== -1) {
      headings.push({
        title: body[termsIndex].value.label,
        link: 'terms'
      });
    }
    if (privacyIndex !== -1) {
      headings.push({
        title: body[privacyIndex].value.label,
        link: 'privacy'
      });
    }
    return headings;
  }, [takwimu]);

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
    const currentLink = pathname.split('/').pop();
    const foundIndex = contentHeadings.findIndex(x => x.link === currentLink);
    if (foundIndex !== -1) {
      changeActiveContent(foundIndex);
    }
  }, [changeActiveContent, contentHeadings, pathname]);

  return (
    <Page takwimu={takwimu} title={takwimu.page.title}>
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

Legal.getInitialProps = async () => {
  return getTakwimuPage('takwimu.LegalPage');
};

export default Legal;
