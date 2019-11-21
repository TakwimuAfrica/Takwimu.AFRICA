import React from 'react';
import PropTypes from 'prop-types';

import NextLink from 'next/link';

const NextComposed = React.forwardRef((props, ref) => {
  const { as, href, prefetch, ...other } = props;

  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool
};

NextComposed.defaultProps = {
  as: undefined,
  href: undefined,
  prefetch: undefined
};

export default NextComposed;
