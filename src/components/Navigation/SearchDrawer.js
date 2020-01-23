import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Drawer,
  Input,
  MenuList,
  MenuItem,
  Tooltip,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import Router from 'next/router';
import rightArrowOpaque from '../../assets/images/right-arrow-opaque.svg';
import rightArrowTransparent from '../../assets/images/right-arrow-transparent.svg';

import Layout from '../Layout';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('md')]: {
      display: 'unset'
    }
  },
  modal: {
    top: '0'
  },
  backdrop: {
    marginTop: '0',
    backgroundColor: 'transparent'
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
    outline: 'none'
  },
  search: {
    height: '100vh',
    marginTop: '2.813rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '3.75rem'
    }
  },
  arrow: {
    marginLeft: '1rem',
    marginRight: '1.25rem',
    [theme.breakpoints.up('md')]: {
      marginLeft: '4.406rem'
    }
  },
  searchField: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '46.875rem'
    },
    '& > input': {
      fontFamily: theme.typography.fontText,
      fontSize: '1.375rem',
      fontWeight: '600',
      opacity: 1,
      padding: 0,
      color: 'white',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      [theme.breakpoints.up('md')]: {
        fontSize: '3.563rem'
      }
    }
  },
  searchFieldPlaceholder: {
    opacity: 0.59
  },
  searchFieldBackground: {
    width: '100%',
    padding: '0.625rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.563rem',
    marginLeft: '1.25rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: '46.875rem',
      padding: '1.25rem 0.938rem'
    }
  },
  searchFieldBackgroundColor: {
    backgroundColor: '#d8d8d826'
  },
  // Override styling from other sources such as hurumap
  searchFieldInput: {
    backgroundColor: 'inherit !important'
  },
  searchResults: {
    width: '100%',
    maxWidth: '780px',
    marginTop: '1.25rem',
    marginRight: '3.75rem',
    paddingLeft: '0.938rem',
    maxHeight: '25rem',
    overflowY: 'auto',

    // Firefox only
    scrollbarColor: `white ${theme.palette.primary.main}`,
    [theme.breakpoints.up('md')]: {
      marginRight: '6.25rem',
      paddingLeft: '0.625rem'
    },
    '& > a': {
      height: '2.813rem'
    },
    '& > a > p': {
      fontFamily: theme.typography.fontText,
      fontSize: '2.938rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.7,
      letterSpacing: 'normal'
    },
    '&::-webkit-scrollbar': {
      width: '0.563rem'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
      borderRadius: '0.281rem'
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent'
    }
  },
  tooltip: {
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: theme.palette.primary.dark
  }
});

class SearchDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundVisible: false,
      searchResults: []
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchInput(e) {
    const {
      takwimu: { url }
    } = this.props;
    const { backgroundVisible } = this.state;
    if (!backgroundVisible && e.target.value.length > 0) {
      this.setState({ backgroundVisible: true });
    } else if (backgroundVisible && e.target.value.length === 0) {
      this.setState({ backgroundVisible: false });
    }

    if (e.target.value.length > 0) {
      fetch(`${url}/api/autocomplete/?q=${e.target.value}&format=json`).then(
        response => {
          if (response.status === 200) {
            response.json().then(json => {
              const { suggestions: searchResults } = json;
              this.setState({ searchResults });
            });
          }
        }
      );
    } else {
      this.setState({ searchResults: [] });
    }
  }

  render() {
    const { classes, children, active, toggle } = this.props;
    const { backgroundVisible, searchResults } = this.state;
    const handleInput = e => {
      if (e.target.value.length > 0) {
        const query = e.target.value;
        Router.push({
          pathname: '/search',
          search: `?q=${query}`
        });
      }
    };

    return (
      <Drawer
        anchor="top"
        ModalProps={{
          className: classes.modal
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
        <div className={classes.search}>
          <Grid container justify="center">
            <Layout>
              <Grid container direction="row" wrap="nowrap" justify="flex-end">
                <div
                  className={classNames(classes.searchFieldBackground, {
                    [classes.searchFieldBackgroundColor]: backgroundVisible
                  })}
                >
                  <Input
                    disableUnderline
                    className={classes.searchField}
                    classes={{ input: classes.searchFieldInput }}
                    placeholder="What are you looking for ?"
                    onChange={this.handleSearchInput}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        handleInput(e);
                      }
                    }}
                  />
                </div>
                <img
                  alt=""
                  src={
                    backgroundVisible ? rightArrowOpaque : rightArrowTransparent
                  }
                  className={classes.arrow}
                />
              </Grid>
              {searchResults && searchResults.length > 0 && (
                <Grid container justify="flex-end">
                  <MenuList className={classes.searchResults}>
                    {searchResults.map(result => (
                      <MenuItem
                        key={result.title}
                        component="a"
                        href={`/search?q=${result.title}`}
                      >
                        <Tooltip
                          title={result.title}
                          placement="bottom-start"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Typography color="textSecondary" noWrap>
                            {result.title}
                          </Typography>
                        </Tooltip>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Grid>
              )}
            </Layout>
          </Grid>
        </div>
      </Drawer>
    );
  }
}

SearchDrawer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  active: PropTypes.bool,
  takwimu: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

SearchDrawer.defaultProps = {
  active: false
};

export default withStyles(styles)(SearchDrawer);
