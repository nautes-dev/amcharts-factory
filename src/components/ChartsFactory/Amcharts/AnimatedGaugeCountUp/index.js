/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
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

const ChartContainer = styled.div`
  background-color: ${props => props.backgroundColor};
  padding: 5px;

`;

const CountUpContainer = styled.div`

  text-align: center;
  font-weight: 600;
  font-size: 25px;
`;
const CountUpChart = styled.div`
  
`;

const CountUpLabel = styled.div`
  font-size: 12px;
  padding-bottom:10px;
  color: ${props => props.color};
`;

const GaugeStyle = styled.div`
  width: 100%;
  min-height: 250px;
`;

const CustomCountUp = styled(CountUp)`
  color: ${props => props.color};
`;


class AnimatedGaugeCountUpChart extends Component {
  // create category axis for years
  componentDidMount() {
    const chart = am4core.create(`div${this.props.id}`, am4charts.GaugeChart);
    chart.innerRadius = am4core.percent(82);

    /**
     * Normal axis
    */

    const axis = chart.xAxes.push(new am4charts.ValueAxis());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = true;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.length = 10;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = 40;
    axis.renderer.labels.template.adapter.add('text', text => `${text}%`);

    axis.renderer.labels.template.fill = am4core.color(this.props.color);

    /**
     * Axis for ranges
     */

    const colorSet = new am4core.ColorSet();

    const axis2 = chart.xAxes.push(new am4charts.ValueAxis());
    axis2.min = 0;
    axis2.max = 100;
    axis2.renderer.innerRadius = 10;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = true;

    const range0 = axis2.axisRanges.create();
    range0.value = 0;
    range0.endValue = 0;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);

    const range1 = axis2.axisRanges.create();
    range1.value = 0;
    range1.endValue = 100;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);

    /**
     * Label
     */

    const label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = 25;
    label.x = am4core.percent(0);
    label.y = am4core.percent(100);
    label.horizontalCenter = 'middle';
    label.verticalCenter = 'bottom';
    label.text = '0%';
    label.fill = am4core.color(this.props.color);


    /**
     * Hand
     */

    const hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(20);
    hand.startWidth = 10;
    hand.pin.disabled = true;
    hand.value = 0;

    hand.events.on('propertychanged', (ev) => {
      range0.endValue = ev.target.value;
      range1.value = ev.target.value;
      axis2.invalidate();
    });

    setInterval(() => {
      const value = this.props.data.percentageFeeCoverageYTD === null ? 10 : this.props.data.percentageFeeCoverageYTD;
      const valueRound = value.toFixed(2);
      label.text = `${valueRound}%`;
      const animation = new am4core.Animation(hand, {
        property: 'value',
        to: value
      }, 1000, am4core.ease.cubicOut).start();
    }, 2000);
  }

  render() {
    return (
      <ChartContainer backgroundColor={this.props.backgroundColor}>
        <GaugeStyle
          id={`div${this.props.id}`}
        />
        <CountUpContainer>
          <CountUpChart>
            <CustomCountUp
              delay={1}
              start={0}
              end={this.props.data.deltaPercentageFeeCoveragePercentage}
              prefix={this.props.data.deltaPercentageFeeCoveragePercentage > 0 ? '+ ' : ''}
              suffix={this.props.data.deltaPercentageFeeCoveragePercentageUm}
              color={this.props.color}
            />
          </CountUpChart>
          <CountUpLabel color={this.props.color}>
            {this.props.labelCountUp}
          </CountUpLabel>
        </CountUpContainer>
      </ChartContainer>
    );
  }
}

AnimatedGaugeCountUpChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000',
};

AnimatedGaugeCountUpChart.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number, PropTypes.string]
    )
  ),
  labelCountUp: PropTypes.string,
};

export default AnimatedGaugeCountUpChart;
