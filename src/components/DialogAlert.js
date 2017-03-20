import React, { PropTypes, Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class DialogAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
    this.handleContinue = this.handleContinue.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleContinue() {
    this.props.callback(true);
    this.setState({open: false});
  }
  handleCancel() {
    this.props.callback(false);
    this.setState({open: false});
  }
  render() {
    const {message} = this.props;
    const {open} = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCancel}/>,
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleContinue}/>,
    ];
    return (
    <MuiThemeProvider>
      <div>
        <Dialog
          title="WARNING!!!"
          actions={actions}
          modal={true}
          open={open}
        >
          {message}
        </Dialog>
      </div>
    </MuiThemeProvider>
    );
  }
}

DialogAlert.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default DialogAlert;
