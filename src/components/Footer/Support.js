import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import A from '@codeforafrica/hurumap-ui/core/A';

import Title from './Title';

import gates from '../../assets/images/gates.png';
import gates2 from '../../assets/images/gates@2x.png';
import gates3 from '../../assets/images/gates@3x.png';

const useStyles = makeStyles({
  root: {
    width: '14.375rem'
  },
  img: {
    marginTop: '2.5625rem'
  }
});

function Support() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title>With support from</Title>
      <A href="//www.gatesfoundation.org">
        <img
          src={gates}
          srcSet={`${gates2} 2x, ${gates3} 3x`}
          alt="Bill & Melinda Gates"
          className={classes.img}
        />
      </A>
    </div>
  );
}

Support.propTypes = {};

export default Support;
