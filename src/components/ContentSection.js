/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';

import Section from './Section';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    margin: 0,
    padding: '0 0.75rem',
    [breakpoints.up('md')]: {
      width: '43.734375rem' // .75 of lg
    },
    [breakpoints.up('lg')]: {
      width: '58.3125rem'
    }
  }
}));

function ContentSection({ children, title, variant, ...props }) {
  const classes = useStyles();
  return (
    <Section
      classes={{ root: classes.root }}
      title={title}
      variant={variant}
      {...props}
    >
      {children}
    </Section>
  );
}

ContentSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string,
  variant: PropTypes.string
};

ContentSection.defaultProps = {
  title: null,
  variant: 'h2'
};

export default ContentSection;
