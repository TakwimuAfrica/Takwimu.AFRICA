const fs = require('fs');
const shortid = require('shortid');
const sectionedCharts = require('../src/data/chart.json');

sectionedCharts.forEach(section => {
  if (!section.id) {
    // eslint-disable-next-line no-param-reassign
    section.id = `section${shortid.generate()}`;
  }
  section.charts.forEach(chart => {
    if (!chart.id) {
      // eslint-disable-next-line no-param-reassign
      chart.id = `chart${shortid.generate()}`;
    }
    chart.visuals.forEach(visual => {
      if (!visual.id) {
        // eslint-disable-next-line no-param-reassign
        visual.id = `visual${shortid.generate()}`;
      }
    });
  });
});

fs.writeFileSync(
  `${__dirname}/../src/data/chart.json`,
  JSON.stringify(sectionedCharts, null, 2)
);

// eslint-disable-next-line no-console
console.log('Done.');
