import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import TableOfContent from './TableOfContent';

const useStyles = makeStyles(theme => ({
  asideRoot: {
    [theme.breakpoints.up('md')]: {
      top: '10.375rem'
    }
  },
  asideHeader: {
    color: theme.palette.info.other
  },
  asideMenuListRoot: {
    marginTop: '1.625rem'
  }
}));

function AsideTableOfContent({
  hideTitle,
  children,
  current,
  contentHeadings,
  ...props
}) {
  const classes = useStyles();
  return (
    <TableOfContent
      current={current}
      classes={{
        root: classes.asideRoot,
        menuListRoot: classes.asideMenuListRoot
      }}
      content={contentHeadings}
      {...props}
    >
      {!hideTitle && (
        <Typography variant="subtitle2" className={classes.asideHeader}>
          Jump to:
        </Typography>
      )}
      {children}
    </TableOfContent>
  );
}

AsideTableOfContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  hideTitle: PropTypes.bool,
  current: PropTypes.number.isRequired,
  contentHeadings: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string
    }).isRequired
  ).isRequired
};

AsideTableOfContent.defaultProps = {
  hideTitle: false,
  children: undefined
};

export default AsideTableOfContent;
