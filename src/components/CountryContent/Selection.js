import React from 'react';
import { PropTypes } from 'prop-types';

import { FormControl, Input, MenuItem, Select } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(({ breakpoints, theme }) => ({
  root: {
    width: '100%',
    marginTop: '0.9375rem',
    [breakpoints.up('md')]: {
      marginTop: 0,
      marginLeft: '0.703125rem',
      marginRight: '0.796875rem',
      width: '12.09375rem'
    },
    [breakpoints.up('lg')]: {
      marginTop: 0,
      marginLeft: '0.9375rem',
      marginRight: '1.0625rem',
      width: '16.125rem'
    }
  },
  keyboardArrow: {
    top: 'calc(50% - 12px)',
    right: '2.0625rem',
    position: 'absolute',
    pointerEvents: 'none',
    color: '#29a87c'
  },
  selectText: {
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily
  },
  selectMenu: {
    borderRadius: '0.25rem',
    border: '1px solid rgba(151, 151, 151, 0.3)',
    padding: '0.875rem 2.0625rem 0.875rem 0.9375rem',
    backgroundColor: theme.palette.background.default
  },
  menuPaper: {
    backgroundColor: theme.palette.background.default
  },
  menuItem: {
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,
    '&:selected': {
      backgroundColor: theme.palette.background.default
    }
  }
}));

function SelectionIcon({ open }) {
  const classes = useStyles();
  if (open) {
    return <KeyboardArrowUp className={classes.keyboardArrow} />;
  }
  return <KeyboardArrowDown className={classes.keyboardArrow} />;
}

SelectionIcon.propTypes = {
  open: PropTypes.bool.isRequired
};

const SelectionIconComponent = SelectionIcon;

class Selection extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    const classes = useStyles();
    const { onChange, items, value } = this.props;
    const { open } = this.state;

    return (
      <FormControl variant="outlined" className={classes.root}>
        <Select
          value={value}
          onChange={onChange}
          classes={{
            root: classes.selectText,
            selectMenu: classes.selectMenu
          }}
          IconComponent={() => <SelectionIconComponent open={open} />}
          onClick={this.handleClick}
          input={<Input disableUnderline />}
          MenuProps={{
            classes: { paper: classes.menuPaper },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          }}
        >
          {items.map(item => (
            <MenuItem
              className={classes.menuItem}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

Selection.propTypes = {
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  value: PropTypes.string
};

Selection.defaultProps = {
  onChange: null,
  value: null
};

export default Selection;
