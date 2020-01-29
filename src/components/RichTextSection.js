/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import Section from './Section';
import RichTypography from './RichTypography';

const useStyles = makeStyles({
  root: {},
  text: {}
});

function RichTextSection({ component, title, value, variant, ...props }) {
  const classes = useStyles(props);
  const text = (
    <RichTypography classes={{ root: classes.text }} component="div">
      {value}
    </RichTypography>
  );
  return React.createElement(
    component,
    {
      title,
      variant,
      classes: { root: classes.root },
      ...props
    },
    text
  );
}

RichTextSection.propTypes = {
  component: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  variant: PropTypes.string
};

RichTextSection.defaultProps = {
  variant: 'h3',
  component: Section
};

export default RichTextSection;
