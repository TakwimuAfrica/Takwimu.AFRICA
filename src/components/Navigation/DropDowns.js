import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import DropDownButton from './DropDownButton';

import topicIcon from '../../assets/images/a-chart-white.svg';
import topicIconActive from '../../assets/images/a-chart-active.svg';
import analysisIcon from '../../assets/images/file-paragraph.svg';
import analysisIconActive from '../../assets/images/file-paragraph-active.svg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      display: 'unset'
    }
  }
}));

export default function DropDowns({ active, page, toggle }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <DropDownButton
        isActive={active === 'analysis'}
        isHighlighted={page.name === 'analysis'}
        title="Country Analysis"
        icon={analysisIcon}
        iconActive={analysisIconActive}
        handleClick={toggle('analysis')}
      />
      <DropDownButton
        isActive={active === 'topic'}
        isHighlighted={page.name === 'topic'}
        title="Data by Topic"
        icon={topicIcon}
        iconActive={topicIconActive}
        handleClick={toggle('topic')}
      />
    </div>
  );
}

DropDowns.propTypes = {
  active: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  page: PropTypes.shape({
    name: PropTypes.string
  }).isRequired
};

DropDowns.defaultProps = {
  active: null
};
