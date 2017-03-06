import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/actions';
import CreateNote from '../components/CreateNote';
import NoteList from '../components/NoteList';

class Notes extends React.Component {
  render() {
    const {currentFolder, params, createNote, removeNote, children} = this.props;
    const {folderId} = params;
    return (
      <div style={{border: '1px solid red'}}>
        <CreateNote
          folderId={folderId}
          createNote={createNote}/>
        <NoteList
          folder={currentFolder}
          params={params}
          removeNote={removeNote}/>
        <div>{children}</div>
      </div>
    );
  }
}

Notes.propTypes = {
  params: React.PropTypes.object.isRequired,
  createNote: React.PropTypes.func.isRequired,
  removeNote: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
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

export default NotesContainer;
