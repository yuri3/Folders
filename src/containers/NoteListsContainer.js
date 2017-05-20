import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/notes';
import CreateNote from '../components/CreateNote';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DragAndDropNote from '../components/DragAndDropNote';

class NoteLists extends Component {
  componentDidMount() {
    const {fetchAllNotes, match: {params}} = this.props;
    fetchAllNotes(params);
  }
  componentWillReceiveProps(nextProps) {
    const {match: {params}, fetchAllNotes} = this.props;
    if(nextProps.match.params.folderId !== params.folderId) {
      fetchAllNotes(nextProps.match.params);
    }
  }
  render() {
    const {
      notes: {loading, lists},
      match: {params: {folderId, noteId}},
      createNewNote,
      moveSelectedNote
    } = this.props;
    const flex = folderId && noteId ? '0 1 223px' : '1';
    return (
      <div style={{margin: '0 0 0 30px', flex}}>
        <CreateNote
          loading={loading}
          folderId={folderId}
          createNewNote={createNewNote}
        />
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          style={{display: 'flex', flexWrap: 'wrap'}}
        >
          {lists.length > 0 && lists.map((note, index) => (
            <div style={{flexFlow: 'row wrap'}} key={note.id}>
              {note.folderId === Number.parseInt(folderId, 10) &&
                <DragAndDropNote index={index} note={note} moveSelectedNote={moveSelectedNote}/>}
            </div>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

NoteLists.propTypes = {
  notes: PropTypes.shape({
    lists: PropTypes.arrayOf(PropTypes.shape({
      folderId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
    })).isRequired,
  }).isRequired,
  match: PropTypes.object.isRequired,
  createNewNote: PropTypes.func.isRequired,
  moveSelectedNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NoteListsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteLists);

export default NoteListsContainer;
