import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { gql } from 'apollo-boost';

import { CircularProgress } from '@material-ui/core';
import PictorialStackedChart from './index';


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



const PictorialStackedChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
`;

const ChartContainer = styled.div`
  width: 100%; 
  padding: 5px;
  height: 100%;
`;

const LoadingContainer = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  min-height: 250px;
`;

class PictorialStackedChartManager extends Component {
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
    res.map((x) => {
      returnData.push({
        category: x.range.name,
        value: x.count
      });
    });
    return returnData;
  }


  render() {
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
              <PictorialStackedChartContainer backgroundColor={this.props.backgroundColor}>
                <RowColTop>
                  <RowColTopLabel color={this.props.color} centerTitle={this.props.centerTitle}>
                    {this.props.label}
                  </RowColTopLabel>
                </RowColTop>
                <ChartContainer>
                  <PictorialStackedChart
                    id={this.props.id}
                    data={ret}
                    backgroundColor={this.props.backgroundColor}
                    color={this.props.color}
                  />
                </ChartContainer>
              </PictorialStackedChartContainer>
            );
          }
        }
        }
      </Query>

    );
  }
}

PictorialStackedChartManager.defaultProps = {
  backgroundColor: 'white',
  sharable: false,
  color: '#000000',
};

PictorialStackedChartManager.propTypes = {
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

export default PictorialStackedChartManager;
