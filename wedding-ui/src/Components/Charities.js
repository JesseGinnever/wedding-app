import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

//JSON Data
import charitiesList from '../Assets/JSON/CharitiesJSON.js'

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    maxWidth: '80%',
    padding: 10,
    marginLeft  : 'auto',
    marginRight : 'auto',
  },
  paperDetail: {
    maxWidth: '100%',
    padding: 10,
    margin: 15,
  },
  card: {
    margin: 15,
    width: '100%',
  },
  media: {
    height: 100,
  },
  cardContent: {
    height: 144,
    overflow: "hidden",
  }
});

class Charities extends React.Component {
    state = {
    };
  
    render () {
      const { classes } = this.props;
  
      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Paper className={classes.paperDetail}>

            </Paper>
            <Grid container spacing={24}>
              {charitiesList.map(function(charity, index) {
                return <div key={'charity' + index}>
                <Grid item xs={6}>
                  <Card className={classes.card} >
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/contemplative-reptile.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="headline" component="h2">
                      {charity.name}
                      </Typography>
                      <Typography component="p">
                        {charity.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </div>}, this)} 
            </Grid>
          </Paper>
        </div>
      );
    }
  }

Charities.propTypes = {
  classes: PropTypes.object,
};
  
  export default withStyles(styles)(Charities);