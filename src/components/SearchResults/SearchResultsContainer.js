import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchResultItem from './SearchResultItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  searchResultsList: {
    paddingTop: '1.5rem',
    paddingBottom: '3rem',
    marginLeft: '2.0625rem',
    marginRight: '4.3125rem'
  },
  resultsFilter: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    marginLeft: '2.0625rem',
    display: 'flex'
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    display: 'flex',
    width: '70%'
  },
  showResult: {
    width: '30%'
  },
  filterItem: {
    display: 'inline-block',
    marginLeft: '1rem',
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    fontSize: theme.typography.body2.fontSize
  },
  filterActive: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  filterItemLabel: {
    display: 'inline-block'
  },
  paginationContainer: {
    padding: '3rem'
  },
  pagginationButton: {},
  borderDiv: {
    borderStyle: 'solid',
    borderBottom: '4px',
    borderColor: theme.palette.primary.main
  },
  pagesList: {
    marginTop: '1rem'
  }
}));

function RenderPaginator({
  items,
  activePage,
  handleNextClick,
  handlePreviousClick
}) {
  const classes = useStyles();

  return (
    <div className={classes.pagesList}>
      {activePage > 1 && items > 0 && (
        <ButtonBase
          className={classes.filterItem}
          onClick={handlePreviousClick}
        >
          Previous
        </ButtonBase>
      )}
      {items >= 10 && (
        <ButtonBase className={classes.filterItem} onClick={handleNextClick}>
          Next
        </ButtonBase>
      )}
    </div>
  );
}
RenderPaginator.propTypes = {
  items: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired
};
export const Paginator = RenderPaginator;

function SearchResultsContainer({
  results,
  filter: propFilter,
  query,
  onPaginate
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    activePage: 1,
    startIndex: 0,
    filter: propFilter
  });

  const handleNextClick = () => {
    onPaginate(query, state.activePage + 1);

    setState(prevState => ({
      activePage: prevState.activePage + 1,
      startIndex: prevState.startIndex + 10
    }));
  };

  const handlePreviousClick = () => {
    onPaginate(query, state.activePage - 1);

    setState(prevState => ({
      activePage: prevState.activePage - 1,
      startIndex: prevState.startIndex - 10
    }));
  };

  const handleFilterClick = category => {
    setState({
      activePage: 1,
      startIndex: 0,
      filter: category
    });
  };

  const { activePage, startIndex, filter } = state;

  let filteredResults = results;
  // filter results with result_type equals to state's filter
  if (filter === 'Analysis') {
    filteredResults = results.filter(
      resultItem =>
        resultItem.subtype === 'profile_section_page' ||
        resultItem.subtype === 'topic_page' ||
        resultItem.subtype === 'profile'
    );
  } else if (filter === 'Data') {
    filteredResults = results.filter(
      resultItem =>
        resultItem.subtype === 'attachment' ||
        resultItem.subtype === 'hurumap_chart'
    );
  }

  // compose show result string
  let resultIndexText = '';
  let endIndex = 10;
  const resultsLength = filteredResults.length;

  if (activePage > 0) {
    endIndex += 10 * (activePage - 1);

    if (resultsLength < 10) {
      endIndex += resultsLength;
    }
  }
  resultIndexText = `Results ${startIndex + 1} - ${endIndex} `;

  return (
    <div className={classes.root}>
      <Grid className={classes.resultsFilter}>
        <Typography variant="body2" className={classes.showResult}>
          {`Showing ${resultIndexText} results`}
        </Typography>
        <Grid item className={classes.filter}>
          <Typography
            variant="body2"
            color="inherit"
            className={classes.filterItemLabel}
          >
            Show:
          </Typography>
          {['All', 'Analysis', 'Data'].map(type => (
            <ButtonBase
              key={type}
              className={classNames([
                classes.filterItem,
                { [classes.filterActive]: filter === type }
              ])}
              onClick={() => handleFilterClick(type)}
            >
              {`${type} Results`}
            </ButtonBase>
          ))}
        </Grid>
      </Grid>
      <div className={classes.borderDiv} />
      {filteredResults.length > 0 ? (
        <div className={classes.searchResultsList}>
          {filteredResults.map(result => (
            <SearchResultItem
              resultType={result.subtype}
              title={result.title}
              url={result.url}
              id={result.id}
              key={`${result.subtype}-${result.id}`}
            />
          ))}
        </div>
      ) : (
        <div className={classes.searchResultsList}>
          <Typography variant="h3"> No Results Found</Typography>
        </div>
      )}
      <div className={classes.borderDiv} />

      <div className={classes.paginationContainer}>
        <Typography variant="body2">
          {`Showing ${resultIndexText} results`}
        </Typography>
        <Paginator
          items={filteredResults.length}
          activePage={activePage}
          handleNextClick={handleNextClick}
          handlePreviousClick={handlePreviousClick}
        />
      </div>
    </div>
  );
}

SearchResultsContainer.propTypes = {
  filter: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.shape({})),
  onPaginate: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
};

SearchResultsContainer.defaultProps = {
  filter: 'All',
  results: []
};

export default SearchResultsContainer;
