import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { MenuItem, Select } from '@material-ui/core';
import languages from '../../languages';
import Link from '../Link';

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

  return (
    <div className={classes.root}>
      <Select
        value={selectedLang}
        renderValue={value => (
          <img
            src={languages[value.toUpperCase()]}
            className={classes.flagImage}
            alt="language option"
          />
        )}
        IconComponent={() => null}
        inputProps={{ disableUnderline: true }}
        onChange={e => setSelectedLang(e.target.value)}
      >
        {availableLanguages.map(lang => (
          <MenuItem key={lang} value={lang} className={classes.flagOption}>
            <Link href={`?lang=${lang}`}>
              <img
                src={languages[lang.toUpperCase()]}
                className={classes.flagImage}
                alt="language option"
              />
            </Link>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

LanguageSelector.defaultProps = {
  availableLanguages: ['en', 'fr']
};

LanguageSelector.propTypes = {
  defaultLanguage: PropTypes.string.isRequired,
  availableLanguages: PropTypes.arrayOf(PropTypes.string)
};

export default LanguageSelector;
