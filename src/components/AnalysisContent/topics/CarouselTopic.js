/* eslint-disable react/no-danger, jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { RichTypography } from '../../core';

import leftArrow from '../../../assets/images/left-arrow.svg';
import rightArrow from '../../../assets/images/right-arrow.svg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  carouselWrapper: {
    width: '100%'
  },
  carousel: {
    zIndex: 1,
    width: '100%',
    borderRadius: '0.25rem',
    backgroundColor: '#f6f6f6',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      width: '44.265625rem' // .75 of lg
    },
    [theme.breakpoints.up('lg')]: {
      width: '58.4375rem'
    }
  },
  arrow: {
    width: '6%', // 53px / 934px,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
    '&:before': {
      // shadow
      content: '""',
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: 1,
      backgroundColor: '#f6f6f6'
    },
    '&:after': {
      // shadow
      content: '""',
      position: 'absolute',
      top: '5%',
      height: '90%',
      width: '50%',
      zIndex: 0,
      boxShadow: '0 2px 6px 4px rgba(0, 0, 0, 0.2)'
    },
    '&:first-child': {
      '&:before': {
        backgroundImage: `url(${leftArrow})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      '&:after': {
        left: '50%'
      }
    },
    '&:last-child': {
      '&:before': {
        backgroundImage: `url(${rightArrow})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      },
      '&:after': {
        right: '50%'
      }
    }
  },
  content: {
    overflowX: 'auto',
    width: '88%',
    height: '100%',
    display: 'flex',

    scrollbarColor: '#d3d3d3',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: '0.4rem'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#d3d3d3'
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'transparent'
    }
  },
  profile: {
    cursor: 'pointer',
    margin: '2.5rem 1.875rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  profilePicture: {
    width: '7.125rem',
    height: '7.125rem',
    borderRadius: '50%'
  },
  profilePictureSelected: {
    border: `solid 6px ${theme.palette.primary.main}`
  },
  profileTitle: {
    fontFamily: theme.typography.fontText,
    fontSize: '0.875rem',
    fontWeight: '600',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    width: '152px'
  },
  profileName: {
    marginTop: '1.375rem',
    fontFamily: theme.typography.fontText,
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: '0.875rem',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    width: '152px'
  },
  profileNameSelected: {
    color: 'black',
    textDecoration: 'none'
  },
  title: {
    fontFamily: theme.typography.fontText,
    fontSize: '1.625rem',
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    marginBottom: '1.125rem'
  },
  body: {
    padding: '3.125rem'
  }
}));

function Topic({ data, onIndexChanged }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const profile = document.getElementById(`profile-${selectedIndex}`);
    profile.scrollIntoView({ inline: 'nearest', block: 'nearest' });

    onIndexChanged(selectedIndex);
  }, [onIndexChanged, selectedIndex]);

  const { carousel_name: name, carousel_title: title } = data[selectedIndex];
  return (
    <div id="political-figures" className={classes.root}>
      <div className={classes.carouselWrapper}>
        <div className={classes.carousel}>
          <div
            role="button"
            tabIndex={0}
            className={classes.arrow}
            onClick={() =>
              selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)
            }
            onKeyUp={() => null}
          />
          <div className={classes.divider} />

          <div id="carousel-content" className={classes.content}>
            {data.map((item, index) => (
              <div
                role="button"
                tabIndex={0}
                id={`profile-${index}`}
                className={classes.profile}
                onClick={() => setSelectedIndex(index)}
                onKeyUp={() => null}
              >
                <img
                  alt=""
                  src={item.carousel_image.url}
                  className={classNames(classes.profilePicture, {
                    [classes.profilePictureSelected]: selectedIndex === index
                  })}
                />
                {name && name.length > 0 && (
                  <Typography
                    className={classNames(classes.profileName, {
                      [classes.profileNameSelected]: selectedIndex === index
                    })}
                  >
                    {item.carousel_name}
                  </Typography>
                )}
                <Typography className={classes.profileTitle}>
                  {item.carousel_title}
                </Typography>
              </div>
            ))}
          </div>

          <div
            id="carousel-topic-next"
            role="button"
            tabIndex={0}
            className={classes.arrow}
            onClick={() =>
              selectedIndex < data.length - 1 &&
              setSelectedIndex(selectedIndex + 1)
            }
            onKeyUp={() => null}
          />
        </div>
      </div>
      <div className={classes.body}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>

        <RichTypography component="div">
          {data[selectedIndex].carousel_description}
        </RichTypography>
      </div>
    </div>
  );
}

Topic.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      carousel_description: PropTypes.string,
      carousel_name: PropTypes.string,
      carousel_title: PropTypes.string,
      carousel_image: PropTypes.shape({
        url: PropTypes.string
      })
    })
  ).isRequired,
  onIndexChanged: PropTypes.func.isRequired
};

export default Topic;
