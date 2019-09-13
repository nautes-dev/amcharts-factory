import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

let am4core = null;
let am4charts = null;
let am4themesAnimated = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4charts = require('@amcharts/amcharts4/charts');
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated');
  am4core.useTheme(am4themesAnimated.default);
}


const ClusteredBarChartStyle = styled.div`
  width: 100%;
  min-height: 250px;
`;

class ClusteredBarChart extends Component {
  // create category axis for years
  componentDidMount() {
    const chart = am4core.create(`div${this.props.id}`, am4charts.XYChart);

    chart.data = this.props.data;
    // the following line makes value axes to be arranged vertically.
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.numberFormatter.numberFormat = '#';
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    // Create series
    function createSeries(field, name) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = 'category';
      series.name = name;
      series.columns.template.tooltipText = '{name}: [bold]{valueX}[/]';
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;

      const valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = '{valueX}';
      valueLabel.label.horizontalCenter = 'left';
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      const categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = '{name}';
      categoryLabel.label.horizontalCenter = 'right';
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color('#fff');
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }

    createSeries('value1', 'Value1');
    createSeries('value2', 'Value2');
  }

  render() {
    return (
      <ClusteredBarChartStyle
        id={`div${this.props.id}`}
        style={{ backgroundColor: this.props.backgroundColor }}
      />
    );
  }
}

ClusteredBarChart.defaultProps = {
  backgroundColor: 'white'
};

ClusteredBarChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ClusteredBarChart;
