import React from 'react';
import ChartsFactory from '../../components/ChartsFactory';
import styled from 'styled-components';
import shortid from 'shortid';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';

const Content = styled.div`
  display: flex;
  background-color: white;
  height: 100%;
  width: 100%;
`;

const ChartContainer = styled.div`
  padding-top: 100px;
  width: ${props => props.width};
  height: 500px;
`;

class ChartsFactoryPage extends React.Component {
  state = {
    openSideMenu: false,
    chartType: 1,
  }

  openMenu(open) {
    this.setState({
      openSideMenu: open,
    });
  }

  setProperty(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <Content>
        <Topbar
          title="Amcharts Factory Example"
          setOpen={open => this.openMenu(open)}
          open={this.state.openSideMenu}
        />
        <Sidebar
          open={this.state.openSideMenu}
          setOpen={open => this.openMenu(open)}
          onClick={(key, value) => this.setProperty(key, value)}
        />

        <ChartContainer width={this.state.openSideMenu ? 'calc(100% - 240px)' : '100%'}>
          <ChartsFactory
            id={shortid.generate()}
            chartType={this.state.chartType}
          />
        </ChartContainer>
      </Content>
    )
  }
}

export default ChartsFactoryPage;