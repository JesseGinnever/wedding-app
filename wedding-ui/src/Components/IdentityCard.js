import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { withStyles } from 'material-ui/styles';
import { CardContent }from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/Progress/CircularProgress'

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
};

class IdentityCard extends React.Component {
  state = {
    weddingCode: this.props.weddingCode
  };

  onHandleWeddingCodeChange(event) {
    this.setState(
      {
        weddingCode: event.target.value,
      },
      this.checkFormValidation
    )
  };

  checkFormValidation() {
    //updateWeddingCode
    if (this.state.weddingCode) {
      this.props.updateInvitationResponse('weddingCode', this.state.weddingCode)
    }
  }

  componentWillMount() {
    this.checkFormValidation();
  }

  render() {  
    const { classes } = this.props;

    return (
          <CardContent>
            <Typography variant="headline" component="h2">
              Please type your Wedding Code below!
            </Typography>
            <Typography component="p">
              Your wedding code can be found in your invitation message.  We just need this so we can verify you are
              one of our loved ones!
            </Typography>
            <TextField
              id="with-placeholder"
              label="Wedding Code"
              placeholder="1A2"
              className={classes.textField}
              margin="normal"
              helperText="Found on your invitation"
              value={this.state.weddingCode}
              onChange={(event) => this.onHandleWeddingCodeChange(event)}
            />
            {this.props.isLoading ? <CircularProgress size={20} /> : ''}
          </CardContent>
    );
  }
}

IdentityCard.propTypes = {
  classes: PropTypes.object.isRequired,
  updateInvitationResponse: PropTypes.func,
  weddingCode: PropTypes.string,
  isLoading: PropTypes.bool
};

export default withStyles(styles)(IdentityCard);