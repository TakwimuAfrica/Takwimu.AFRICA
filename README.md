# [Takwimu.AFRICA](https://takwimuafrica.github.io/Takwimu.AFRICA/)

**Actionable insights for African changemakers**

Takwimu offers data driven analysis on development policies, programmes & outcomes in 10 African countries

## Installation

Takwimu.AFRICA is a single page [React](https://reactjs.org/) web app deployable to GitHub pages with little help from [spa-github-pages](https://github.com/rafrex/spa-github-pages). See [package.json](./package.json) for the full list of dependencies and build & deploy scripts.

## Development

### Getting Started

Takwimu.AFRICA is built using [Next.js](https://nextjs.org/), a popular and lightweight framework for static and server‑rendered applications built with React.

To start developing, run the following commands:
```
yarn
yarn dev
```

### Chart Definitions

The charts in the app are defined in the json file `charts.json` in the `src/data/`. When you define the charts, they will be assigned a unique id when your run `yarn start` or `yarn deploy` or `yarn build`. This id will be used to identify this chart especially important when used in an embed. Don't change the id once the code is deployed otherwise any shared embeds with this Id will fail.

## Contributing

If you'd like to contribute to Takwimu.AFRICA, check out [CONTRIBUTING.md](./CONTRIBUTING.md) on how to get started.

---

### License

Takwimu.AFRICA is [GNU GPLv3 licensed](./LICENSE).
