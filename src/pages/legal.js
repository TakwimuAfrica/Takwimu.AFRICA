import React, { useCallback, useEffect, useState, useMemo } from 'react';

import { useRouter } from 'next/router';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { getSitePage } from '../cms';
import ContentPage from '../components/ContentPage';
import LegalContent from '../components/LegalContent';
import Page from '../components/Page';
import TableOfContent from '../components/LegalContent/TableOfContent';

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
    page: { title, content, navigation_title: navigationTitle }
  } = takwimu;

  const contentHeadings = useMemo(() => {
    const {
      page: { content: body = [] }
    } = takwimu;

    const terms = body.find(c => c.type === 'terms');
    const privacy = body.find(c => c.type === 'privacy');

    const headings = [];
    if (terms) {
      headings.push({
        title: terms.label,
        link: 'terms'
      });
    }
    if (privacy) {
      headings.push({
        title: privacy.label,
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
        <LegalContent
          title={title}
          navigationTitle={navigationTitle}
          contents={content}
          contentHeadings={contentHeadings}
          current={current}
          changeActiveContent={changeActiveContent}
        />
      </ContentPage>
    </Page>
  );
}

Legal.getInitialProps = async () => {
  return getSitePage('legal');
};

export default Legal;
