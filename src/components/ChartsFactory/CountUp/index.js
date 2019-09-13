import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import styled from 'styled-components';

// style
const CountUpRowCol = styled.div`
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  text-transform: uppercase;
  padding: 5px;
  margin: 5px;
  display: flex;
  flex-direction:column;
  text-align:center;
  background-color: ${props => props.backgroundColor}
`;

const CountUpRowColChart = styled.div`
    padding: 20px;
    font-size: 25px;
`;



function CountUpChart(props) {  
const countUpStyle = {
  color: props.color
}

  return (
    <CountUpRowCol>
      <CountUpRowColChart>
        <CountUp
          delay={1}
          start={props.data.valuePYTD}
          end={props.data.value}
          prefix=""
          suffix={props.data.valueUm}
          style={countUpStyle}
        />
      </CountUpRowColChart>
      <CountUpRowColChart>
        <CountUp
          delay={1}
          start={0}
          end={props.data.percentage}
          prefix={props.data.percentage > 0 ? '+ ' : ''}
          suffix={props.data.percentageUm}
          style={countUpStyle}
        />
      </CountUpRowColChart>
    </CountUpRowCol>
  );
}

CountUpChart.defaultProps = {
  backgroundColor: 'white',
  color: '#000000'
};

CountUpChart.propTypes = {
  backgroundColor: PropTypes.string,
  data: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number, PropTypes.string]
    )
  ),
  color: PropTypes.string,
};


export default CountUpChart;
