/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { CircularProgress } from '@material-ui/core';

import ForceDirectedChart from './index';
import forceDirectedChartData from './example';


const RowColTop = styled.div`
  width: calc(100% - 20px);
  display:flex;
  justify-content: space-between;
  align-items:center;
  margin: 10px;
`;

const RowColTopLabel = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.color};
  margin: 0 ${props => (props.centerTitle ? 'auto' : '')};
`;



const ForceDirectedChartContainer = styled.div`
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

class ForceDirectedChartManager extends Component {
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


  getChartData(result) {
    const returnData = [];
    const res = result.queryAlias;
    // eslint-disable-next-line array-callback-return
    const parsed = res.map((x) => {
      if (x.value > 1300) {
        return {
          label: x.label,
          value: 1300
        };
      }
      return {
        label: x.label,
        value: x.value,
      };
    });
    parsed.map((x) => {
      returnData.push({
        name: x.label,
        value: x.value
      });
    });
    return returnData;
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
            const ret = this.getChartData(data);
            return (
              <ForceDirectedChartContainer backgroundColor={this.props.backgroundColor}>
                <RowColTop>
                  <RowColTopLabel color={this.props.color} centerTitle={this.props.centerTitle}>
                    {this.props.label}
                  </RowColTopLabel>
                </RowColTop>
                <ChartContainer>
                  <ForceDirectedChart
                    id={this.props.id}
                    backgroundColor={this.props.backgroundColor}
                    data={ret}
                  />
                </ChartContainer>
              </ForceDirectedChartContainer>
            );
          }
        }}
      </Query>
    );
  }

  renderExample() {
    return (
      <ForceDirectedChartContainer backgroundColor={this.props.backgroundColor}>
        <RowColTop>
          <RowColTopLabel color={this.props.color} centerTitle={this.props.centerTitle}>
            {this.props.label}
          </RowColTopLabel>
        </RowColTop>
        <ChartContainer>
          <ForceDirectedChart
            id={this.props.id}
            backgroundColor={this.props.backgroundColor}
            data={forceDirectedChartData}
            color={this.props.color}
          />
        </ChartContainer>
      </ForceDirectedChartContainer>
    );
  }

  render() {
    if (!this.props.query) {
      return this.renderExample();
    }

    return this.renderQuery();
  }
}

ForceDirectedChartManager.defaultProps = {
  backgroundColor: 'white',
  sharable: false,
  color: '#000000',
};

ForceDirectedChartManager.propTypes = {
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
};

export default ForceDirectedChartManager;
