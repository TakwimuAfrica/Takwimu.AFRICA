import React from 'react';
import PropTypes from 'prop-types';

// import Footer from './Footer';
import Navigation from './Navigation';
import SEO from './SEO';

function Page({ children, takwimu, ...props }) {
  return (
    <>
      <SEO {...props} />
      <Navigation takwimu={takwimu} />
      {children}
      {/* <Footer takwimu={takwimu} /> */}
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
