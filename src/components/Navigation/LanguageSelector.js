import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { MenuItem, ButtonBase, Menu } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useRouter } from 'next/router';
import languages from '../../languages';
import Link from '../Link';

const useStyles = makeStyles(() => ({
  root: {},
  flagImage: {
    width: '20.8px',
    height: '20.8px'
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
  const { query } = useRouter();

  const hrefTrimmedLang =
    typeof window !== 'undefined'
      ? `${window.location.href.replace(
          `${window.location.origin}${query.lang ? `/${query.lang}` : ''}`,
          ''
        )}`
      : '/';

  return (
    <div className={classes.root}>
      <PopupState variant="popover" popupId="language-popup-menu">
        {popupState => (
          <>
            <ButtonBase
              variant="contained"
              color="primary"
              {...bindTrigger(popupState)}
            >
              <img
                src={languages[lang.toUpperCase()]}
                className={classes.flagImage}
                alt="lang"
              />
            </ButtonBase>
            <Menu {...bindMenu(popupState)}>
              {options.map(option => (
                <MenuItem
                  key={option}
                  value={option}
                  disabled={option === lang}
                  className={classes.flagOption}
                >
                  <Link base={option} href={hrefTrimmedLang}>
                    <img
                      src={languages[option.toUpperCase()]}
                      className={classes.flagImage}
                      alt="lang option"
                    />
                  </Link>
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
  options: ['en', 'fr']
};

LanguageSelector.propTypes = {
  lang: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string)
};

export default LanguageSelector;
