import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Share from '@material-ui/icons/Share';

import { BiContextConsumer } from 'containers/bi/context';

const MenuContainer = styled.div`
  width: 100%;
  height: 100%;
`;


class ChartMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      result: {
        openShare: true,
        type: 1,
        queryGraph: this.props.queryGraph,
        chartType: this.props.chartType,
        positions: {
          wall: this.props.wallPositions,
          home: this.props.homePositions,
        },
        id: this.props.id,
        width: 1,
        title: this.props.title,
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wallPositions !== this.props.wallPositions) {
      this.setState({
        positions: {
          wall: this.props.wallPositions,
          home: this.props.homePositions,
        }
      });
    }
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    render() {
      const { anchorEl } = this.state;
      return (
        <MenuContainer>
          <BiContextConsumer>
            {context => (
              <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={() => context.setFormDialogParams(this.state.result)}
              >
                <Share />
              </Button>
            )}
          </BiContextConsumer>
        </MenuContainer>
      );
    }
}


ChartMenu.propTypes = {
  queryGraph: PropTypes.string.isRequired,
  chartType: PropTypes.number.isRequired,
};


export default ChartMenu;
