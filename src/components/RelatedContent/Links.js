import React from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { Link, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { A } from '@codeforafrica/hurumap-ui';

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
          <li key={item.value.value.link}>
            <Tooltip
              title={item.value.value.title}
              placement="bottom-start"
              classes={{ tooltip: classes.tooltip }}
            >
              {/* Only relative URLs should be opened on the same page. */}
              {/* Otherwise, they should be opened in new tab */}
              {/^\/(?!\/)/.test(item.value.value.link) ? (
                <Link
                  component={RouterLink}
                  to={item.value.value.link}
                  variant="inherit"
                  color="inherit"
                  underline="always"
                  noWrap
                  className={classes.listItem}
                >
                  {item.value.value.title}
                </Link>
              ) : (
                <A
                  href={item.value.value.link}
                  variant="inherit"
                  color="inherit"
                  underline="always"
                  noWrap
                  className={classes.listItem}
                >
                  {item.value.value.title}
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
