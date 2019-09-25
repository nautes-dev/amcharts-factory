import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Grain, SportsVolleyball, GraphicEq, BarChart, HomeWork } from '@material-ui/icons';
import styled from 'styled-components';
import shortid from 'shortid';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: 'aliceblue',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const StyledA = styled.a`
  text-decoration: none;
`;

function Sidebar({ open, setOpen, onClick }) {
  const classes = useStyles();
  const theme = useTheme();

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button key={shortid.generate()} onClick={() => onClick('chartType', 1)}>
          <ListItemIcon><SportsVolleyball /></ListItemIcon>
          <ListItemText primary={"PieChart"} />
        </ListItem>
        <ListItem button key={shortid.generate()} onClick={() => onClick('chartType', 7)}>
          <ListItemIcon><BarChart /></ListItemIcon>
          <ListItemText primary={"XYChart"} />
        </ListItem>
        <ListItem button key={shortid.generate()} onClick={() => onClick('chartType', 8)}>
          <ListItemIcon><GraphicEq /></ListItemIcon>
          <ListItemText primary={"ClusteredBarChart"} />
        </ListItem>
        <ListItem button key={shortid.generate()} onClick={() => onClick('chartType', 14)}>
          <ListItemIcon><Grain /></ListItemIcon>
          <ListItemText primary={"ForceDirectedChart"} />
        </ListItem>
      </List>
      <Divider />
      <StyledA href="https://www.nautes.com/" ><ListItem button key={shortid.generate()}>
        <ListItemIcon><HomeWork /></ListItemIcon>
        <ListItemText primary={"Nautes S.p.A."} />
      </ListItem>
      </StyledA>
      <StyledA href="https://www.linkedin.com/in/maria-loreta-la-barbera/" ><ListItem button key={shortid.generate()}>
        <ListItemIcon><HomeWork /></ListItemIcon>
        <ListItemText primary={"Developer"} />
      </ListItem>
      </StyledA>
    </Drawer>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  onClick: PropTypes.func,

}

export default Sidebar;