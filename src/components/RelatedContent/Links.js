import React from 'react';
import PropTypes from 'prop-types';

import NextLink from 'next/link';

import { Link, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui/core/A';

const useStyles = makeStyles(theme => ({
  root: {},
  list: {},
  listItem: {
    display: 'block',
    lineHeight: 2.28,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '21.375rem'
    },
    [theme.breakpoints.up('lg')]: {
      width: '28.5rem'
    }
  },
  tooltip: {
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: theme.palette.primary.main
  }
}));

function Links({ items }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography
        variant="body2"
        color="primary"
        className={classes.list}
        component="ul"
      >
        {items.map(item => (
          <li key={item.link}>
            <Tooltip
              title={item.title}
              placement="bottom-start"
              classes={{ tooltip: classes.tooltip }}
            >
              {/* Only relative URLs should be opened on the same page. */}
              {/* Otherwise, they should be opened in new tab */}
              {/^\/(?!\/)/.test(item.link) ? (
                <NextLink href={item.link}>
                  <Link
                    href={item.link}
                    variant="inherit"
                    color="inherit"
                    underline="always"
                    noWrap
                    className={classes.listItem}
                  >
                    {item.title}
                  </Link>
                </NextLink>
              ) : (
                <A
                  href={item.link}
                  variant="inherit"
                  color="inherit"
                  underline="always"
                  noWrap
                  className={classes.listItem}
                >
                  {item.title}
                </A>
              )}
            </Tooltip>
          </li>
        ))}
      </Typography>
    </div>
  );
}

Links.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired
};

export default Links;
