import React, { PropTypes, Component } from 'react';
//import { Route } from 'react-router-dom';
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import { DragDropContext } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/actions';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';
//import CustomDragLayer from '../components/CustomDragLayer';
//import NoteDetailsContainer from './NoteDetailsContainer';

class Notes extends Component {
  render() {
    const {currentFolder, params, children, /*match,*/ createNote, moveNote, removeNote} = this.props;
    //const {folderId} = match.params;
    const {folderId} = params;
    //console.log('match of NotesContainer = ', match);
    return (
      <div style={{border: '1px solid red'}}>
        <CreateNote
          folderId={folderId}
          createNote={createNote}/>
        <NoteList
          folder={currentFolder}
          params={params}
          moveNote={moveNote}
          removeNote={removeNote}/>
        <div>{children}</div>
      </div>
    );
  }
}
//<Route path="/:folderId/:noteId" component={NoteDetailsContainer}/>
Notes.propTypes = {
  //match: PropTypes.object.isRequired,
  createNote: PropTypes.func.isRequired,
  moveNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const mapStateToProps = (state, ownProps) => ({
  currentFolder: state.folders.find((folder) => folder.id === ownProps.params.folderId),
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

//export default DragDropContext(HTML5Backend)(NotesContainer);
export default NotesContainer;
