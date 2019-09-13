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
class HorziontalXYChart extends Component {
  componentDidMount() {
    // Create chart instance
    const chart = am4core.create(`div${this.props.id}`, am4charts.XYChart);

    chart.data = this.props.data;

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());

    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';

    /* DO NOT DELETEME, THIS IS FOR VERTICAL LABELS */
    // categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 50;
    categoryAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    categoryAxis.renderer.grid.template.stroke = am4core.color(this.props.color);

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.renderer.labels.template.fill = am4core.color(this.props.color);
    valueAxis.renderer.grid.template.stroke = am4core.color(this.props.color);


    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueX = 'value';
    series.dataFields.categoryY = 'category';
    series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = 'vertical';

    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusBottomRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    const hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add('fill', (fill, target) => chart.colors.getIndex(target.dataItem.index));

    // Cursor
    chart.cursor = new am4charts.XYCursor();

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

HorziontalXYChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000'
};

HorziontalXYChart.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default HorziontalXYChart;
