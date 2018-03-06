import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Card from 'material-ui/Card';

//Custom Components
import RSVPFormCard from './RSVPFormCard';
import IdentityCard from './IdentityCard';
import FoodDrinkCard from './FoodDrinkCard';
import CommentCard from './CommentCard';

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
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
});

class InvitationResponse {
  constructor() {
    this.weddingCode = undefined;
    this.attending = undefined;
    this.partyName = undefined;
    this.partySize = undefined;
    this.meals = [];
    this.drinkTotal = undefined;
    this.comments = undefined;
    this.emailAddress = undefined;
  }
}

function getSteps() {
  return ['New Phone, Who Dis?', 'RSVP', 'Food & Drink', 'Done'];
}

class VerticalRSVPStepper extends React.Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      stepIsValid: false,
      invitationResponse: new InvitationResponse(),
    }
  }

  updateFormValidation = (isValid) => {
    this.setState({
      stepIsValid: isValid,
    });
  }

  updateInvitationResponse = (key, value) => {
    var updatedInvitationResponse = this.state.invitationResponse;
    updatedInvitationResponse[key] = value;
    
    this.setState({
      invitationResponse: updatedInvitationResponse,
    });
  }

  updateInvitationResponsePartySize = (newPartySize) => {
    if (this.partySize === newPartySize) { //@TODO THE FUCK IS HAPPENING!?!?!?!?
      return;
    }
    
    var mealArray = [];
    for(var i = 0; i < newPartySize; i++) {
      mealArray.push(this.createMealObject());
    }

    this.updateInvitationResponse('meals', mealArray);
    this.updateInvitationResponse('partySize', newPartySize);
  }

  createMealObject = () => {
    return {
      meat1: '',
      meat2: '',
      side1: '',
      side2: '',
    }
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
          return <IdentityCard 
                  validationCallback={this.updateFormValidation} 
                  weddingCode={this.state.invitationResponse.weddingCode}
                  updateInvitationResponse={this.updateInvitationResponse}
                 />;
      case 1:
        return <RSVPFormCard 
                validationCallback={this.updateFormValidation} 
                attending={this.state.invitationResponse.attending}
                updateInvitationResponse={this.updateInvitationResponse}
                partySize={this.state.invitationResponse.partySize}
                updateInvitationResponsePartySize={this.updateInvitationResponsePartySize}
               />;
      case 2:
        return <FoodDrinkCard
                validationCallback={this.updateFormValidation}
                meals={this.state.invitationResponse.meals}
                updateInvitationResponse={this.updateInvitationResponse}
                drinkTotal={this.state.invitationResponse.drinkTotal}
               />;
      case 3:
        return <CommentCard 
                validationCallback={this.updateFormValidation}
                updateInvitationResponse={this.updateInvitationResponse}
                comments={this.state.invitationResponse.comments}
                attending={this.state.invitationResponse.attending}
                emailAddress={this.state.invitationResponse.emailAddress}
               />;
      default:
            return 'Something has gone wrong.  Please refesh the page or contact us directly to RSVP';
    }
}

  handleNext = () => {
    if (this.state.invitationResponse.attending === 'false' && this.state.activeStep !== getSteps().length - 1) {
      this.setState({
        activeStep: getSteps().length - 1,
      });
    } else {
      this.setState({
        stepIsValid: false,
      });
      this.setState({
        activeStep: this.state.activeStep + 1,
      });
    }
  };

  handleBack = () => {
    var activeStep = this.state.activeStep;

    if (this.state.invitationResponse.attending === 'false' && this.state.activeStep === 3) {
      activeStep = 2;
    }
  
    this.setState({
      activeStep: activeStep - 1,
    });
    
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
    this.setState({
      invitationResponse: new InvitationResponse(),
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
      <Card className={classes.card}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {this.getStepContent(index)}
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                        disabled={!this.state.stepIsValid}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography variant="headline" component="h2">
              All Done!
            </Typography>
            {console.log(this.state.invitationResponse)}
            <Typography component="p">
                Thank you for RSVP'ing to our party!
                If you need to change anything, please feel free to complete the forms again!
                We cannot wait to see you in April!
            </Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </Card>
      </div>
    );
  }
}

VerticalRSVPStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalRSVPStepper);