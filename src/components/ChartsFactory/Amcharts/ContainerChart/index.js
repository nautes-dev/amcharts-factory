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
class ContainerChart extends Component {
  componentDidMount() {
    var mainContainer = am4core.create(`div${this.props.id}`,  am4core.Container);
    mainContainer.width = am4core.percent(100);
    mainContainer.height = am4core.percent(100);
    mainContainer.layout = "horizontal";
    
    var maleChart = mainContainer.createChild(am4charts.XYChart);
    maleChart.paddingRight = 0;
    maleChart.data = this.props.data;
    
    // Create axes
    var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
    maleCategoryAxis.dataFields.category = "age";
    maleCategoryAxis.renderer.grid.template.location = 0;
    //maleCategoryAxis.renderer.inversed = true;
    maleCategoryAxis.renderer.minGridDistance = 15;
    
    var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
    maleValueAxis.renderer.inversed = true;
    maleValueAxis.min = 0;
    maleValueAxis.max = 100;
    maleValueAxis.strictMinMax = true;
    
    maleValueAxis.numberFormatter = new am4core.NumberFormatter();
    maleValueAxis.numberFormatter.numberFormat = "#.#'%'";
    
    // Create series
    var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
    maleSeries.dataFields.valueX = "male";
    maleSeries.dataFields.valueXShow = "percent";
    maleSeries.calculatePercent = true;
    maleSeries.dataFields.categoryY = "age";
    maleSeries.interpolationDuration = 1000;
    maleSeries.columns.template.tooltipText = "Males, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    //maleSeries.sequencedInterpolation = true;
    
    
    var femaleChart = mainContainer.createChild(am4charts.XYChart);
    femaleChart.paddingLeft = 0;
    femaleChart.data =this.props.data;
    
    // Create axes
    var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
    femaleCategoryAxis.renderer.opposite = true;
    femaleCategoryAxis.dataFields.category = "age";
    femaleCategoryAxis.renderer.grid.template.location = 0;
    femaleCategoryAxis.renderer.minGridDistance = 15;
    
    var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
    femaleValueAxis.min = 0;
    femaleValueAxis.max = 100;
    femaleValueAxis.strictMinMax = true;
    femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
    femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
    femaleValueAxis.renderer.minLabelPosition = 0.01;
    
    // Create series
    var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
    femaleSeries.dataFields.valueX = "female";
    femaleSeries.dataFields.valueXShow = "percent";
    femaleSeries.calculatePercent = true;
    femaleSeries.fill = femaleChart.colors.getIndex(4);
    femaleSeries.stroke = femaleSeries.fill;
    //femaleSeries.sequencedInterpolation = true;
    femaleSeries.columns.template.tooltipText = "Females, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
    femaleSeries.dataFields.categoryY = "age";
    femaleSeries.interpolationDuration = 1000;

    this.chart = mainContainer;
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

ContainerChart.defaultProps = {
  backgroundColor: 'white'
};

ContainerChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object)
};

export default ContainerChart;
