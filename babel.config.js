module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'transform-imports',
      {
        '@material-ui/core/styles': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: '@material-ui/styles/${member}',
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          preventFullImport: true
        },
        '@material-ui/core(?!/)': {
          transform: importName =>
            importName.toLowerCase().includes('style')
              ? `@material-ui/styles/${importName}`
              : `@material-ui/core/${importName}`,
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          preventFullImport: true
        },
        '@hurumap-ui/charts': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: importName =>
            importName.toLowerCase().includes('chart')
              ? `@hurumap-ui/charts/${importName}`
              : `@hurumap-ui/core/${importName}`,
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          preventFullImport: true
        },
        '@hurumap-ui/content': {
          // eslint-disable-next-line no-template-curly-in-string
          transform: '@hurumap-ui/content/${member}',
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          preventFullImport: true
        }
      }
    ]
  ]
};
