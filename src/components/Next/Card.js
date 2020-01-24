/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 0,
    height: '14.875rem',

    // Ensure padding in case of long text
    paddingRight: '2.5rem',
    paddingLeft: '2.5rem',

    // Inheritable by `A` component
    textDecoration: 'none',
    '&:not(:first-child)': {
      marginTop: '2rem',
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
        marginLeft: '1.5rem' // .75 of lg
      },
      [theme.breakpoints.up('lg')]: {
        marginLeft: '2rem'
      }
    }
  },
  cardDual: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '21.09375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '28.125rem'
    }
  },
  cardTriple: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '18.375rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '24.5rem'
    }
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '5.25rem',
    marginBottom: '5.25rem'
  }
}));

function Card({ children, variant, ...props }) {
  const classes = useStyles(props);
  const variantClass =
    variant === 'triple' ? classes.cardTriple : classes.cardDual;

  return (
    <Button
      className={classNames(classes.root, variantClass)}
      color="primary"
      {...props}
    >
      <Typography
        variant="subtitle1"
        className={classes.title}
        underline="none"
      >
        {children}
      </Typography>
    </Button>
  );
}

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  component: PropTypes.elementType,
  href: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['dual', 'triple'])
};

Card.defaultProps = {
  children: '',
  component: 'button',
  href: null,
  onClick: null,
  variant: 'triple'
};

export default Card;
