/* eslint-disable camelcase */
/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

let am4core = null;
let am4charts = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4charts = require('@amcharts/amcharts4/charts');
}


const RadialLineChartStyle = styled.div`
  width: 100%;
  min-height: 250px;
`;

class RadialLineChart extends Component {
  // create category axis for years
  componentDidMount() {
    const chart = am4core.create(`div${this.props.id}`, am4charts.RadarChart);

    chart.data = this.props.data;
    /* Create axes */
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    categoryAxis.renderer.grid.template.stroke = am4core.color(this.props.color);

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.extraMin = 0.2;
    valueAxis.extraMax = 0.2;
    valueAxis.tooltip.disabled = false;
    valueAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    valueAxis.renderer.grid.template.stroke = am4core.color(this.props.color);

    /* Create and configure series */
    const series1 = chart.series.push(new am4charts.RadarSeries());
    series1.dataFields.valueY = 'value1';
    series1.dataFields.categoryX = 'name';
    series1.strokeWidth = 3;
    series1.tooltipText = '{valueY}';
    // series1.name = 'Series 2';
    series1.bullets.create(am4charts.CircleBullet);

    /* const series2 = chart.series.push(new am4charts.RadarSeries());
    series2.dataFields.valueY = 'value2';
    series2.dataFields.dateX = 'name';
    series2.strokeWidth = 3;
    series2.tooltipText = '{valueY}';
    // series2.name = 'Series 2';
    series2.bullets.create(am4charts.CircleBullet); */

    chart.cursor = new am4charts.RadarCursor();

    // chart.legend = new am4charts.Legend();
  }

  render() {
    return (
      <RadialLineChartStyle
        id={`div${this.props.id}`}
        style={{ backgroundColor: this.props.backgroundColor }}
      />
    );
  }
}

RadialLineChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000',
};

RadialLineChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  color: PropTypes.string,
};

export default RadialLineChart;
