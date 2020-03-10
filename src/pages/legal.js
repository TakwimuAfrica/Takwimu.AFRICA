import React, { useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';

import { getSitePage } from '../cms';
import ContentPage from '../components/ContentPage';
import LegalContent from '../components/LegalContent';
import Page from '../components/Page';
import AsideTableOfContent from '../components/AsideTableOfContent';
import config from '../config';

const useStyles = makeStyles({
  root: {
    marginTop: '2.875rem',
    marginBottom: '4.375rem'
  }
});

function Legal(takwimu) {
  const classes = useStyles();
  const { pathname } = useRouter();
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

  const current = useMemo(() => {
    const currentLink = pathname.split('/').pop();
    return contentHeadings.findIndex(x => x.link === currentLink);
  }, [pathname, contentHeadings]);

  useEffect(() => {
    if (current === -1) {
      return;
    }
    const { link } = contentHeadings[current];
    const sectionEl = document.getElementById(link);
    if (sectionEl) {
      window.scrollTo(0, sectionEl.offsetTop - 90);
    }
  }, [contentHeadings, current]);

  return (
    <Page takwimu={takwimu} title={title}>
      <ContentPage
        classes={{ root: classes.root }}
        aside={
          <AsideTableOfContent
            current={current}
            contentHeadings={contentHeadings}
            generateHref={({ link }) => `/${link}`}
          />
        }
      >
        <LegalContent
          title={title}
          current={current}
          contents={content}
          navigationTitle={navigationTitle}
          contentHeadings={contentHeadings}
        />
      </ContentPage>
    </Page>
  );
}

Legal.getInitialProps = async props => {
  const {
    query: { lang: pageLanguage }
  } = props;
  const lang = pageLanguage || config.DEFAULT_LANG;
  return getSitePage('legal', lang);
};

export default Legal;
