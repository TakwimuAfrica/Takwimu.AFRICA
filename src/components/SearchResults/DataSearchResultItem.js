import React from 'react';
import { PropTypes } from 'prop-types';

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
// import Link from '../Link';
// import config from '../../config';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1.5rem'
  },
  searchResult: {},
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline'
  },
  searchResultItem: {
    color: theme.palette.primary.main,
    fontWeight: 'bold'
  },
  resultType: {
    fontWeight: 'bold'
  }
}));

function DataSearchResultItem({ item }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="body1" className={classes.resultType}>
        {item}
      </Typography>
      {/* <Link href={link} as={link} className={classes.link}>
        <Typography variant="body1" className={classes.searchResultItem}>
          {country} - {title}
        </Typography>
      </Link> */}
    </div>
  );
}

DataSearchResultItem.propTypes = {
  //  visualType: PropTypes.string.isRequired,
  //  visualData: PropTypes.shape({}).isRequired,
  // id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired
};

export default DataSearchResultItem;
