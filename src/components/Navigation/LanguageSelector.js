import React from 'react';
import PropTypes from 'prop-types';

import {
  MenuItem,
  ButtonBase,
  Menu,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import languages from '../../languages';
import Link from '../Link';

import config from '../../config';

const useStyles = makeStyles(() => ({
  root: {},
  flagImage: {
    width: '20.8px'
  },
  flagOptions: {
    '& ul': {
      padding: 0
    }
  },
  flagOption: {
    padding: '8px'
  }
}));

function LanguageSelector({ lang, options, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <PopupState key={lang} variant="popover" popupId="language-popup-menu">
        {popupState => (
          <>
            <ButtonBase
              variant="contained"
              color="primary"
              {...bindTrigger(popupState)}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <img
                    src={languages[lang.toUpperCase()]}
                    className={classes.flagImage}
                    alt="lang"
                  />
                </Grid>
                <Grid item>
                  <Typography color="textSecondary">
                    {lang.toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
            </ButtonBase>
            <Menu {...bindMenu(popupState)}>
              {options.map(({ code, name }) => (
                <MenuItem
                  key={code}
                  value={code}
                  component={Link}
                  disabled={code === lang}
                  className={classes.flagOption}
                  lang={code}
                  href={
                    typeof window !== 'undefined'
                      ? window.location.pathname +
                        window.location.search +
                        window.location.hash
                      : '/'
                  }
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <img
                        src={languages[code.toUpperCase()]}
                        className={classes.flagImage}
                        alt="lang option"
                      />
                    </Grid>
                    <Grid item>
                      <Typography color="textPrimary">{name}</Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </PopupState>
    </div>
  );
}

LanguageSelector.defaultProps = {
  lang: config.DEFAULT_LANG,
  options: [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' }
  ]
};

LanguageSelector.propTypes = {
  lang: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
};

export default LanguageSelector;
