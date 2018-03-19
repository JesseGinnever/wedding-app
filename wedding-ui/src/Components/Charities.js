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
    marginTop : 40,
  },
  charityCard: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperDetail: {
    maxWidth: '100%',
    padding: 10,
    margin: 10,
  },
  card: {
    margin: 15,
    width: '100%',
  },
  media: {
    height: 100,
    backgroundSize: "auto",
  },
  cardContent: {
    height: 144,
    overflow: "hidden",
  },
  gridDiv: {
    margin: 15,
    width: '100%',
  },
});

class Charities extends React.Component {
    state = {
    };
  
    render () {
      const { classes } = this.props;
  
      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography gutterBottom variant="display1" className={classes.paperDetail}>
              We will not be accepting traditional gifts
            </Typography>
            <Typography gutterBottom variant="subheading" className={classes.paperDetail}>
              We are very grateful that you want to help contribute to our futures, but we would be even more grateful if you would consider contibuting to the future of others.  Below is a list of some of the organizations we feel the most connected to.  We hope that you find an organization that speaks to an issue that is important to you!
            </Typography>
            <Typography gutterBottom variant="body2" className={classes.paperDetail}>
              * any gifts received will be irresponsibly given to the nearest child or animal
            </Typography>
            <Grid container spacing={24}>
            <div key={'charity' + 0} className={classes.gridDiv}>
              <Grid container spacing={24}>
              {charitiesList.map(function(charity, index) {
                return <Grid item xs={12} sm={6} md={3}>
                  <Card className={classes.charityCard} >
                    <CardMedia
                      className={classes.media}
                      image={charity.image}
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
                      <Button size="small" color="primary" href={charity.donateUrl}>
                        Donate
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>}, this)} 
                </Grid>
            </div>
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