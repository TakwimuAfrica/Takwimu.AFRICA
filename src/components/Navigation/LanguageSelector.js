import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { Input, MenuItem, Select } from '@material-ui/core';
import languages from '../../languages';
import Link from '../Link';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      marginRight: '-6rem'
    }
  },
  select: {
    paddingRight: 0
  },
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
        classes={{ select: classes.select }}
        IconComponent={() => null}
        input={<Input disableUnderline />}
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
