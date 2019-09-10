# [Takwimu.AFRICA](https://takwimuafrica.github.io/Takwimu.AFRICA/)

**Actionable insights for African changemakers**

Takwimu offers data driven analysis on development policies, programmes & outcomes in 10 African countries

## Installation

Takwimu.AFRICA is a single page [React](https://reactjs.org/) web app deployable to GitHub pages with little help from [spa-github-pages](https://github.com/rafrex/spa-github-pages). See [package.json](./package.json) for the full list of dependencies and build & deploy scripts.

## Development

### Chart Definitions

The charts in the app are defined in the json file `charts.json` in the `src/data/`. When you define the charts, they will be assigned a unique id when your run `yarn start` or `yarn deploy` or `yarn build`. This id will be used to identify this chart especially important when used in an embed. Don't chnage the id once the code is deployed otherwise any shared embeds with this Id will fail.

## Contributing

### License

Takwimu.AFRICA is [GNU GPLv3 licensed](./LICENSE).