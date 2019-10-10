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

function AboutUsTableOfContent({ current, contentHeadings }) {
  const classes = useStyles();
  const generateHref = index => {
    const item = contentHeadings[index];
    return `/${item.link}`;
  };

  return (
    <TableOfContent
      classes={{ root: classes.root }}
      content={contentHeadings}
      current={current}
      generateHref={generateHref}
    >
      <Typography variant="subtitle2" className={classes.sideMenuHeader}>
        Jump to:
      </Typography>
    </TableOfContent>
  );
}

AboutUsTableOfContent.propTypes = {
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string
    }).isRequired
  ).isRequired
};

export default AboutUsTableOfContent;
