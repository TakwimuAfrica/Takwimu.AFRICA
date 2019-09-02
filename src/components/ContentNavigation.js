import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from '@material-ui/core';
import { PropTypes } from 'prop-types';

import classNames from 'classnames';

import { makeStyles } from '@material-ui/styles';
import ContentSection from './ContentSection';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.info.main,
    padding: '1.125rem 1.625rem'
  },
  topicLinks: {
    '& > a:nth-child(n)': {
      lineHeight: 1.5,
      marginRight: '1.125rem'
    }
  },
  topicLink: {
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  topic: {
    textDecoration: 'underline'
  },
  topicSelected: {},
  label: {
    fontSize: '0.813rem',
    marginBottom: '1rem'
  },
  other: {
    color: '#848484'
  }
}));

function ContentNavigation({
  title,
  contentTitle,
  current,
  content,
  generateHref,
  generateTitle,
  onClick,
  linksPrimaryColor,
  linksSecondaryColor,
  ...props
}) {
  const classes = useStyles();
  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <ContentSection classes={{ root: classes.root }} {...props}>
      <Typography className={classes.label}>
        <span className={classes.other}>{title} </span>{' '}
        {contentTitle && <strong> {contentTitle}</strong>}
      </Typography>

      <div className={classes.topicLinks}>
        {content.map((c, index) => (
          <Link
            component={RouterLink}
            key={generateHref(index)}
            to={generateHref(index)}
            variant="body2"
            color={current === index ? linksSecondaryColor : linksPrimaryColor}
            classes={{ root: classes.topicLink }}
            className={classNames({
              [classes.topic]: current !== index
            })}
            onClick={e => onClick(e, index)}
          >
            {generateTitle(index)}
          </Link>
        ))}
      </div>
    </ContentSection>
  );
}

ContentNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  contentTitle: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  current: PropTypes.number.isRequired,
  generateHref: PropTypes.func.isRequired,
  generateTitle: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  linksPrimaryColor: PropTypes.string,
  linksSecondaryColor: PropTypes.string
};

ContentNavigation.defaultProps = {
  contentTitle: '',
  linksPrimaryColor: 'primary',
  linksSecondaryColor: 'textPrimary'
};

export default ContentNavigation;
