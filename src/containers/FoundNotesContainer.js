import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import DragAndDropNote from '../components/DragAndDropNote';

const style = {
  margin: '0 0 0 30px',
  flex: 1
};

const headerStyle = {
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 10px',
};

class FoundTitles extends Component {
  handleLink = (label) => {
    const {searchNotesByTag, notes, location: {state}} = this.props;
    state.type = 'TAGS';
    searchNotesByTag(notes, label);
  };
  render() {
    const {
      options: {foundNotes, foundNotesByTag},
      location: {state},
      moveFoundNote,
      removeFoundNote,
      moveFoundNoteByTag,
      removeNote,
    } = this.props;
    const {matchInTitles, matchInTags} = foundNotes;
    return (
      <div style={style}>
        <div style={headerStyle}>
          <strong>{`FOUND (${foundNotes.searchText.toUpperCase()}) BY ${state.type}`}</strong>
        </div>

      </div>
    );
  }
}

/*<DragAndDropNote
 index={index}
 note={note}
 moveNote={moveNote}
 removeNote={removeNote}
 />*/

/*{matchInTitles && state.type === 'TITLES' &&
 <NoteList
 folder={{notes: matchInTitles}}
 moveNote={moveFoundNote}
 removeNote={(parentId, id) => {
 removeFoundNote(id);
 removeNote(parentId, id);
 }}
 />}*/
/*{matchInTags && state.type === 'TAGS' &&
 <div>
 <ReactCSSTransitionGroup
 transitionName="fade"
 transitionEnterTimeout={500}
 transitionLeaveTimeout={500}
 style={{display: 'flex', flexWrap: 'wrap'}}
 >
 {matchInTags.map((tag) => (
 <Chip
 key={tag.key}
 onTouchTap={() => this.handleLink(tag.label)}
 style={{margin: 5}}
 >
 {tag.label}
 </Chip>
 ))}
 </ReactCSSTransitionGroup>
 </div>}*/
/*{foundNotesByTag &&
 <NoteList
 folder={{notes: foundNotesByTag}}
 moveNote={moveFoundNoteByTag}
 removeNote={(parentId, id) => {
 removeFoundNote(id);
 removeNote(parentId, id);
 }}
 />}*/

FoundTitles.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    parentFolderId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descriptions: PropTypes.string,
  })).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    parentNoteId: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.shape({
    foundNotes: PropTypes.shape({
      matchInTitles: PropTypes.array,
      matchInTags: PropTypes.array,
      matchInDescriptions: PropTypes.array,
    }),
    foundNotesByTag: PropTypes.array,
  }).isRequired,
  moveFoundNote: PropTypes.func.isRequired,
  moveFoundNoteByTag: PropTypes.func.isRequired,
  searchNotesByTag: PropTypes.func.isRequired,
  removeFoundNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
  tags: state.tags,
  options: state.options,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

const FoundTitlesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FoundTitles);

export default FoundTitlesContainer;
