/* eslint-disable react/prop-types */
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

const PieChartStyle = styled.div`
  width: 100%;
  min-height: 250px;
`;

// Component which contains the dynamic state for the chart
class PieChart extends Component {
  componentDidMount() {
    // Create chart instance
    const chart = am4core.create(`div${this.props.id}`, am4charts.PieChart);

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'category';

    // Let's cut a hole in our Pie chart the size of 30% the radius
    chart.innerRadius = am4core.percent(30);

    // Put a thick white border around each Slice
    pieSeries.slices.template.stroke = am4core.color('#fff');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template
      // change the cursor on hover to make it apparent the object can be interacted with
      .cursorOverStyle = [
        {
          property: 'cursor',
          value: 'pointer'
        }
      ];

    pieSeries.alignLabels = true;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);
    pieSeries.labels.template.disabled = this.props.disabled;
    pieSeries.labels.template.fill = am4core.color(this.props.color);
    pieSeries.ticks.template.disabled = true;

    // Create a base filter effect (as if it's not there) for the hover to return to
    const shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter());
    shadow.opacity = 0;

    // Create hover state
    const hoverState = pieSeries.slices.template.states.getKey('hover');

    // Slightly shift the shadow and make it more prominent on hover
    const hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter());
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;

    // Add a legend
    if (this.props.legend) {
      chart.legend = new am4charts.Legend();
      chart.legend.position = 'right';
      chart.legend.valign = 'bottom';
    }

    chart.data = this.props.data;
    this.chart = chart;
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(prevProps.data)) {
      this.chart.data = this.props.data;
    }
  }

  render() {
    return (
      <PieChartStyle
        id={`div${this.props.id}`}
        style={{ backgroundColor: this.props.backgroundColor }}
      />
    );
  }
}

PieChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000',
  disabled: false,
};

PieChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),  
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PieChart;
