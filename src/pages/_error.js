import React from 'react';

import NextLink from 'next/link';

import { Link, Typography } from '@material-ui/core';

import config from '../config';
import Error from '../components/Error';
import CustomErrorPage from '../components/ErrorPage';

function ErrorPage() {
  return (
    <CustomErrorPage takwimu={config} title="Internal Server Error">
      <Error title="500 - Internal Server Error">
        <Typography variant="body1">
          We’re having some trouble processing your request. We’ve logged the
          error and will investigate. You can try again or if the issue
          persists, please{' '}
          <NextLink href="/contact">
            <Link href="/contact" underline="always">
              contact us
            </Link>
          </NextLink>
        </Typography>
      </Error>
    </CustomErrorPage>
  );
}

export default ErrorPage;
