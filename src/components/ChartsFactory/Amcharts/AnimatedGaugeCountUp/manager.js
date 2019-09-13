import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { CircularProgress } from '@material-ui/core';
import AnimatedGaugeCountUpChart from './index';

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



const AnimatedGaugeCountUpChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
`;

const ChartContainer = styled.div`
  width: 100%;
  
`;


const LoadingContainer = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  min-height: 250px;
`;

class AnimatedGaugeCountUpChartManager extends Component {
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
            return (
              <AnimatedGaugeCountUpChartContainer backgroundColor={this.props.backgroundColor}>
                <RowColTop>
                  <RowColTopLabel color={this.props.color} centerTitle={this.props.centerTitle}>
                    {this.props.label}
                  </RowColTopLabel>
                </RowColTop>
                <ChartContainer>
                  <AnimatedGaugeCountUpChart
                    id={this.props.id}
                    data={data.queryAlias}
                    backgroundColor={this.props.backgroundColor}
                    labelCountUp={this.props.labelCountUp}
                    color={this.props.color}
                  />
                </ChartContainer>
              </AnimatedGaugeCountUpChartContainer>

            );
          }
          return 'Error :(';
        }
        }
      </Query>

    );
  }
}

AnimatedGaugeCountUpChartManager.defaultProps = {
  backgroundColor: 'white',
  color: '#000000',
  sharable: false
};

AnimatedGaugeCountUpChartManager.propTypes = {
  backgroundColor: PropTypes.string,
  filters: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string.isRequired,
  query: PropTypes.string,
  labelCountUp: PropTypes.string,
  chartType: PropTypes.number,
  label: PropTypes.string,
  sharedChartId: PropTypes.number,
  sharedChartTitle: PropTypes.string,
  homePositions: PropTypes.arrayOf(PropTypes.number),
  wallPositions: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
  centerTitle: PropTypes.bool,
  sharable: PropTypes.bool,
};

export default AnimatedGaugeCountUpChartManager;
