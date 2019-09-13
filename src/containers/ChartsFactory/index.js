import React from 'react';
import ChartsFactory from '../../components/ChartsFactory';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align:center;
`;

class ChartsFactoryPage extends React.Component {
  render() {
    return (
      <Content>
        <Typography style={{fontSize:'50px'}}>
          Amcharts Factory Example
        </Typography>
        <ChartsFactory
          id={1}
          chartType={1}
          title={'Grafico 1'}
        />
        <ChartsFactory
          id={7}
          chartType={7}
          title={'Grafico 7'}
        />
        <ChartsFactory
          id={8}
          chartType={8}
          title={'Grafico 8'}
        />
        <ChartsFactory
          id={14}
          chartType={14}
          title={'Grafico 14'}
        />
      </Content>
    )
  }
}

export default ChartsFactoryPage;