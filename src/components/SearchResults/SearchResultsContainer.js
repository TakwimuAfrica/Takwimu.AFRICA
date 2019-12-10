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
  handlePreviousClick,
  handlePageClick,
  endIndex
}) {
  const numPages = Math.floor(items / 10);
  const pages = Array.from({ length: numPages }, (v, k) => k + 1);
  const classes = useStyles();

  return (
    <div className={classes.pagesList}>
      {activePage > 0 && items > 0 && (
        <ButtonBase
          className={classes.filterItem}
          onClick={handlePreviousClick}
        >
          Previous
        </ButtonBase>
      )}
      {pages.map(page => (
        <ButtonBase
          className={classNames([
            classes.filterItem,
            { [classes.filterActive]: page === activePage + 1 }
          ])}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </ButtonBase>
      ))}
      {endIndex < items && items > 0 && (
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
  handlePreviousClick: PropTypes.func.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  endIndex: PropTypes.number.isRequired
};
export const Paginator = RenderPaginator;

function SearchResultsContainer({
  results: { hits, total: resultsLength },
  filter: propFilter
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    activePage: 0,
    startIndex: 0,
    filter: propFilter
  });

  const handleNextClick = () => {
    setState(prevState => ({
      activePage: prevState.activePage + 1,
      startIndex: prevState.startIndex + 10
    }));
  };

  const handlePreviousClick = () => {
    setState(prevState => ({
      activePage: prevState.activePage - 1,
      startIndex: prevState.startIndex - 10
    }));
  };

  const handlePageClick = pageNum => {
    const startIndex = (pageNum - 1) * 10;
    setState({
      activePage: pageNum - 1,
      startIndex
    });
  };

  const handleFilterClick = category => {
    setState({
      activePage: 0,
      startIndex: 0,
      filter: category
    });
  };

  const { activePage, startIndex, filter } = state;

  let filteredResults = hits;

  // filter results with result_type equals to state's filter
  if (filter === 'Analysis') {
    filteredResults = hits.filter(
      // eslint-disable-next-line no-underscore-dangle
      ({ _source: resultItem }) =>
        resultItem.post_type === 'profile_section_page' ||
        resultItem.post_type === 'topic_page' ||
        resultItem.post_type === 'profile'
    );
  } else if (filter === 'Data') {
    filteredResults = hits.filter(
      // eslint-disable-next-line no-underscore-dangle
      ({ _source: resultItem }) =>
        resultItem.post_type === 'attachment' ||
        resultItem.post_type === 'hurumap_chart'
    );
  }

  // compose show result string
  let resultIndexText = '';
  let endIndex = 10;

  if (resultsLength > 10) {
    endIndex += 10 * activePage;

    if (resultsLength - startIndex < 10) {
      endIndex = startIndex + (resultsLength - startIndex);
    }
    resultIndexText = `Results ${startIndex + 1} - ${endIndex} of `;
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.resultsFilter}>
        <Typography variant="body2" className={classes.showResult}>
          {`Showing ${resultIndexText}${filteredResults.length} results`}
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
          {filteredResults.slice(startIndex, endIndex).map((
            { _source: result } // eslint-disable-line no-underscore-dangle
          ) => (
            <SearchResultItem
              resultType={result.post_type}
              link={
                result.post_type === 'attachment'
                  ? result.guid
                  : result.permalink
              }
              title={result.post_title}
              id={result.post_id}
              key={`${result.post_type}-${result.post_id}`}
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
          {`Showing ${resultIndexText}${filteredResults.length} results`}
        </Typography>
        {filteredResults.length > 10 && (
          <Paginator
            items={filteredResults.length}
            activePage={activePage}
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
            handlePageClick={handlePageClick}
            endIndex={endIndex}
          />
        )}
      </div>
    </div>
  );
}

SearchResultsContainer.propTypes = {
  filter: PropTypes.string,
  results: PropTypes.shape({
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        _source: PropTypes.shape({})
      })
    ),
    total: PropTypes.number
  })
};

SearchResultsContainer.defaultProps = {
  filter: 'All',
  results: []
};

export default SearchResultsContainer;
