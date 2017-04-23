import React, { PropTypes, Component } from 'react';
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
    const {options, selectDeleteNote} = this.props;
    options.deleteId && selectDeleteNote(null);
  }
  handleRemove() {
    const {history, deleteSelectedNote, match: {params: {folderId, noteId}}, note} = this.props;
    deleteSelectedNote(note.id);
    note.id === noteId && history.push(`/notes/${folderId}`);
  }
  render() {
    const {
      note,
      options: {deleteId},
      isDragging
    } = this.props;
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
              onTouchTap={this.handleRemove}>delete_forever
            </IconButton>}
        </span>
      </div>
    );
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    folderId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  options: PropTypes.shape({
    deleteId: PropTypes.number,
  }).isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  selectDeleteNote: PropTypes.func.isRequired,
  deleteSelectedNote: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};

export default withRouter(Note);
