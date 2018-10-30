import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

//Custom Components
import IdentityCard from './IdentityCard';
import ContactInfoCard from './ContactInfoCard';

//Custom Services
import GuestService from '../Services/GuestService';

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
  paper: {
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
  return ['New Phone, Who Dis?', 'Contact Info'];
}

class ContactInfoStepper extends React.Component {
  constructor() {
    super();
    this.state = {
      activeStep: 0,
      stepIsValid: false,
      invitationResponse: new InvitationResponse(),
      isLoading: false
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

  updateInvitationResponseByWeddingCode = (key, value) => {
    this.setState({
      isLoading: true
    });

    GuestService.getGuestInfoByWeddingCode(value.toUpperCase())
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log("getGuestInfoByWeddingCode response:" + JSON.stringify(responseJson))
      this.setState({
        isLoading: false
      });
      if (responseJson.length > 0) {
        this.setState({
          invitationResponse: responseJson[0]
        });
        this.updateFormValidation(true);
      } else {
        this.updateFormValidation(false);
      }
    })
    .catch((error) => {
      this.setState({
          isLoading: false
      });
      console.error(error);
    });
  };

  saveUpdatedInvitationResponseToService = () => {
    GuestService.updateGuestInfo(this.state.invitationResponse)
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log("saveUpdatedInvitationResponseToService response:" + JSON.stringify(responseJson))
    })
    .catch((error) => {
      //console.error(error);
    });
  };

  getStepContent = (step) => {
    switch (step) {
      case 0:
          return <IdentityCard 
                  weddingCode={this.state.invitationResponse.weddingCode}
                  updateInvitationResponse={this.updateInvitationResponseByWeddingCode}
                  isLoading={this.state.isLoading}
                 />;
      case 1:
        return <ContactInfoCard
                validationCallback={this.updateFormValidation}
                updateInvitationResponse={this.updateInvitationResponse}
                comments={this.state.invitationResponse.comments}
                attending={this.state.invitationResponse.attending}
                emailAddress={this.state.invitationResponse.emailAddress}
                partyName={this.state.invitationResponse.partyName}
              />;
      default:
            return 'Something has gone wrong.  Please refesh the page or contact us directly to RSVP';
    }
};

  handleNext = () => {
    if (this.state.invitationResponse.attending === 'false' && this.state.activeStep !== 0 && this.state.activeStep !== getSteps().length - 1) {
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
        <Paper className={classes.paper}>
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
              {this.saveUpdatedInvitationResponseToService()}
              <Typography component="p">
                  Thank you for updating your contact info for us!
              </Typography>
              <Typography component="p">
                  We will be sending the wedding invitation (which will be completed on this website) to this email address!
              </Typography>
              <Typography component="p">
                  We will also be sending all wedding updates to the email entered in the previous step.
              </Typography>
              <Typography component="p">
                  Please feel free to update this address at any time!
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </Paper>
      </div>
    );
  }
}

ContactInfoStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ContactInfoStepper);