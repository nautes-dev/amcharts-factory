import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { CircularProgress } from '@material-ui/core';

import ContainerChart from './index';


const RowColTop = styled.div`
  height: 10%;
  width: calc(100% - 10px);
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



const ContainerChartContainer = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 90%;  
`;

const LoadingContainer = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  justify-content: center;
  min-height: 250px;
`;

class ContainerChartManager extends Component {
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
            const ret = data.queryAlias;
            return (
              <ContainerChartContainer
                backgroundColor={this.props.backgroundColor}>
                <RowColTop>
                  <RowColTopLabel color={this.props.color} centerTitle={this.props.centerTitle}>
                    {this.props.label}
                  </RowColTopLabel>
                </RowColTop>
                <ChartContainer>
                  <ContainerChart
                    id={this.props.id}
                    backgroundColor={this.props.backgroundColor}
                    data={ret}
                  />
                </ChartContainer>
              </ContainerChartContainer>
            );
          }
        }}
      </Query>
    );
  }
}

ContainerChartManager.defaultProps = {
  backgroundColor: 'white',
  sharable: false,
  color: '#000000',
};

ContainerChartManager.propTypes = {
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

export default ContainerChartManager;
