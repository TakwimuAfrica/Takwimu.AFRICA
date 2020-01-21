import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import { makeStyles, Link as MuiLink } from '@material-ui/core';

import NextComposed from './NextComposed';

const useStyles = makeStyles(theme => ({
  root: ({ navigation, active }) =>
    navigation && {
      color: theme.palette.text.secondary,
      // Override original Takwimu & Bootstrap styles
      '&:hover': {
        color: active
          ? theme.palette.text.primary
          : theme.palette.text.secondary,
        textDecoration: 'none'
      },
      ...(active && {
        margin: '-5px -20px',
        padding: '5px 20px',
        backgroundColor: 'white',
        borderRadius: '1.125rem',
        color: theme.palette.text.primary
      })
    }
}));

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const {
    active: activeProp,
    navigation,
    activeClassName = 'active',
    className: classNameProps,
    href,
    innerRef,
    naked,
    ...other
  } = props;
  const router = useRouter();
  const active = activeProp || router.pathname === href;
  const classes = useStyles({ navigation, active });

  const className = classNames(classes.root, classNameProps, {
    [activeClassName]: active && activeClassName
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        href={href}
        ref={innerRef}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      href={href}
      ref={innerRef}
      {...other}
    />
  );
}

Link.propTypes = {
  active: PropTypes.bool,
  navigation: PropTypes.bool,
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool
};

Link.defaultProps = {
  active: false,
  navigation: false,
  activeClassName: undefined,
  as: undefined,
  className: undefined,
  href: undefined,
  innerRef: undefined,
  naked: undefined,
  onClick: undefined,
  prefetch: undefined
};

export default React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
));
