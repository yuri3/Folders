import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Menu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import SearchIcon from 'material-ui/svg-icons/action/search';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import SearchBarContainer from '../containers/SearchBarContainer';
import logo from './logo.svg';
import './css/SideBar.css';

const IconElementLeft = (props) => (
  <IconMenu
    iconStyle={{color: 'white'}}
    touchTapCloseDelay={100}
    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    iconButtonElement={
      <IconButton tooltip="MENU" tooltipPosition="bottom-right">
        <Menu/>
      </IconButton>
    }
    onItemTouchTap={props.handleToggle}
  >
    <MenuItem value="1" primaryText="Close"/>
  </IconMenu>
);

const style = {
  borderRadius: '50%',
  backgroundColor: 'dodgerblue',
  boxShadow: '0px 5px 8px gray'
};

const searchIconStyle = {
  color: 'white'
};

class SideBar extends Component {
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
    const {isShowDrawer} = this.state;
    const {match, history, location} = this.props;
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
      <div className="Side-Bar">
        <img src={logo} className="Side-Bar-logo" alt="logo"/>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {isMatch && iconButton}
        </ReactCSSTransitionGroup>
        <IconButton
          style={style}
          iconStyle={searchIconStyle}
          hoveredStyle={{opacity: 0.7}}
          tooltip="SEARCH NOTE"
          tooltipPosition="top-right"
          onTouchTap={this.handleToggle}
        >
          <SearchIcon/>
        </IconButton>
        <Drawer
          width={250}
          docked={false}
          openSecondary={true}
          open={isShowDrawer}
          onRequestChange={this.handleToggle}
        >
          <div>
            <AppBar
              title="Search..."
              iconElementLeft={
                <IconElementLeft handleToggle={this.handleToggle}/>
              }
              iconElementRight={
                <IconButton
                  tooltip="CLOSE"
                  tooltipPosition="bottom-left"
                  onTouchTap={this.handleToggle}
                >
                  <NavigationClose/>
                </IconButton>
              }
            />
            {isShowDrawer &&
              <SearchBarContainer
                handleToggle={this.handleToggle}
                history={history}
                location={location}
              />
            }
          </div>
        </Drawer>
      </div>
    );
  }
}

SideBar.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(SideBar);
