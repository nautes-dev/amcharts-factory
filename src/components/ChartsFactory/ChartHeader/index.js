/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Wallpaper from '@material-ui/icons/Wallpaper';
import Home from '@material-ui/icons/Home';

const ChartMenuContainer = styled.div`
  display:flex;
  align-self: flex-end;
`;

class ChartsHeader extends Component {
  render() {
    const { homePositions, wallPositions, sharedChartId, sharedChartTitle } = this.props;
    const sharedInHome = homePositions && homePositions.length > 0;
    const sharedInWall = wallPositions && wallPositions.length > 0;

    return (
      <React.Fragment>
        {(sharedInWall || sharedInHome) && (
          <div style={{ paddingTop: '6px' }}>
            {sharedInWall && <Wallpaper color="secondary" />}
            {sharedInHome && <Home color="primary" />}
          </div>
        )
        }
        <ChartMenuContainer>
          {/* <ChartMenu
            id={sharedChartId || null}
            queryGraph={this.props.query}
            chartType={this.props.chartType}
            homePositions={(sharedInHome && homePositions) ? homePositions : []}
            wallPositions={(sharedInWall && wallPositions) ? wallPositions : []}
            title={(sharedInWall || sharedInHome) && sharedChartTitle}
          /> */}
        </ChartMenuContainer>
      </React.Fragment>
    );
  }
}


ChartsHeader.defaultProps = {

};

ChartsHeader.propTypes = {
  sharedChartId: PropTypes.number,
  sharedChartTitle: PropTypes.string,
  homePositions: PropTypes.arrayOf(PropTypes.number),
  wallPositions: PropTypes.arrayOf(PropTypes.number),
  // data: PropTypes.object,
  query: PropTypes.string,
  chartType: PropTypes.number,
  // id: PropTypes.number,
};


export default ChartsHeader;
