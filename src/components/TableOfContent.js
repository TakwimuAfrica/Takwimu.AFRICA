import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { MenuList, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import Link from './Link';
import activeContentIcon from '../assets/images/active-page.svg';

const DEFAULT_TOP = 120; // Navigation height + padding
const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      width: '14.375rem',
      top: `${DEFAULT_TOP}px`,
      bottom: 0,
      overflow: 'hidden auto',

      scrollbarColor: '#d3d3d3',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        width: '0.4rem'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#d3d3d3'
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: 'transparent'
      }
    }
  },
  menuListRoot: {
    width: '14.188rem',
    paddingTop: '2rem'
  },
  activeContentIndicator: {
    marginLeft: '-1.5rem',
    marginRight: '1rem'
  },
  listItem: {
    // Use padding instead of lineHeight: 2.39 in case a list item is too
    // long to fit one line
    padding: '0.625rem 0',
    display: 'flex'
  },
  linkRoot: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: theme.palette.primary.main
  },
  activeLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
}));

function TableOfContent({ children, content, current, generateHref, width }) {
  const classes = useStyles();
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const calculateScrollDistance = () => {
      const footer = document.getElementById('footer');
      const { top } = (footer && footer.getBoundingClientRect()) || { top: 0 };
      if (top < window.innerHeight) {
        return window.innerHeight - top;
      }
      return 0;
    };

    function handleScroll() {
      setScrollDistance(calculateScrollDistance());
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const y = isWidthUp('md', width) ? DEFAULT_TOP : 0;
  const top = `${y - scrollDistance}px`;
  const bottom = `${scrollDistance}px`;

  return (
    <Grid
      container
      className={classes.root}
      style={{ top, bottom }}
      direction="column"
      wrap="nowrap"
    >
      <Grid item>{children}</Grid>
      <Grid item>
        <MenuList classes={{ root: classes.menuListRoot }}>
          {content.map((c, index) => (
            <li
              key={
                typeof generateHref(index) === 'object'
                  ? generateHref(index).as
                  : generateHref(index)
              }
              className={classes.listItem}
            >
              <img
                alt=""
                src={activeContentIcon}
                hidden={current !== index}
                className={classes.activeContentIndicator}
              />
              <Link
                href={
                  typeof generateHref(index) === 'object'
                    ? generateHref(index).href
                    : generateHref(index)
                }
                as={
                  typeof generateHref(index) === 'object'
                    ? generateHref(index).as
                    : undefined
                }
              >
                <Typography
                  variant="body2"
                  className={classNames(classes.linkRoot, {
                    [classes.activeLink]: current === index
                  })}
                >
                  {c.title}
                </Typography>
              </Link>
            </li>
          ))}
        </MenuList>
      </Grid>
    </Grid>
  );
}

TableOfContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  content: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  current: PropTypes.number.isRequired,
  generateHref: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

TableOfContent.defaultProps = {
  children: null
};

export default withWidth({
  initialWidth: 'md'
})(TableOfContent);
