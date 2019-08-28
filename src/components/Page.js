import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import Footer from './Footer';
import Navigation from './Navigation';

function Page({ children, takwimu, title: propTitle }) {
  const title = propTitle ? `${propTitle} | Takwimu` : 'Takwimu';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Navigation takwimu={takwimu} />
      {children}
      <Footer takwimu={takwimu} />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  takwimu: PropTypes.shape({}).isRequired,
  title: PropTypes.string
};

Page.defaultProps = {
  title: undefined
};

export default Page;
