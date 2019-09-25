/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';

import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { CircularProgress } from '@material-ui/core';

import StackedColumnChart from './index';

let am4core = null;
let am4themesAnimated = null;
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core');
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

function StackedColumnChartManager({
  chartType,
  query,
  filters,
  backgroundColor,
  color,
  centerTitle,
  label,
  id,
  sharable,
  sharedChartId,
  sharedChartTitle,
  homePositions,
  wallPositions
}) {
  let variables = {
    sharedfilters: {
      chartType,
      query,
      filter: filters
    }
  };

  useEffect(() => {
    variables = {
      sharedfilters: {
        ...variables.sharedfilters,
        filter: filters
      }
    };
  }, [filters]);

  const { data, loading, error } = useQuery(gql`${query}`, { skip: !query, variables: filters });

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
      <XYChartContainer backgroundColor={backgroundColor}>
        <RowColTop>
          <RowColTopLabel color={color} centerTitle={centerTitle}>
            {label}
          </RowColTopLabel>
        </RowColTop>
        <ChartContainer>
          <StackedColumnChart
            id={id}
            backgroundColor={backgroundColor}
            data={ret}
            color={color}
          />
        </ChartContainer>
      </XYChartContainer>
    );
  }

  return <div />;
}


StackedColumnChartManager.defaultProps = {
  backgroundColor: 'white',
  sharable: false,
  color: '#000000',
};

StackedColumnChartManager.propTypes = {
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

export default StackedColumnChartManager;
