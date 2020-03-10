import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ContentLoader from '@hurumap-ui/core/ContentLoader';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1.5rem',
    width: '100%'
  },
  title: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
    padding: '0.75rem 0 0.75rem 1.875rem',
    textTransform: 'capitalize'
  }
}));

function ProfileSectionTitle({ loading, tab: { name }, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid item className={classes.root}>
      {loading ? (
        <ContentLoader primaryOpacity={1} secondaryOpacity={0.5} height={48}>
          <rect x="0" y="0" height={48} width="100%" />
        </ContentLoader>
      ) : (
        <Typography variant="body1" className={classes.title}>
          {name}
        </Typography>
      )}
    </Grid>
  );
}

ProfileSectionTitle.propTypes = {
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  loading: PropTypes.bool
};

ProfileSectionTitle.defaultProps = {
  loading: false
};

export default ProfileSectionTitle;
