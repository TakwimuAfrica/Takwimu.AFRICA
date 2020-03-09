import React from 'react';
import { PropTypes } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import A from '@hurumap-ui/core/A';

import Card from './Card';
import Section from '../Section';
import Link from '../Link';

const useStyles = makeStyles(theme => ({
  sectionRoot: {},
  root: {
    flexGrow: 1,
    paddingBottom: '6.25rem'
  },
  link: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 'auto'
    }
  }
}));

function WhereToNext({
  variant,
  whereToNext: { title, whereToNextLink },
  ...props
}) {
  const classes = useStyles(props);
  return (
    <Section title={title} variant="h3" classes={{ root: classes.sectionRoot }}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.root}
      >
        {whereToNextLink &&
          whereToNextLink.length > 0 &&
          whereToNextLink.map(where =>
            where.link.startsWith('/') ? (
              /* Note: Next.js uses filesystem-based routing & since we can't */
              /*       determine dynamically the filesystem route based on */
              /*       href, we'll use normal `a` which means server-based */
              /*       routing instead of client-side */
              <Card
                key={where.link}
                component={Link}
                href={where.link}
                variant={variant}
              >
                {where.title}
              </Card>
            ) : (
              <Card
                key={where.link}
                component={A}
                href={where.link}
                variant={variant}
              >
                {where.title}
              </Card>
            )
          )}
      </Grid>
    </Section>
  );
}

WhereToNext.propTypes = {
  variant: PropTypes.string,
  whereToNext: PropTypes.shape({
    title: PropTypes.string,
    whereToNextLink: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        link: PropTypes.string
      })
    )
  }).isRequired
};

WhereToNext.defaultProps = {
  variant: ''
};

export default WhereToNext;
