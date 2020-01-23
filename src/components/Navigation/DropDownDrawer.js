import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import analysisDescriptionBG from '../../assets/images/file-paragraph-bg.svg';
import dataByTopicDescriptionBG from '../../assets/images/a-chart-bg.svg';

import DropDownContent from './DropDownContent';

const useStyles = makeStyles(theme => ({
  modalTopic: {
    marginTop: '18.313rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '0'
    }
  },
  modalAnalysis: {
    marginTop: '13.313rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '0'
    }
  },
  backdrop: {
    [theme.breakpoints.up('md')]: {
      marginTop: '0'
    },
    backgroundColor: 'transparent'
  },
  drawer: {
    outline: 'none',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up('md')]: {
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.07)'
    }
  },
  container: active => ({
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${
      active === 'analysis' ? analysisDescriptionBG : dataByTopicDescriptionBG
    })`
  })
}));

export default function DropDownDrawer({
  children,
  countries,
  active,
  navigation: { country_analysis: countryAnalysis, data_by_topic: dataByTopic },
  toggle
}) {
  const classes = useStyles({ active });
  return (
    <Drawer
      anchor="top"
      ModalProps={{
        className: classNames({
          [classes.modalTopic]: active === 'topic',
          [classes.modalAnalysis]: active === 'analysis'
        })
      }}
      BackdropProps={{
        className: classes.backdrop
      }}
      PaperProps={{
        className: classes.drawer
      }}
      open={active}
      elevation={0}
      transitionDuration={0}
      onEscapeKeyDown={toggle}
      onBackdropClick={toggle}
    >
      {children}
      <DropDownContent
        classes={{
          container: classes.container
        }}
        type={active}
        countries={countries}
        profile={({ iso_code: isoCode, slug }) =>
          active === 'analysis' ? slug : `country-${isoCode}`
        }
        title={active === 'analysis' ? 'Country Analysis' : 'Data by Topic'}
        description={active === 'analysis' ? countryAnalysis : dataByTopic}
      />
    </Drawer>
  );
}

DropDownDrawer.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  active: PropTypes.oneOf(['analysis', 'topic']),
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  navigation: PropTypes.shape({
    country_analysis: PropTypes.string,
    data_by_topic: PropTypes.string
  }).isRequired
};

DropDownDrawer.defaultProps = {
  active: null
};
