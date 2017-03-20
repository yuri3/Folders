import React from 'react';
import ReactDOM from 'react-dom';
import DialogAlert from './components/DialogAlert';

export default (holderId) => {
  const modalHolder = document.getElementById(holderId);
  return (message, callback) => {
    ReactDOM.render((
      <DialogAlert key={new Date().getTime()} message={message} callback={callback}/>
    ), modalHolder);
  }
};
