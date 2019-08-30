import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import TableOfContent from '../TableOfContent';

const useStyles = makeStyles(({ theme }) => ({
  root: {},
  sideMenuHeader: {
    color: theme.palette.info.other
  }
}));

function LegalTableOfContent({
  current,
  contentHeadings,
  changeActiveContent
}) {
  const generateHref = index => {
    const item = contentHeadings[index];
    return `/${item.link}`;
  };
  const classes = useStyles();

  return (
    <TableOfContent
      classes={{ root: classes.root }}
      content={contentHeadings}
      current={current}
      generateHref={generateHref}
      onChange={changeActiveContent}
    >
      <Typography variant="subtitle2" className={classes.sideMenuHeader}>
        Jump to:
      </Typography>
    </TableOfContent>
  );
}

LegalTableOfContent.propTypes = {
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string
    }).isRequired
  ).isRequired,
  changeActiveContent: PropTypes.func.isRequired
};

export default LegalTableOfContent;
