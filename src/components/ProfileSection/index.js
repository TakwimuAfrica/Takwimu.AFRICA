import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import { RichTypography } from '../core';
import Section from '../Section';
import Tabs from './Tabs';

const useStyles = makeStyles({
  root: {},
  sectionTitle: {
    margin: '2.75rem 0'
  },
  description: {
    marginBottom: '1rem'
  }
});

function ProfileSection({ profile, tabs, description, switchToTab }) {
  const classes = useStyles();
  const [value] = useState(0);

  const handleChange = (_event, v) => {
    if (switchToTab) {
      switchToTab(v);
    }
  };

  const { geo } = profile;

  const title = value === 0 ? 'Data by Topic' : tabs[value].name;

  // Wagtail inserts div/p when RichTextField is empty
  const hasDescription = () =>
    description &&
    description.length > 0 &&
    description !== '<p></p>' &&
    description !== '<div class="rich-text"></div>';
  return (
    <div className={classes.root}>
      <Tabs
        handleChange={handleChange}
        profile={profile}
        tabs={tabs}
        value={value}
      />
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
      href: PropTypes.string.isRequired
    })
  ).isRequired,
  description: PropTypes.string,
  switchToTab: PropTypes.func
};

ProfileSection.defaultProps = {
  switchToTab: undefined,
  description: undefined
};

export default ProfileSection;
