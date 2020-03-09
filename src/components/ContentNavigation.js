import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classNames from 'classnames';

import ContentSection from './ContentSection';
import Link from './Link';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.info.main,
    padding: '1.125rem 1.625rem'
  },
  links: {
    '& > a:nth-child(n)': {
      lineHeight: 1.5,
      marginRight: '1.125rem'
    }
  },
  link: {
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  topic: {
    textDecoration: 'underline'
  },
  selected: {},
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
  classes: propClasses,
  ...props
}) {
  const classes = useStyles({ classes: propClasses, ...props });
  return (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <ContentSection classes={{ root: classes.root }} {...props}>
      <Typography className={classes.label}>
        <span className={classes.other}>{title} </span>{' '}
        {contentTitle && <strong> {contentTitle}</strong>}
      </Typography>

      <div className={classes.links}>
        {content.map((item, index) => {
          const generatedHref = generateHref(item);
          const as =
            typeof generatedHref === 'object' ? generatedHref.as : undefined;
          const href =
            typeof generatedHref === 'object'
              ? generatedHref.as
              : generatedHref;

          return (
            <Link
              key={href}
              as={as}
              href={href}
              variant="body2"
              color={
                current === index ? linksSecondaryColor : linksPrimaryColor
              }
              classes={{ root: classes.link }}
              className={classNames({
                [classes.topic]: current !== index
              })}
              onClick={e => onClick && onClick(index, e)}
            >
              {generateTitle(item)}
            </Link>
          );
        })}
      </div>
    </ContentSection>
  );
}

ContentNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  contentTitle: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  current: PropTypes.number.isRequired,
  generateHref: PropTypes.func.isRequired,
  generateTitle: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  linksPrimaryColor: PropTypes.string,
  linksSecondaryColor: PropTypes.string
};

ContentNavigation.defaultProps = {
  contentTitle: '',
  linksPrimaryColor: 'primary',
  linksSecondaryColor: 'textPrimary',
  onClick: undefined
};

export default ContentNavigation;
