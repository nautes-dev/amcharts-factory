import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { CircularProgress } from '@material-ui/core';
import CountUpChart from './index';


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



const CountUpManagerContainer = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
  margin: 5px;
`;

const ChartContainer = styled.div`
  width: 100%;
  /*height: 90%*/
`;

const LoadingContainer = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  min-height: 250px;
`;

class CountUpManager extends Component {
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
        {({ loading: loadingData, error: errorData, data: dataGraph }) => {
          if (loadingData) return (
            <LoadingContainer>
              <CircularProgress />
            </LoadingContainer>
          );
          if (errorData) return 'error';
          if (dataGraph && dataGraph.queryAlias) {
            return (
              <CountUpManagerContainer style={{ backgroundColor: this.props.backgroundColor }}>
                <RowColTop>
                  <RowColTopLabel color={this.props.color} centerTitle={this.props.centerTitle}>
                    {this.props.label}
                  </RowColTopLabel>
                </RowColTop>
                <ChartContainer>
                  <CountUpChart
                    label={this.props.label}
                    data={dataGraph.queryAlias}
                    backgroundColor={this.props.backgroundColor}
                    color={this.props.color}
                  />
                </ChartContainer>
              </CountUpManagerContainer>
            );
          }
        }
        }
      </Query>
    );
  }
}


CountUpManager.defaultProps = {
  backgroundColor: 'white',
  sharable: false,
  color: '#000000'
};

CountUpManager.propTypes = {
  backgroundColor: PropTypes.string,
  filters: PropTypes.objectOf(PropTypes.object),
  query: PropTypes.string,
  label: PropTypes.string,
  chartType: PropTypes.number,
  sharedChartId: PropTypes.number,
  sharedChartTitle: PropTypes.string,
  homePositions: PropTypes.arrayOf(PropTypes.number),
  wallPositions: PropTypes.arrayOf(PropTypes.number),
  sharable: PropTypes.bool,
  color: PropTypes.string,
  centerTitle: PropTypes.bool,
};


export default CountUpManager;
