import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FONT_WEIGHT, FONT_SIZE } from '../../../constants/style';
import { GREY } from '../../../constants/colors';

const Column = styled.div`
  display: flex;
  flex-direction: column;  
  padding-left:40px;
  padding-right:40px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
  height:40px;
  position: relative;
  border-bottom: solid ${GREY} 1px;
  margin-bottom: 20px;
  align-items: baseline;
`;

const Category = styled.div`
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.bold};
`;

const Value = styled.div`
  font-size: ${FONT_SIZE.xxLarge};
`;

function SimpleListChart({ data }) {
  return (
    <Column>
      {data && data.map(item => (
        <Row>
          <Category>{item.category}</Category>
          <Value>{item.value}</Value>
        </Row>
      ))}
    </Column>
  );
}

SimpleListChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000'
};

SimpleListChart.propTypes = {
  backgroundColor: PropTypes.string,
  data: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number, PropTypes.string]
    )
  ),
  color: PropTypes.string,
};


export default SimpleListChart;
