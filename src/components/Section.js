/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Layout from './Layout';
import RichTypography from './RichTypography';

const styles = theme => ({
  root: {
    margin: '0 auto'
  },
  title: {
    margin: '1.375rem 0',
    [theme.breakpoints.up('md')]: {
      width: '51.125rem'
    }
  }
});

function Section({ classes, children, title, variant, ...props }) {
  return (
    <Layout classes={{ root: classes.root }} {...props}>
      {title && (
        <RichTypography variant={variant} className={classes.title}>
          {title}
        </RichTypography>
      )}
      {children}
    </Layout>
  );
}

Section.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string,
  variant: PropTypes.string
};

Section.defaultProps = {
  title: null,
  variant: 'h2'
};

export default withStyles(styles)(Section);
