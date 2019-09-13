import React from 'react';
import ChartsFactory from '../../components/ChartsFactory';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import shortid from 'shortid';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align:center;
`;

class ChartsFactoryPage extends React.Component {
  render() {
    return (
      <Content>
        <Typography>
          Amcharts Factory Example
        </Typography>
        <ChartsFactory
          id={shortid.generate()}
          chartType={1}
        />
        <ChartsFactory
          id={shortid.generate()}
          chartType={7}
        />
        <ChartsFactory
          id={shortid.generate()}
          chartType={8}
        />
        <ChartsFactory
          id={shortid.generate()}
          chartType={14}
        />
      </Content>
    )
  }
}

export default ChartsFactoryPage;