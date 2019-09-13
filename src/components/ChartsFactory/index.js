import React, { Component } from 'react';
import PropTypes from 'prop-types';
// AmCharts manager import
import PieChartManager from './Amcharts/PieChart/manager';
import HorizontalStackedAxesChartManager from './Amcharts/HorizontalStackedAxesChart/manager';
import CountUpManager from './CountUp/manager';
import PictorialStackedChartManager from './Amcharts/PictorialStackedChart/manager';
import AnimatedGaugeManager from './Amcharts/AnimatedGaugeCountUp/manager';
import SolidGaugeChartManager from './Amcharts/SolidGaugeChart/manager';
import XYChartManager from './Amcharts/XYChart/manager';
import ClusteredBarChartManager from './Amcharts/ClusteredBarChart/manager';
import LineGraphChartManager from './Amcharts/LineGraphChart/manager';
import ContainerChartManager from './Amcharts/ContainerChart/manager';
import StackedColumnChartManager from './Amcharts/StackedColumnChart/manager';
import HorziontalXYChartManager from './Amcharts/HorziontalXYChart/manager';
import SimpleListChartManager from './SimpleListChart/manager';
import ForceDirectedChartManager from './Amcharts/ForceDirectedChart/manager';
import RadialLineChartManager from './Amcharts/RadialLineChart/manager';


class ChartsFactory extends Component {
  render() {
    const { chartType } = this.props;
    switch (chartType) {
      case 1:
        return <PieChartManager {...this.props} />;
      case 2:
        return <HorizontalStackedAxesChartManager {...this.props} />;
      case 3:
        return <AnimatedGaugeManager {...this.props} />;
      case 4:
        return <CountUpManager {...this.props} />;
      case 5:
        return <PictorialStackedChartManager {...this.props} />;
      case 6:
        return <SolidGaugeChartManager {...this.props} />;
      case 7:
        return <XYChartManager {...this.props} />;
      case 8:
        return <ClusteredBarChartManager {...this.props} />;
      case 9:
        return <LineGraphChartManager {...this.props} />;
      case 10:
        return <ContainerChartManager {...this.props} />;
      case 11:
        return <StackedColumnChartManager {...this.props} />;
      case 12:
        return <HorziontalXYChartManager {...this.props} />;
      case 13:
        return <SimpleListChartManager {...this.props} />;
      case 14:
        return <ForceDirectedChartManager {...this.props} />;
      case 15:
        return <RadialLineChartManager {...this.props} />;
      default:
        return '';
    }
  }
}

ChartsFactory.defaultProps = {
  title: '',
  backgroundColor: 'white',
  color: 'black'
};

ChartsFactory.propTypes = {
  title: PropTypes.string,
  chartType: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
};

export default ChartsFactory;
