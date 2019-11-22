import React from 'react';

import classNames from 'classnames';

import { Link as MuiLink, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../Link';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '12.8125rem',
      paddingBottom: '0.5rem'
    }
  },
  text: {
    color: '#fff'
  },
  list: {
    listStyle: 'none',
    margin: '1.5rem 0 0 0',
    padding: 0
  },
  link: {
    fontSize: '0.9375rem'
  }
}));

const LINKS = [
  {
    href: '#topic',
    label: 'Explore data by topic',
    onClick: () => window.toggleDrawer('topic')()
  },
  {
    href: '#analysis',
    label: 'Expert insights and analysis',
    onClick: () => window.toggleDrawer('analysis')()
  },
  { href: '/about', label: 'About Takwimu' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact Us' }
];
const LEGAL = [
  { href: '/terms', label: 'Terms of use' },
  { href: '/privacy', label: 'Privacy Policy' }
];

function QuickLinks() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title>Quick Links</Title>
      <Typography
        variant="subtitle2"
        className={classNames([classes.text, classes.list])}
        component="ul"
      >
        {LINKS.map(link => (
          <li key={link.label}>
            {link.onClick ? (
              <MuiLink
                href={link.href}
                underline="always"
                className={classNames([classes.text, classes.link])}
                onClick={e => link.onClick(e)}
              >
                {link.label}
              </MuiLink>
            ) : (
              <Link
                href={link.href}
                underline="always"
                className={classNames([classes.text, classes.link])}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </Typography>
      <Typography
        variant="subtitle2"
        className={classNames([classes.text, classes.list])}
        component="ul"
      >
        {LEGAL.map(link => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={classNames([classes.text, classes.link])}
              underline="always"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </Typography>
    </div>
  );
}

QuickLinks.propTypes = {};

export default QuickLinks;
