import React from 'react';
import PropTypes from 'prop-types';

import { MenuItem, ButtonBase, Menu, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import languages from '../../languages';
import Link from '../Link';

import config from '../../config';

const useStyles = makeStyles(() => ({
  root: {}
}));

function LanguageSelector({ lang: propLang, options, ...props }) {
  const classes = useStyles(props);
  const lang = typeof propLang === 'string' ? propLang : config.DEFAULT_LANG;
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
              <TranslateIcon fontSize="small" />
              <Box mr={1} />
              <Typography color="textSecondary">
                {lang.toUpperCase()}
              </Typography>
              <ExpandMoreIcon fontSize="small" />
            </ButtonBase>
            <Menu {...bindMenu(popupState)}>
              {options.map(({ code, name }) => (
                <MenuItem
                  key={code}
                  value={code}
                  component={Link}
                  disabled={code === lang}
                  lang={code}
                  px={2}
                  href={
                    typeof window !== 'undefined'
                      ? window.location.pathname +
                        window.location.search +
                        window.location.hash
                      : '/'
                  }
                >
                  <Typography color="textPrimary">{name}</Typography>
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
    { code: 'fr', name: 'Français' }
  ]
};

LanguageSelector.propTypes = {
  lang: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
};

export default LanguageSelector;
