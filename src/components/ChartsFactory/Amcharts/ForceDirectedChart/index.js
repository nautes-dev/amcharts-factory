/* eslint-disable camelcase */
/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

let am4core = null;
let am4plugins_forceDirected = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4plugins_forceDirected = require('@amcharts/amcharts4/plugins/forceDirected');
}


const ForceDirectedChartStyle = styled.div`
  width: 100%;
  min-height: 250px;
`;

class ForceDirectedChart extends Component {
  // create category axis for years
  componentDidMount() {
    const chart = am4core.create(`div${this.props.id}`, am4plugins_forceDirected.ForceDirectedTree);


    const networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

    chart.data = this.props.data;

    networkSeries.dataFields.value = 'value';
    networkSeries.dataFields.name = 'name';
    networkSeries.dataFields.children = 'children';
    networkSeries.nodes.template.tooltipText = '{name}:+{value}';
    networkSeries.nodes.template.fillOpacity = 1;
    networkSeries.dataFields.id = 'name';
    networkSeries.dataFields.linkWith = 'linkWith';


    networkSeries.nodes.template.label.text = '{name}';

    networkSeries.fontSize = 10;

    let selectedNode;

    const label = chart.createChild(am4core.Label);
    // label.text = 'Click on nodes to link';
    label.x = 50;
    label.y = 50;
    label.isMeasured = false;


    networkSeries.nodes.template.events.on('up', (event) => {
      const node = event.target;
      if (!selectedNode) {
        node.outerCircle.disabled = false;
        node.outerCircle.strokeDasharray = '3,3';
        selectedNode = node;
      } else if (selectedNode === node) {
        node.outerCircle.disabled = true;
        node.outerCircle.strokeDasharray = '';
        selectedNode = undefined;
      } else {
        const link = node.linksWith.getKey(selectedNode.uid);

        if (link) {
          node.unlinkWith(selectedNode);
        } else {
          node.linkWith(selectedNode, 0.2);
        }
      }
    });
  }

  render() {
    return (
      <ForceDirectedChartStyle
        id={`div${this.props.id}`}
        style={{ backgroundColor: this.props.backgroundColor }}
      />
    );
  }
}

ForceDirectedChart.defaultProps = {
  backgroundColor: 'white'
};

ForceDirectedChart.propTypes = {
  backgroundColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
};

export default ForceDirectedChart;
