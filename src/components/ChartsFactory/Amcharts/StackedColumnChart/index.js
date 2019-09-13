import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

let am4core = null;
let am4charts = null;
let am4themesAnimated = null;

if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4charts = require('@amcharts/amcharts4/charts');
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated');
  am4core.useTheme(am4themesAnimated.default);
}

// Add data
const exData = [{
  label: 'Ambiente',
  valueMedium: 2.5,
  valueNo: 2.5,
  valueYes: 2.1
}, {
  label: 'Sicurezza',
  valueMedium: 2.6,
  valueNo: 2.7,
  valueYes: 2.2
}, {
  label: 'Sburocratizzazione',
  valueMedium: 2.8,
  valueNo: 2.9,
  valueYes: 2.4
},
{
  label: 'Ambiente1',
  valueMedium: 2.5,
  valueNo: 2.5,
  valueYes: 2.1
}, {
  label: 'Sicurezza1',
  valueMedium: 2.6,
  valueNo: 2.7,
  valueYes: 2.2
}];

const createSeries = (field, name, chart) => {

  // Set up series
  const series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueX = field;
  series.dataFields.categoryY = 'label';
  series.stacked = true;
  series.name = name;

  const labelBullet = series.bullets.push(new am4charts.LabelBullet());
  labelBullet.locationX = 0.5;
  labelBullet.label.text = '{valueX}';
  labelBullet.label.fill = am4core.color('#fff');

  return series;
};


function StackedColumnChart({ data, id, backgroundColor, color }) {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const c = am4core.create(`div${id}`, am4charts.XYChart);

    c.data = data;
    //c.data = exData;

    const categoryAxis = c.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'label';
    categoryAxis.renderer.grid.template.opacity = 0;
    categoryAxis.renderer.labels.template.fill = am4core.color(color);
    categoryAxis.renderer.grid.template.stroke = am4core.color(color);

    const valueAxis = c.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.grid.template.opacity = 0;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
    valueAxis.renderer.ticks.template.stroke = am4core.color(color);
    valueAxis.renderer.labels.template.fill = am4core.color(color);
    valueAxis.renderer.grid.template.stroke = am4core.color(color);
    valueAxis.renderer.ticks.template.length = 5;
    valueAxis.renderer.line.strokeOpacity = 0.5;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;

    createSeries('valueMedium', 'Medium', c);
    createSeries('valueNo', 'No', c);
    createSeries('valueYes', 'Yes', c);

    setChart(c);
  }, []);

  useEffect(() => {
    if (chart) {
      chart.data = data;
    }
  }, [data]);

  return (
    <div
      id={`div${id}`}
      style={{ width: '100%', height: '100%', backgroundColor: backgroundColor }}
    />
  );
}

StackedColumnChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000',
};

StackedColumnChart.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default StackedColumnChart;
