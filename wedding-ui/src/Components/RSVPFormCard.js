import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { withStyles } from 'material-ui/styles';
import { CardContent }from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import {FormControlLabel, FormGroup } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

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
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: '100%',
  },
  menu: {
    width: 200,
  },
};

class RSVPFormCard extends React.Component {
  state = {
    attending: this.props.attending,
    partySize: this.props.partySize,
  };

  handleChange = name => event => {
    this.setState({ 
      [name]: event.target.value 
    },
    this.checkFormValidation);
  };

  checkFormValidation() {
    this.props.updateInvitationResponse('attending', this.state.attending);
    this.props.updateInvitationResponsePartySize(this.state.partySize);

    if (this.state.attending === 'false' || (this.state.attending && 
        (this.state.partySize && this.state.partySize > 0))) {
      this.props.validationCallback(true);
    } else {
      this.props.validationCallback(false);
    } 
  }

  componentWillMount() {
    this.checkFormValidation();
  }

  render () {
    const { classes } = this.props;

    return (
      <div>
          <CardContent>
          {this.state.attending === 'true' ?
            <div>
              <Typography variant="headline" component="h2">
                We are so glad you could make it, PARTY NAME!
              </Typography>
              <Typography component="p">
                Please let us know how many will be in your party below.
              </Typography>
            </div>
            : 
            <div>
              <Typography variant="headline" component="h2">
                Please let us know if you will be attending below.
              </Typography>
              <Typography component="p">
                If you cannot join us, please state that you are not awesome and proceed.
              </Typography>
            </div>
          }
            <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.attending === 'true'}
                          onChange={this.handleChange('attending')}
                          value="true"
                        />
                      }
                      label="I am awesome and I want to party."
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.attending === 'false'}
                          onChange={this.handleChange('attending')}
                          value="false"
                        />
                      }
                      label="Not awesome. Won't party."
                    />
                  </FormGroup>
                </Grid>
            </Grid>
            {this.state.attending === 'true' ?
              <div>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled
                      id="partyName"
                      label="Party Name"
                      value="Tom and Patty"
                      className={classes.textField}
                      margin="normal"
                    />
                  </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="partySize"
                      label="Party Size"
                      placeholder="2"
                      value={this.state.partySize}
                      onChange={this.handleChange('partySize')}
                      type="number"
                      InputProps={{ inputProps: { min: 0, max: 10 } }}
                      className={classes.textField}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </div>
            : null }
          </CardContent>
      </div>
    );
  }
}

RSVPFormCard.propTypes = {
  validationCallback: PropTypes.func,
  classes: PropTypes.object.isRequired,
  updateInvitationResponse: PropTypes.func,
  attending: PropTypes.string,
  updateInvitationResponsePartySize: PropTypes.func,
  partySize: PropTypes.string,
};

export default withStyles(styles)(RSVPFormCard);