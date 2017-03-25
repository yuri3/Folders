import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import SearchIcon from 'material-ui/svg-icons/action/search';
//import SearchBar from './SearchBar';
import logo from './logo.svg';
import './css/Logo.css';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

const style = {
  borderRadius: '50%',
  backgroundColor: 'dodgerblue',
  boxShadow: '0px 5px 8px gray'
};

const iconStyle = {
  color: 'white'
};

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {isShowDrawer: false};
    this.goBack = this.goBack.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  goBack() {
    const {match, history} = this.props;
    history.push(`/notes/${match.params.folderId}`);
  }
  handleToggle() {
    this.setState({isShowDrawer: !this.state.isShowDrawer})
  }
  render() {
    const {match} = this.props;
    const isMatch = match && match.params.folderId && match.params.noteId;
    const iconButton = (
      <div key={1}>
        <IconButton
          style={{width: '60px', height: '60px'}}
          iconStyle={{width: '30px', height: '30px'}}
          tooltip="BACK"
          tooltipPosition="top-right"
          onTouchTap={this.goBack}
        >
          <ArrowBackIcon/>
        </IconButton>
      </div>
    );
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo"/>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {isMatch && iconButton}
        </ReactCSSTransitionGroup>
        <IconButton
          style={style}
          iconStyle={iconStyle}
          hoveredStyle={{opacity: 0.7}}
          tooltip="SEARCH NOTE"
          tooltipPosition="top-right"
          onTouchTap={this.handleToggle}
        >
          <SearchIcon/>
        </IconButton>
        <div >
        <Drawer
          width={200}
          docked={false}
          openSecondary={true}
          open={this.state.isShowDrawer}
          onRequestChange={this.handleToggle}
        >
          <div>
            <AppBar title="Search..."/>
            <MenuItem>Menu Item</MenuItem>
          </div>
        </Drawer>
        </div>
      </div>
    );
  }
}

Logo.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(Logo);
