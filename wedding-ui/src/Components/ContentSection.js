import React, { Component } from 'react';

//Material UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import Tabs, { Tab } from 'material-ui/Tabs';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';

//Custom Components

import VerticalRSVPStepper from './VerticalRSVPStepper';  
import Charities from './Charities';  

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

class ContentSection extends Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {

    const sideList = (
        <div>
          <List component="nav" value={this.state.value}>
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="RSVP" onClick={() => this.handleChange(undefined, 0)}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Gifts" onClick={() => this.handleChange(undefined, 1)}/>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Food, Drinks, Games" onClick={() => this.handleChange(undefined, 2)}/>
            </ListItem>
          </List>
        </div>
    );

    return (
      <div className="ContentSection">
          <AppBar position="static">
              <Toolbar>
                  <Hidden mdUp>
                    <IconButton onClick={this.toggleDrawer('left', true)} aria-label="Menu">
                      <MenuIcon />
                    </IconButton>
                  </Hidden>
                  <Typography variant="title" color="inherit" className="navBarTitle">
                    Sedovic - Ginnever Wedding
                  </Typography>
                  <Hidden smDown>
                    <Tabs value={this.state.value} onChange={this.handleChange} centered fullWidth>
                      <Tab label="RSVP" />
                      <Tab label="Gifts" />
                      <Tab label="Food, Drinks, Games" />
                    </Tabs>
                  </Hidden>
              </Toolbar>
            </AppBar>
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div tabIndex={0} role="button" onClick={this.toggleDrawer('left', false)} onKeyDown={this.toggleDrawer('left', false)}>
                {sideList}
              </div>
            </Drawer>
            <div>
                {this.state.value === 0 && <VerticalRSVPStepper />}
                {this.state.value === 1 && <Charities />}
                {this.state.value === 2 && <Button size="small">Learn Three</Button>}
            </div>
            <footer>

            </footer>
      </div>
    );
  }
}
export default withStyles(styles)(ContentSection);
