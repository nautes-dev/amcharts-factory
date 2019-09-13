/* eslint-disable global-require */
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
class LineGraphChart extends Component {
  componentDidMount() {
    const chart = am4core.create(`div${this.props.id}`, am4charts.XYChart);
    const data = [];
    this.props.data.forEach((d) => {
      data.push({ date: new Date(d.label), value: d.value });
    });


    chart.data = data;

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    dateAxis.renderer.grid.template.stroke = am4core.color(this.props.color);

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    valueAxis.renderer.grid.template.stroke = am4core.color(this.props.color);


    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.tooltipText = '{value}';
    series.tooltip.pointerOrientation = 'vertical';

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

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

LineGraphChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000',
};

LineGraphChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
};

export default LineGraphChart;
