import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Link from 'react-router-dom/Link';
const styles = theme => ({
  photoSlash: {
    height: '100%'
  },
  barTitle: {
    fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter"',
    flex: 1
  },
  viewLink: {
    textDecoration: 'none'
  },
  button: {
    width: 140
  },
  appBar: {
    backgroundColor: 'rgba(0,0,0, 0.3)',
    zIndex: 10,
    boxShadow: 'none'
  }
});



class PhotoSlash extends Component {

  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.photoSlash}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.barTitle}>
              Cody & Hilary
            </Typography>
            <Link to="/rsvp" className={classes.viewLink}>
              <Button variant="raised" color="secondary" className={classes.button} to="/rsvp">
               View Site
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <div className="bg-image img1"></div>
        <div className="bg-image img2"></div>
        <div className="bg-image img3"></div>
        <div className="bg-image img4"></div>
        <div className="bg-image img5"></div>
        <div className="bg-image img6"></div>
        <div className="bg-image img7"></div>
      </div>
    );
  }
}
export default withStyles(styles)(PhotoSlash);
