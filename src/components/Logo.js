import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import SearchIcon from 'material-ui/svg-icons/action/search';
//import SearchBar from './SearchBar';
import logo from './logo.svg';
import './css/Logo.css';

const style = {
  width: '72px',
  height: '72px',
  borderRadius: '50%',
  backgroundColor: 'dodgerblue',
  boxShadow: '0px 5px 8px gray'
};

const iconStyle = {
  width: '36px',
  height: '36px',
  color: 'white'
};

const Logo = ({history, match}) => {
  const isMatch = match && match.params.folderId && match.params.noteId;
  const goBack = () => {
    isMatch && history.push(`/notes/${match.params.folderId}`);
  };
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo"/>
      {isMatch &&
        <IconButton
          style={{width: '72px', height: '72px'}}
          iconStyle={{width: '36px', height: '36px'}}
          tooltip="BACK"
          tooltipPosition="top-right"
          onTouchTap={goBack}
        >
          <ArrowBackIcon/>
        </IconButton>}
      <IconButton
        style={style}
        iconStyle={iconStyle}
        hoveredStyle={{opacity: 0.7}}
        tooltip="SEARCH NOTE"
        tooltipPosition="top-right"
      >
        <SearchIcon/>
      </IconButton>

    </div>
  );
};

Logo.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Logo;
