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

class CommentCard extends React.Component {
  state = {
    comments: this.props.message,
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
            Please leave us a comment.
          </Typography>
          {this.props.attending === 'false' ?
            <Typography component="p">
            We are very sorry that you cannot join us.  Please revisit this site if anything changes and feel free to leave us a message below!
          </Typography>
          :
            <Typography component="p">
              Specify any special needs that you may have or if you would like to express a special need privately please visit our Contact Us page.
            </Typography>
          }
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="personalNeed"
                label="Comments and Requests"
                className={classes.textField}
                margin="normal"
                value={this.state.comments}
                onChange={(e) => this.props.updateInvitationResponse('comments', e.target.value)}
              />
            </Grid>
            {this.props.attending === 'true' ?
              <Grid item xs={12} sm={5}>
                <TextField
                  id="emailAddress"
                  label="Email Address"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.emailAddress}
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

CommentCard.propTypes = {
  classes: PropTypes.object.isRequired,
  validationCallback: PropTypes.func,
  comments: PropTypes.string,
  updateInvitationResponse: PropTypes.func,
  attending: PropTypes.string,
  emailAddress: PropTypes.string,
};

export default withStyles(styles)(CommentCard);