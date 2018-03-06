import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { withStyles } from 'material-ui/styles';
import { CardContent }from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Hidden from 'material-ui/Hidden';

const styles = {
  card: {
    maxWidth: '80%',
    padding: 10,
    marginLeft  : 'auto',
    marginRight : 'auto',
    marginTop : 40,
  },
  media: {
    height: 200,
  },
  rowContainer: {
      paddingTop: 0,
      marginTop: -25,
    },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    paddingTop: 16,
    width: '100%',
  },
  selectLabel: {
    top: 16,
  },
  gridLabel: {
    marginBottom: 14,
    marginTop: 'auto',
  },
  select: {
    paddingTop: 0,
    marginTop: 0,
    width: '100%',
  },
  textField: {
    paddingTop: 0,
    marginTop: 0,
    width: '100%',
  },
  menu: {
    width: 200,
  },
  partyMember: {
    marginTop: 'auto',
    marginBottom: 8,
  },
  mainContent: {
    marginTop: 10,
  },
  mealContent: {
    padding: 12,
    width: '100%',
  }
};



class FoodDrinkCard extends React.Component {
  state = {
    meals: this.props.meals,
    drinkTotal: this.props.drinkTotal   
  };
  
  handleMealChange = (event, index, property) => {
    var oldMeals = this.state.meals;
    var newMeal = this.state.meals[index];
    newMeal[property] = event.target.value;
    oldMeals[index] = newMeal;

    this.setState({ meals: oldMeals });
    this.props.updateInvitationResponse('meals', oldMeals);
  };

  handleDrinkTotalChange = event => {
    this.setState({ 
      drinkTotal: event.target.value 
    },
    this.props.updateInvitationResponse('drinkTotal', event.target.value));
  };

  componentWillMount() {
    this.props.validationCallback(true);
  }

  render () {
    const { classes } = this.props;

    return (
      <div>
          <CardContent>
            <Typography variant="headline" component="h2">
              We like to eat foods and drink drinks.
            </Typography>
            <Typography component="p">
              If you'd like, please help us out by giving us some info on your food and drink preferences below. <br/>
              This step is completely option. Please feel free to skip it.
            </Typography>
            <form className={classes.root}>
              <Grid container spacing={24} className={classes.mainContent}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="title">
                    Drink Info
                  </Typography>
                </Grid>
                <Hidden xsDown>
                    <Grid item xs={12} sm={6} className={classes.gridLabel}>
                     <Typography component="p">
                       How many drinks would you guess your party will want?
                     </Typography>
                    </Grid>
                  </Hidden>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="partySize"
                    label="# of Drinks"
                    placeholder="4"
                    value={this.state.drinkTotal}
                    type="number"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleDrinkTotalChange}
                  />
                </Grid>


                {this.state.meals.map(function(meal, index) {
                  return <div key={'meal' + index} className={classes.mealContent}>
                  <Grid container spacing={24}>
                  <Grid item xs={12} sm={12} className={classes.partyMember}>
                    <Typography variant="title">
                      Party Member {index + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.rowContainer}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.selectLabel}>Meat #1</InputLabel>
                      <Select value={meal.meat1}  onChange={(e) => this.handleMealChange(e, index, "meat1")}>
                        <MenuItem value='Chicken'>Chicken</MenuItem>
                        <MenuItem value='Salmon'>Salmon</MenuItem>
                        <MenuItem value='Pulled Pork'>Pulled Pork</MenuItem>
                        <MenuItem value='Brisket'>Brisket</MenuItem>
                      />
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.rowContainer}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.selectLabel}>Meat #2</InputLabel>
                      <Select
                        value={meal.meat2} onChange={(e) => this.handleMealChange(e, index, "meat2")}>
                        <MenuItem value='Chicken'>Chicken</MenuItem>
                        <MenuItem value='Salmon'>Salmon</MenuItem>
                        <MenuItem value='Pulled Pork'>Pulled Pork</MenuItem>
                        <MenuItem value='Brisket'>Brisket</MenuItem>
                      />
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.rowContainer}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.selectLabel}>Side #1</InputLabel>
                      <Select
                        value={meal.side1} onChange={(e) => this.handleMealChange(e, index, "side1")}>
                        <MenuItem value='Beans'>Beans w/ Bacon</MenuItem>
                        <MenuItem value='Potato'>Sweet Pepper Potato Salad</MenuItem>
                        <MenuItem value='Mac'>White Cheddar Cracker Mac</MenuItem>
                        <MenuItem value='Coleslaw'>Coleslaw</MenuItem>
                      />
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3} className={classes.rowContainer}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.selectLabel}>Side #2</InputLabel>
                      <Select
                        value={meal.side2} onChange={(e) => this.handleMealChange(e, index, "side2")}>
                        <MenuItem value='Beans'>Beans w/ Bacon</MenuItem>
                        <MenuItem value='Potato'>Sweet Pepper Potato Salad</MenuItem>
                        <MenuItem value='Mac'>White Cheddar Cracker Mac</MenuItem>
                        <MenuItem value='Coleslaw'>Coleslaw</MenuItem>
                      />
                      </Select>
                    </FormControl>
                  </Grid>
                  </Grid>
                </div>;
                }, this)}

              </Grid>
            </form>
          </CardContent>
      </div>
    );
  }
}

FoodDrinkCard.propTypes = {
  classes: PropTypes.object.isRequired,
  validationCallback: PropTypes.func,
  meals: PropTypes.array,
  updateInvitationResponse: PropTypes.func,
  drinkTotal: PropTypes.string,
};

export default withStyles(styles)(FoodDrinkCard);