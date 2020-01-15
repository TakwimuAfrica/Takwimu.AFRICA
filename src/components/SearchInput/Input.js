import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { InputBase, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import { useRouter } from 'next/router';

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  searchInput: {
    width: '100%',
    backgroundColor: palette.background.light,
    borderStyle: 'None',
    paddingBottom: '1.5rem',
    paddingTop: '1.5rem',
    paddingLeft: '2.0625rem',
    paddingRight: '2.4375rem',
    color: palette.data.main,
    fontSize: typography.h3.fontSize
  },
  searchInputButton: {
    padding: 0,
    fontSize: '2.3125rem'
  },
  iconStyle: {
    color: palette.text.primary
  }
}));

function Input({ onRefresh, placeholder, query }) {
  const classes = useStyles();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchClick = () => {
    if (query !== searchTerm && searchTerm.length > 0) {
      router.push({
        pathname: '/search',
        query: { q: searchTerm }
      });
      onRefresh(searchTerm);
    }
  };

  return (
    <div className={classes.root}>
      <InputBase
        id="searchInput"
        classes={{ root: classes.searchInput }}
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
              <SearchIcon
                fontSize="inherit"
                color="primary"
                classes={{ colorPrimary: classes.iconStyle }}
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
  query: PropTypes.string.isRequired
};

Input.defaultProps = {
  placeholder: 'Enter search term'
};

export default Input;
