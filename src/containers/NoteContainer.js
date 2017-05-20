import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions  from '../actions/notes';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Loading from '../components/Loading';

const styles = {
  display: 'flex',
  position: 'relative',
  width: '200px',
  cursor: 'move',
};

const iconStyle = {
  width: '20%',
  backgroundColor: 'gray',
};

const linkStyle = {
  width: '80%',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  padding: '10px 5px 10px 5px',
};

const activeStyle = {
  textDecoration: 'none',
  pointerEvents: 'none',
};

const removeStyle = {
  position: 'absolute',
  top: '-25px',
  right: '-25px',
};

class Note extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentWillUnmount() {
    const {notes: {deleteId}, selectDeleteNote} = this.props;
    deleteId && selectDeleteNote(null);
  }
  handleRemove() {
    const {history, selectDeleteNote, deleteSelectedNote, match: {params: {folderId, noteId}}, note} = this.props;
    selectDeleteNote(note.id);
    deleteSelectedNote(note.id);
    note.id === Number.parseInt(noteId, 10) && history.push(`/notes/${folderId}`);
  }
  render() {
    const {notes: {deleteId}, note, isDragging} = this.props;
    const noteName = note.name ? note.name : 'New Note';
    const color = note.name ? 'dodgerblue' : 'gray';
    const opacity = isDragging ? 0 : 1;
    return(
      <div style={{...styles, opacity}}>
        <i className="material-icons md-36" style={iconStyle}>description</i>
        <header style={linkStyle}>
          <NavLink
            style={{color: 'black'}}
            activeStyle={{...activeStyle, color}}
            to={`/notes/${note.folderId}/${note.id}`}>{noteName}
          </NavLink>
        </header>
        <span style={removeStyle}>
          {note.id === deleteId && <Loading />}
          {note.id !== deleteId &&
            <IconButton
              iconClassName="material-icons"
              tooltip="REMOVE NOTE"
              tooltipPosition="top-center"
              onTouchTap={this.handleRemove}>delete_forever
            </IconButton>}
        </span>
      </div>
    );
  }
}

Note.propTypes = {
  notes: PropTypes.shape({
    deleteId: PropTypes.number,
  }),
  note: PropTypes.shape({
    folderId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isDragging: PropTypes.bool.isRequired,
  match: PropTypes.object,
  history: PropTypes.object,
  selectDeleteNote: PropTypes.func,
  deleteSelectedNote: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const NoteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Note);

export default withRouter(NoteContainer);
