import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { CircularProgress } from '@material-ui/core';
import ChartHeader from '../../ChartHeader';
import XYChart from './index';
import xYChartData from './example';

let am4core = null;
let am4charts = null;
let am4themesAnimated = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
  am4charts = require('@amcharts/amcharts4/charts');
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated');
  am4core.useTheme(am4themesAnimated.default);
}


const RowColTop = styled.div`
  width: calc(100% - 20px);
  display:flex;
  justify-content: space-between;
  margin: 10px;
`;

const RowColTopLabel = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.color};
  margin: 0 ${props => (props.centerTitle ? 'auto' : '')};
`;

const RowColTopDx = styled.div`
  display:flex;
  justify-content: flex-end;
  align-items: center;
`;

const XYChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;  
  padding: 5px;
`;

const LoadingContainer = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  min-height: 250px;
`;

class XYChartManager extends Component {
  variables = {
    sharedfilters: {
      chartType: this.props.chartType,
      query: this.props.query,
      filter: this.props.filters
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters) {
      this.variables = {
        sharedfilters: {
          ...this.variables.sharedfilters,
          filter: this.props.filters
        }
      };
    }
  }

  renderQuery() {
    return (
      <Query
        query={gql`${this.props.query}`}
        variables={this.props.filters}
        skip={!this.props.query}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <LoadingContainer>
                <CircularProgress />
              </LoadingContainer>
            );
          }
          if (error) return 'Error :(';
          if (data) {
            let ret = data.queryAlias;
            if (data.queryAlias.data) {
              ret = data.queryAlias.data;
            }
            return (
              <XYChartContainer backgroundColor={this.props.backgroundColor}>
                <RowColTop>
                  <RowColTopLabel color={this.props.color} centerTitle={this.props.centerTitle}>
                    {this.props.label}
                  </RowColTopLabel>
                  {this.props.sharable && (
                    <RowColTopDx>
                      <ChartHeader
                        sharedChartId={this.props.sharedChartId}
                        sharedChartTitle={this.props.sharedChartTitle}
                        homePositions={this.props.homePositions}
                        wallPositions={this.props.wallPositions}
                        query={this.props.query}
                        chartType={this.props.chartType}
                      />
                    </RowColTopDx>)}
                </RowColTop>
                <ChartContainer>
                  <XYChart
                    id={this.props.id}
                    backgroundColor={this.props.backgroundColor}
                    data={ret}
                    color={this.props.color}                    
                    horizontal={this.props.horizontal}
                  />
                </ChartContainer>
              </XYChartContainer>
            );
          }
        }}
      </Query>
    );
  }

  renderExample() {
    return (
      <XYChartContainer backgroundColor={this.props.backgroundColor}>
        <RowColTop>
          <RowColTopLabel>
            {this.props.label}
          </RowColTopLabel>
        </RowColTop>
        <ChartContainer>
          <XYChart
            id={this.props.id}
            backgroundColor={this.props.backgroundColor}
            data={xYChartData}
          />
        </ChartContainer>
      </XYChartContainer>
    );
  }

  render() {
    if (!this.props.query) {
      return this.renderExample();
    }
    return this.renderQuery();
  }
}

XYChartManager.defaultProps = {
  backgroundColor: 'white',
  sharable: false,
  color: '#000000',
  horizontal: false
};

XYChartManager.propTypes = {
  backgroundColor: PropTypes.string,
  filters: PropTypes.object,
  id: PropTypes.string.isRequired,
  query: PropTypes.string,
  chartType: PropTypes.number,
  label: PropTypes.string,
  sharedChartId: PropTypes.number,
  sharedChartTitle: PropTypes.string,
  homePositions: PropTypes.arrayOf(PropTypes.number),
  wallPositions: PropTypes.arrayOf(PropTypes.number),
  sharable: PropTypes.bool,
  color: PropTypes.string,
  centerTitle: PropTypes.bool,
  horizontal: PropTypes.bool,
};

export default XYChartManager;
