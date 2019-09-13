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


const HorizontalStackedAxesStyle = styled.div`
  width: 100%;
  min-height: 250px;
`;

class HorizontalStackedAxesChart extends Component {
  // create category axis for years
  componentDidMount() {
    const interfaceColors = new am4core.InterfaceColorSet();
    const chart = am4core.create(`div${this.props.id}`, am4charts.XYChart);

    chart.data = this.props.data;
    // the following line makes value axes to be arranged vertically.
    chart.bottomAxesContainer.layout = 'horizontal';
    chart.bottomAxesContainer.reverseOrder = true;

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'month';
    categoryAxis.renderer.grid.template.stroke = interfaceColors.getFor('background');
    categoryAxis.renderer.grid.template.strokeOpacity = 1;
    categoryAxis.renderer.grid.template.location = 1;
    categoryAxis.renderer.minGridDistance = 20;

    const valueAxis1 = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis1.tooltip.disabled = true;
    valueAxis1.renderer.baseGrid.disabled = true;
    valueAxis1.marginRight = 30;
    valueAxis1.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
    valueAxis1.renderer.gridContainer.background.fillOpacity = 0.05;
    valueAxis1.renderer.grid.template.stroke = interfaceColors.getFor('background');
    valueAxis1.renderer.grid.template.strokeOpacity = 1;
    valueAxis1.title.text = 'Incassi €';

    const series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.categoryY = 'month';
    series1.dataFields.valueX = 'paymentsDone';
    series1.xAxis = valueAxis1;
    series1.name = 'paymentsDone';
    const bullet1 = series1.bullets.push(new am4charts.CircleBullet());
    bullet1.tooltipText = '{valueX.value}';

    const valueAxis2 = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.baseGrid.disabled = true;
    valueAxis2.marginRight = 30;
    valueAxis2.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
    valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;
    valueAxis2.renderer.grid.template.stroke = interfaceColors.getFor('background');
    valueAxis2.renderer.grid.template.strokeOpacity = 1;
    valueAxis2.title.text = 'Delta Quote €';

    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.categoryY = 'month';
    series2.dataFields.valueX = 'delta';
    series2.xAxis = valueAxis2;
    series2.name = 'Delta Quote';
    const bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet2.fillOpacity = 0;
    bullet2.strokeOpacity = 0;
    bullet2.tooltipText = '{valueX.value}';

    const valueAxis3 = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis3.tooltip.disabled = true;
    valueAxis3.renderer.baseGrid.disabled = true;
    valueAxis3.renderer.gridContainer.background.fill = interfaceColors.getFor('alternativeBackground');
    valueAxis3.renderer.gridContainer.background.fillOpacity = 0.05;
    valueAxis3.renderer.grid.template.stroke = interfaceColors.getFor('background');
    valueAxis3.renderer.grid.template.strokeOpacity = 1;
    valueAxis3.title.text = 'Quote Totali €';

    const series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.categoryY = 'month';
    series3.dataFields.valueX = 'feesValue';
    series3.xAxis = valueAxis3;
    series3.name = 'Quote Totali';
    const bullet3 = series3.bullets.push(new am4charts.CircleBullet());
    bullet3.tooltipText = '{valueX.value}';

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'zoomY';

    /* const scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY = scrollbarY; */
  }

  render() {
    return (
      <HorizontalStackedAxesStyle
        id={`div${this.props.id}`}
        style={{ backgroundColor: this.props.backgroundColor }}
      />
    );
  }
}

HorizontalStackedAxesChart.defaultProps = {
  backgroundColor: 'white'
};

HorizontalStackedAxesChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default HorizontalStackedAxesChart;
