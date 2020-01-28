import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Grid, Drawer, MenuList, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import { useRouter } from 'next/router';
import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch';
import Link from '../Link';
import rightArrowOpaque from '../../assets/images/right-arrow-opaque.svg';
import rightArrowTransparent from '../../assets/images/right-arrow-transparent.svg';

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
    width: '10px',
    marginRight: '1rem',
    [breakpoints.up('md')]: {
      marginLeft: '4.406rem',
      marginRight: '-1.25rem',
      width: 'auto'
    }
  },
  searchFieldBackground: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '1.25rem',
    '& > div': {
      width: '100%'
    },
    '& > div > div > div': {
      top: '5px'
    },
    [breakpoints.up('md')]: {
      maxWidth: '50.95rem',
      '& > div > div > div': {
        top: '47px'
      }
    }
  },
  searchFieldBackgroundColor: {
    backgroundColor: '#d8d8d826 !important'
  },
  searchFieldInput: {
    maxWidth: '90%',
    backgroundColor: 'inherit !important',
    borderRadius: '0.563rem',
    border: 'none !important',
    fontFamily: '"Muli", sans-serif !important',
    fontSize: '1.125rem !important',
    fontWeight: '600',
    opacity: 1,
    color: 'white !important',
    '&::placeholder': {
      color: 'white',
      opacity: '0.59'
    },
    '&:focus': {
      backgroundColor: '#d8d8d826 !important'
    },
    [breakpoints.up('md')]: {
      maxWidth: '46.875rem',
      padding: '1.25rem 0.938rem !important',
      height: '128px !important',
      fontSize: '3.563rem !important'
    }
  },
  searchResults: {
    width: '100%',
    marginTop: '1.25rem',
    marginRight: '3.75rem',
    paddingLeft: '0.938rem',
    maxHeight: '12rem',
    overflowY: 'auto',
    '& > a': {
      height: '1.85rem',
      textDecoration: 'none'
    },
    '& > a > p': {
      fontFamily: typography.fontText,
      fontSize: '1.125rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 1.7,
      letterSpacing: 'normal'
    },
    // Firefox only
    scrollbarColor: `white ${palette.primary.main}`,
    '&::-webkit-scrollbar': {
      width: '0.254rem'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
      borderRadius: '0.281rem'
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent'
    },
    [breakpoints.up('md')]: {
      marginRight: '4.25rem',
      paddingLeft: '0.625rem',
      maxWidth: '742px',
      maxHeight: '25rem',
      '& > a': {
        height: '2.813rem'
      },
      '& > a > p': {
        fontSize: '2.938rem'
      },
      '&::-webkit-scrollbar': {
        width: '0.563rem'
      }
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
  const [backgroundVisible, setBackgroundVisible] = useState(false);

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
                  autosuggest
                  queryFormat="and"
                  placeholder="What are you looking for ?"
                  showIcon
                  iconPosition="right"
                  icon={
                    backgroundVisible ? (
                      <img
                        alt=""
                        src={rightArrowOpaque}
                        className={classes.arrow}
                      />
                    ) : (
                      <img
                        alt=""
                        src={rightArrowTransparent}
                        className={classes.arrow}
                      />
                    )
                  }
                  onBlur={e => {
                    handleInput(e);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleInput(e);
                    }
                  }}
                  onValueChange={value => {
                    if (!backgroundVisible && value) {
                      setBackgroundVisible(true);
                    } else if (backgroundVisible && !value) {
                      setBackgroundVisible(false);
                    }
                  }}
                  className={classes.searchFieldBackground}
                  innerClass={{
                    input: classNames(classes.searchFieldInput, {
                      [classes.searchFieldBackgroundColor]: backgroundVisible
                    }),
                    icon: classes.arrowIcon
                  }}
                  render={({
                    data,
                    value,
                    downshiftProps: { isOpen, getItemProps }
                  }) => {
                    return isOpen && Boolean(value.length) ? (
                      <Grid container justify="flex-end">
                        <MenuList className={classes.searchResults}>
                          {data.slice(0, 10).map(suggestion => (
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
