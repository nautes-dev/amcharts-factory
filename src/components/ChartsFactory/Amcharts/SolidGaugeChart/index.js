import React, { Component } from 'react';
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

// Component which contains the dynamic state for the chart
class SolidGaugeChart extends Component {
  componentDidMount() {
    // Create chart instance
    const chart = am4core.create(`div${this.props.id}`, am4charts.RadarChart);

    chart.data = this.props.data;

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    // categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add('fill', (fill, target) => (
      (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill));
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    categoryAxis.renderer.grid.template.stroke = am4core.color(this.props.color);

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    valueAxis.renderer.grid.template.stroke = am4core.color(this.props.color);

    // Create series
    const series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = 'full';
    series1.dataFields.categoryY = 'category';
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground');
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    const series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = 'value';
    series2.dataFields.categoryY = 'category';
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = '{category}: [bold]{value}[/]';
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add('fill', (fill, target) => chart.colors.getIndex(target.dataItem.index));

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();

    this.chart = chart;
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.chart.data = this.props.data;
    }
  }

  render() {
    return (
      <div
        id={`div${this.props.id}`}
        style={{ width: '100%', height: '100%', backgroundColor: this.props.backgroundColor }}
      />
    );
  }
}

SolidGaugeChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000'
};

SolidGaugeChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
};

export default SolidGaugeChart;
