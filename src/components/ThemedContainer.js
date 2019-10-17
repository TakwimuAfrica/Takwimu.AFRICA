import React from 'react';
import { PropTypes } from 'prop-types';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Theme from '../Theme';

function ThemedContainer({ children }) {
  if (!children) {
    return null;
  }

  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
}

ThemedContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ThemedContainer;
