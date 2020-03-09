import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import { Link as MuiLink, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
function Link({
  button,
  active: activeProp,
  navigation,
  activeClassName = 'active',
  className: classNameProps,
  href,
  as: asHref,
  innerRef,
  naked,
  lang,
  ...other
}) {
  const router = useRouter();
  const active = activeProp || router.pathname === href;
  const classes = useStyles({ navigation, active });

  const className = classNames(classes.root, classNameProps, {
    [activeClassName]: active && activeClassName
  });

  const langPath = link => {
    if (!link) {
      return undefined;
    }

    const [h, hash] = link.split('#');
    const [path, search] = h.split('?');
    if (lang || router.query.lang) {
      const searchParams = new URLSearchParams(search);
      searchParams.set('lang', lang || router.query.lang);

      return `${path}?${searchParams.toString()}${hash ? `#${hash}` : ''}`;
    }
    return link;
  };

  if (naked) {
    return (
      <NextComposed
        className={className}
        href={langPath(href)}
        as={langPath(asHref)}
        ref={innerRef}
        {...other}
      />
    );
  }

  return button ? (
    <Button
      component={NextComposed}
      className={className}
      href={langPath(href)}
      as={langPath(asHref)}
      ref={innerRef}
      {...other}
    />
  ) : (
    <MuiLink
      component={NextComposed}
      className={className}
      href={langPath(href)}
      as={langPath(asHref)}
      ref={innerRef}
      {...other}
    />
  );
}

Link.propTypes = {
  button: PropTypes.bool,
  active: PropTypes.bool,
  navigation: PropTypes.bool,
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  lang: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool
};

Link.defaultProps = {
  button: false,
  active: false,
  navigation: false,
  activeClassName: undefined,
  as: undefined,
  className: undefined,
  href: undefined,
  innerRef: undefined,
  naked: undefined,
  onClick: undefined,
  prefetch: undefined,
  lang: undefined
};

export default React.forwardRef((props, ref) => (
  <Link {...props} innerRef={ref} />
));
