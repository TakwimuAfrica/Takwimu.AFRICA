{
  "presets": ["next/babel"],
  "plugins": [
    [
      "transform-imports",
      {
        "@material-ui/core": {
          "transform": importName => importName.includes("style") ? `@material-ui/styled/${importName}` : `@material-ui/core/${importName}`,
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          "preventFullImport": true
        },
        "@material-ui/core/styles": {
          "transform": "@material-ui/styles/${member}",
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          "preventFullImport": true
        },
        "@hurumap-ui/charts": {
          "transform": "@hurumap-ui/charts/${member}",
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          "preventFullImport": true
        },
        "@hurumap-ui/content": {
          "transform": "@hurumap-ui/content/${member}",
          // Whether or not to throw when an import is encountered which would cause the entire module to be imported.
          "preventFullImport": true
        }
      }
    ]
  ]
}