import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import TableOfContent from '../TableOfContent';

const useStyles = makeStyles(theme => ({
  root: {},
  sideMenuHeader: {
    color: theme.palette.info.other
  }
}));

function ContactUsTableOfContent({ current, contentHeadings }) {
  const generateHref = index => {
    const item = contentHeadings[index];
    return `/contact#${item.link}`;
  };
  const classes = useStyles();

  return (
    <TableOfContent
      current={current}
      classes={{ root: classes.root }}
      content={contentHeadings}
      generateHref={generateHref}
    >
      <Typography variant="subtitle2" className={classes.sideMenuHeader}>
        Jump to:
      </Typography>
    </TableOfContent>
  );
}

ContactUsTableOfContent.propTypes = {
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string
    }).isRequired
  ).isRequired
};

export default ContactUsTableOfContent;
