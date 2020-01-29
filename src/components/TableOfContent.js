/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid, MenuList } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import Link from './Link';
import activeContentIcon from '../assets/images/active-page.svg';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      /**
       * Since we want to negative margin for the current item image **and**
       * overflow hidden, we'll set the negative margin on root and use padding
       * to shift item's contents to the right
       */
      marginLeft: '-1.5rem',
      position: 'fixed',
      width: 'fit-content',
      top: ({ top }) => `${top}px`,
      bottom: 0,
      overflow: 'hidden auto',

      scrollbarColor: '#d3d3d3 transparent',
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
  children: {
    paddingLeft: '1.5rem'
  },
  menuListRoot: {
    padding: 0,
    width: '14.188rem'
  },
  activeContentIndicator: {
    marginRight: '1rem'
  },
  listItem: {
    // Use padding instead of lineHeight: 2.39 in case a list item is too
    // long to fit one line
    padding: '0.625rem 0',
    display: 'flex'
  },
  linkRoot: {
    paddingLeft: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: theme.palette.primary.main
  },
  activeLink: {
    paddingLeft: 0,
    color: theme.palette.text.primary,
    textDecoration: 'none'
  }
}));

function TableOfContent({
  top: topProp, // Navigation height + padding
  children,
  content,
  current,
  generateHref,
  width,
  ...props
}) {
  const classes = useStyles({ ...props, top: topProp });
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
  const y = isWidthUp('md', width) ? topProp : 0;
  const top = `${y - scrollDistance}px`;

  return (
    <Grid
      container
      className={classes.root}
      style={{ top }}
      direction="column"
      wrap="nowrap"
    >
      <Grid item className={classes.children}>
        {children}
      </Grid>
      <Grid item>
        <MenuList classes={{ root: classes.menuListRoot }}>
          {content.map((c, index) => (
            <li
              key={
                typeof generateHref(c, index) === 'object'
                  ? generateHref(c, index).as
                  : generateHref(c, index)
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
                  typeof generateHref(c, index) === 'object'
                    ? generateHref(c, index).href
                    : generateHref(c, index)
                }
                as={
                  typeof generateHref(c, index) === 'object'
                    ? generateHref(c, index).as
                    : undefined
                }
                variant="body2"
                className={classNames(classes.linkRoot, {
                  [classes.activeLink]: current === index
                })}
              >
                {c.title}
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
  top: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  current: PropTypes.number.isRequired,
  generateHref: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired
};

TableOfContent.defaultProps = {
  children: null,
  top: 175 // navbar height + layout margin + some padding
};

export default withWidth({
  initialWidth: 'md'
})(TableOfContent);
