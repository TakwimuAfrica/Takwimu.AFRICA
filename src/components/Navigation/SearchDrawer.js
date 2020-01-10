import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, Drawer, MenuList, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch';
import Link from '../Link';
// import rightArrow from '../../assets/images/right-arrow.svg';
// import rightArrowTransparent from '../../assets/images/right-arrow-transparent.svg';

import Layout from '../Layout';
import config from '../../config';

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [breakpoints.up('md')]: {
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
    backgroundColor: palette.primary.main,
    outline: 'none'
  },
  search: {
    height: '100vh',
    marginTop: '2.813rem',
    [breakpoints.up('md')]: {
      marginTop: '3.75rem'
    }
  },
  arrow: {
    marginLeft: '1rem',
    marginRight: '1.25rem',
    [breakpoints.up('md')]: {
      marginLeft: '4.406rem'
    }
  },
  searchField: {
    width: '100%',
    [breakpoints.up('md')]: {
      maxWidth: '46.875rem'
    },
    '& > input': {
      fontFamily: typography.fontText,
      fontSize: '1.375rem',
      fontWeight: '600',
      opacity: 1,
      padding: 0,
      color: 'white',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      [breakpoints.up('md')]: {
        fontSize: '3.563rem'
      }
    }
  },
  searchFieldBackground: {
    width: '100%',
    padding: '0.625rem !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '1.25rem',
    [breakpoints.up('md')]: {
      maxWidth: '46.875rem',
      padding: '1.25rem 0.938rem !important'
    },
    '& > div': {
      width: '100%'
    }
  },
  searchFieldBackgroundColor: {
    backgroundColor: '#d8d8d826'
  },
  // Override styling from other sources such as hurumap
  searchFieldInput: {
    backgroundColor: 'inherit !important',
    borderRadius: '0.563rem',
    border: 'none !important',
    fontFamily: '"Muli", sans-serif !important',
    fontSize: '3.563rem !important',
    height: '70px !important',
    fontWeight: '600',
    opacity: 1,
    padding: '0 !important',
    color: 'white !important',
    '&::placeholder': {
      color: 'white',
      opacity: '0.59'
    }
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
    scrollbarColor: `white ${palette.primary.main}`,
    [breakpoints.up('md')]: {
      marginRight: '6.25rem',
      paddingLeft: '0.625rem'
    },
    '& > a': {
      height: '2.813rem',
      textDecoration: 'none'
    },
    '& > a > p': {
      fontFamily: typography.fontText,
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
    fontSize: typography.caption.fontSize,
    backgroundColor: palette.primary.dark
  }
}));

function SearchDrawer({ children, active, toggle }) {
  const classes = useStyles();
  const router = useRouter();
  const [backgroundVisible, setBackgroundVisible] = useState(true);

  const handleInput = e => {
    if (e.target.value.length > 0) {
      const queryTerm = e.target.value;
      router.push({
        pathname: '/search',
        query: { q: queryTerm }
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
      <ReactiveBase app="takwimu" url={config.ES_URL}>
        <div className={classes.search}>
          <Grid container justify="center">
            <Layout>
              <Grid container direction="row" wrap="nowrap" justify="flex-end">
                <DataSearch
                  componentId="autoSuggest"
                  dataField={['post_title']}
                  highlight
                  showIcon
                  iconPosition="left"
                  autosuggest
                  queryFormat="and"
                  placeholder="What are you looking for ?"
                  onBlur={e => {
                    handleInput(e);
                  }}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleInput(e);
                    }
                  }}
                  onFocus={e => {
                    if (!backgroundVisible && e.target.value.length > 0) {
                      setBackgroundVisible(true);
                    } else if (
                      backgroundVisible &&
                      e.target.value.length === 0
                    ) {
                      setBackgroundVisible(false);
                    }
                  }}
                  className={classes.searchFieldBackground}
                  innerClass={{
                    input: classNames(classes.searchFieldInput, {
                      [classes.searchFieldBackgroundColor]: backgroundVisible
                    })
                  }}
                  render={({
                    data,
                    value,
                    downshiftProps: { isOpen, getItemProps }
                  }) => {
                    return isOpen && Boolean(value.length) ? (
                      <Grid container justify="flex-end">
                        <MenuList className={classes.searchResults}>
                          {data.slice(0, 5).map(suggestion => (
                            <Link
                              href={`/search?q=${suggestion.value}`}
                              key={`${suggestion.value}-${suggestion._click_id}`} // eslint-disable-line no-underscore-dangle
                              {...getItemProps({ item: suggestion })}
                            >
                              <Tooltip
                                title={suggestion.value}
                                placement="bottom-start"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <Typography color="textSecondary" noWrap>
                                  {suggestion.value}
                                </Typography>
                              </Tooltip>
                            </Link>
                          ))}
                        </MenuList>
                      </Grid>
                    ) : null;
                  }}
                />
              </Grid>
            </Layout>
          </Grid>
        </div>
      </ReactiveBase>
    </Drawer>
  );
}

SearchDrawer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  active: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

SearchDrawer.defaultProps = {
  active: false
};

export default SearchDrawer;
