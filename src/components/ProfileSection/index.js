import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import RichTypography from '../RichTypography';
import Section from '../Section';
import Tabs from './Tabs';

const useStyles = makeStyles({
  root: {},
  tabs: {
    height: '6.25rem' // 100px / 16
  },
  fix: {
    position: 'fixed',
    zIndex: 999,
    top: 0,
    right: 0,
    left: 0
  },
  sectionTitle: {
    margin: '2.75rem 0'
  },
  description: {
    marginBottom: '1rem'
  }
});

function ProfileSection({
  profile,
  tabs,
  description,
  activeTab,
  setActiveTab
}) {
  const classes = useStyles();
  const [fixToTop, setFixToTop] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const el = document.getElementById('section-tabs');
      const rect = el.getBoundingClientRect();
      if (rect.y <= 0 && !fixToTop) {
        setFixToTop(true);
      } else if (rect.y > 0 && fixToTop) {
        setFixToTop(false);
      } else {
        //
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fixToTop]);

  const handleChange = (_event, v) => {
    if (setActiveTab) {
      setActiveTab(v);
    }

    setTimeout(() => {
      const sectionTab = document.getElementById('section-tabs');
      if (sectionTab) {
        sectionTab.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const { geo } = profile;

  const tab = tabs.find(t => t.slug === activeTab);
  const title = activeTab === 'all' || !tab ? 'Data by Topic' : tab.name;

  // Wagtail inserts div/p when RichTextField is empty
  const hasDescription = () =>
    description &&
    description.length > 0 &&
    description !== '<p></p>' &&
    description !== '<div class="rich-text"></div>';
  return (
    <div className={classes.root}>
      <div id="section-tabs" className={classes.tabs}>
        <div
          className={classNames(classes.tabs, {
            [classes.fix]: fixToTop
          })}
        >
          <Tabs
            handleChange={handleChange}
            profile={profile}
            tabs={tabs}
            value={activeTab}
          />
        </div>
      </div>
      <Section
        title={`${geo.name}'s ${title}`}
        classes={{ title: classes.sectionTitle }}
      >
        {hasDescription && (
          <RichTypography className={classes.description}>
            {description}
          </RichTypography>
        )}
      </Section>
    </div>
  );
}

ProfileSection.propTypes = {
  profile: PropTypes.shape({
    geo: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ).isRequired,
  description: PropTypes.string,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func
};

ProfileSection.defaultProps = {
  activeTab: undefined,
  setActiveTab: undefined,
  description: undefined
};

export { default as ProfileSectionTitle } from './Title';

export default ProfileSection;
