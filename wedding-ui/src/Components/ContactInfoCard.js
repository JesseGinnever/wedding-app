import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { withStyles } from 'material-ui/styles';
import { CardContent }from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

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

class ContactInfoCard extends React.Component {
  state = {
    comments: this.props.comments,
    emailAddress: this.props.emailAddress,
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
            Please enter your email address below!
          </Typography>
          <Typography component="p">
              Please enter your email address below so we can update you when the wedding invitation and other updates are available.
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
                <TextField
                    disabled
                    id="partyName"
                    label="Party Name"
                    value={this.props.partyName}
                    className={classes.textField}
                    margin="normal"
                />
            </Grid>
            {this.props.attending === 'true' ?
              <Grid item xs={12} sm={5}>
                <TextField
                  id="emailAddress"
                  label="Email Address"
                  className={classes.textField}
                  margin="normal"
                  value={this.props.emailAddress}
                  onChange={(e) => this.props.updateInvitationResponse('emailAddress', e.target.value)}
                />
              </Grid>
            : null}
          </Grid>
        </CardContent>
      </div>
    );
  }
}

ContactInfoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  validationCallback: PropTypes.func,
  comments: PropTypes.string,
  updateInvitationResponse: PropTypes.func,
  attending: PropTypes.string,
  emailAddress: PropTypes.string,
  partyName: PropTypes.string
};

export default withStyles(styles)(ContactInfoCard);