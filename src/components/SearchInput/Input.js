import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { InputBase, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useRouter } from 'next/router';
import searchIcon from '../../assets/images/search-black.svg';

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    marginTop: '1.3125rem'
  },
  searchInput: {
    width: '100%',
    backgroundColor: palette.background.light,
    borderStyle: 'None',
    paddingBottom: '1.152rem',
    paddingTop: '1.152rem',
    paddingLeft: '2.0625rem',
    paddingRight: '2.4375rem',
    color: palette.data.main
  },
  inputFont: {
    fontSize: typography.h3.fontSize,
    fontFamily: typography.fontText
  },
  searchInputButton: {
    padding: 0,
    fontSize: '2.3125rem',
    '&:hover': {
      background: 'none'
    }
  },
  searchIcon: {
    height: '2.4375rem',
    width: '2.3125rem'
  }
}));

function Input({ onRefresh, placeholder, query, language }) {
  const classes = useStyles();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchClick = () => {
    if (query !== searchTerm && searchTerm.length > 0) {
      // On the search page, onRefresh will be a function used to query the
      // API. On all other pages that this component is used, onRefresh is
      // expected to be null
      if (typeof onRefresh === 'function') {
        router.push(
          `/search?q=${searchTerm}&lang=${language}`,
          `/search?q=${searchTerm}&lang=${language}`,
          {
            shallow: true
          }
        );
        onRefresh(searchTerm);
      } else {
        router.push({
          pathname: '/search',
          query: { q: searchTerm }
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <InputBase
        id="searchInput"
        classes={{ root: classes.searchInput, input: classes.inputFont }}
        defaultValue={searchTerm || query}
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearchClick(e);
          }
        }}
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              classes={{ root: classes.searchInputButton }}
              onClick={e => {
                handleSearchClick(e);
              }}
            >
              <img
                src={searchIcon}
                alt="search"
                className={classes.searchIcon}
              />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
}

Input.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  query: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

Input.defaultProps = {
  placeholder: 'Enter search term'
};

export default Input;
