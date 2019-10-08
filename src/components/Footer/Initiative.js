import React from 'react';

import { makeStyles } from '@material-ui/styles';

import A from '@codeforafrica/hurumap-ui/dist/A';
import Title from './Title';

import ap from '../../assets/images/ap.png';
import ap2 from '../../assets/images/ap@2x.png';
import ap3 from '../../assets/images/ap@3x.png';
import cfa from '../../assets/images/cfa.png';
import cfa2 from '../../assets/images/cfa@2x.png';
import cfa3 from '../../assets/images/cfa@3x.png';
import ihub from '../../assets/images/ihub.png';
import ihub2 from '../../assets/images/ihub@2x.png';
import ihub3 from '../../assets/images/ihub@3x.png';

const useStyles = makeStyles(theme => ({
  root: {
    width: '19.375rem'
  },
  img: {
    marginTop: '2.5625rem'
  },
  imgCfa: {
    marginLeft: '1rem',
    marginRight: '1rem',
    [theme.breakpoints.up('md')]: {
      marginLeft: '2.15625rem',
      marginRight: '2.25rem'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '2.875rem',
      marginRight: '3rem'
    }
  }
}));

function Initiative() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Title>An initiative by</Title>
      <div className={classes.img}>
        {/* AP does not support HTPPS */}
        <A href="http://www.africapractice.com/">
          <img src={ap} srcSet={`${ap2} 2x, ${ap3} 3x`} alt="africapractice" />
        </A>
        <A href="//codeforafrica.org/">
          <img
            src={cfa}
            srcSet={`${cfa2} 2x, ${cfa3} 3x`}
            alt="Code for Africa"
            className={classes.imgCfa}
          />
        </A>
        <A href="//ihub.co.ke/">
          <img src={ihub} srcSet={`${ihub2} 2x, ${ihub3} 3x`} alt="iHub" />
        </A>
      </div>
    </div>
  );
}

Initiative.propTypes = {};

export default Initiative;
