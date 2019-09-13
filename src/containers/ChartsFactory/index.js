import React from 'react';
import ChartsFactory from '../../components/ChartsFactory';

class ChartsFactoryPage extends React.Component {
  render() {
    return (
      <ChartsFactory 
        id={1}
        chartType={1}
        title={'Grafico 1'}
      />
    )
  }
}

export default ChartsFactoryPage;