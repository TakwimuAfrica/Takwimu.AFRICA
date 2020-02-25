import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { Menu, MenuItem, ButtonBase } from '@material-ui/core';
import languages from '../../languages';

const useStyles = makeStyles(() => ({
  root: {
    marginRight: '-6rem'
  },
  selectedFlag: {},
  flagImage: {
    width: '1.3rem',
    height: '1.3rem'
  },
  flagOptions: {
    '& ul': {
      padding: 0
    }
  },
  flagOption: {
    padding: '0.5rem'
  }
}));

function LanguageSelector({ defaultLanguage, availableLanguages, ...props }) {
  const classes = useStyles(props);
  const [selectedLang, setSelectedLang] = useState(defaultLanguage);
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <ButtonBase onClick={() => setOpen(prevState => !prevState)}>
        <img
          src={languages[selectedLang.toUpperCase()]}
          className={classes.flagImage}
          alt="selected languge"
        />
      </ButtonBase>
      <Menu open={open} className={classes.flagOptions}>
        {availableLanguages
          .filter(lang => lang !== selectedLang)
          .map(lang => (
            <MenuItem
              key={lang}
              className={classes.flagOption}
              onClick={() => setSelectedLang(lang)}
            >
              <img
                src={languages[lang.toUpperCase()]}
                className={classes.flagImage}
                alt="language option"
              />
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

LanguageSelector.defaultProps = {
  defaultLanguage: 'en',
  availableLanguages: ['en', 'fr']
};

LanguageSelector.propTypes = {
  defaultLanguage: PropTypes.string,
  availableLanguages: PropTypes.arrayOf(PropTypes.string)
};

export default LanguageSelector;
