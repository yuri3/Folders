import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActions from '../actions/notes';
import * as tagActions from '../actions/tags';
import DragAndDropNote from '../components/DragAndDropNote';

const style = {
  margin: '0 0 0 30px',
  flex: 1,
};

const headerStyle = {
  height: '72px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px 0 10px',
};

class FoundTitles extends Component {
  constructor(props) {
    super(props);
    this.state = {label: ''};
    this.handleLink = this.handleLink.bind(this);
  }
  componentDidMount() {
    const {match: {params}, fetchAllNotes, fetchAllTags} = this.props;
    fetchAllNotes(params);
    fetchAllTags();
  }
  handleLink(label) {
    const {location: {state}} = this.props;
    state.type = '';
    this.setState({label});
  }
  render() {
    const {
      notes: {loading: isFetchingNotes, lists: noteLists, search: {matchInTitles: {rows: matchNotes}, matchInTags: {rows}}},
      tags: {loading: isFetchingTags, lists: tagLists},
      location: {state},
      moveSelectedNote,
      selectDeleteNote,
      deleteSelectedNote,
    } = this.props;
    const matchTags = rows.reduce((prev, curr) => {
      if(!prev.find(tag => tag.label === curr.label)) {
        prev.push(curr);
      }
      return prev;
    }, []);
    const {label} = this.state;
    return (
      <div style={style}>
        {!isFetchingNotes && !isFetchingTags && <div>
          <div style={headerStyle}>
            <strong>{`FOUND (${label ? label : state.searchText.toUpperCase()}) BY ${state.type ? state.type : 'TAGS'}`}</strong>
          </div>
          {state.type === 'TITLES' &&
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {noteLists.map((note, index) => (
                <ReactCSSTransitionGroup
                  key={note.id}
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {matchNotes.find(n => n.id === note.id) &&
                    <DragAndDropNote
                      index={index}
                      note={note}
                      moveSelectedNote={moveSelectedNote}
                      selectDeleteNote={selectDeleteNote}
                      deleteSelectedNote={deleteSelectedNote}
                    />}
                </ReactCSSTransitionGroup>)
              )}
            </div>}
          {state.type === 'TAGS' &&
            <div style={{display: 'flex'}}>
              {matchTags.map((tag, index) => (
                <ReactCSSTransitionGroup
                  key={tag.id}
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  <Chip
                    onTouchTap={() => this.handleLink(tag.label)}
                    style={{margin: 5}}
                  >
                    {tag.label}
                  </Chip>
                </ReactCSSTransitionGroup>)
              )}
            </div>}
          {state.type === '' && label &&
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              {noteLists.map((note, index) => (
                <ReactCSSTransitionGroup
                  key={note.id}
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {tagLists.find(tag => tag.noteId === note.id && tag.label === label) &&
                    <DragAndDropNote
                      index={index}
                      note={note}
                      moveSelectedNote={moveSelectedNote}
                      selectDeleteNote={selectDeleteNote}
                      deleteSelectedNote={deleteSelectedNote}
                    />}
                 </ReactCSSTransitionGroup>)
              )}
            </div>}
        </div>}
      </div>
    );
  }
}

FoundTitles.propTypes = {
  notes: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({
      folderId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      descriptions: PropTypes.string,
    })).isRequired,
    search: PropTypes.shape({
      isSearching: PropTypes.bool.isRequired,
      matchInTitles: PropTypes.shape({
        count: PropTypes.number.isRequired,
        rows: PropTypes.array.isRequired,
      }).isRequired,
      matchInTags: PropTypes.shape({
        count: PropTypes.number.isRequired,
        rows: PropTypes.array,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  tags: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    lists: PropTypes.arrayOf(PropTypes.shape({
      noteId: PropTypes.number,
      id: PropTypes.number,
      label: PropTypes.string
    })).isRequired,
  }).isRequired,
  fetchAllNotes: PropTypes.func.isRequired,
  fetchAllTags: PropTypes.func.isRequired,
  moveSelectedNote: PropTypes.func.isRequired,
  selectDeleteNote: PropTypes.func.isRequired,
  deleteSelectedNote: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
  tags: state.tags,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...noteActions, ...tagActions}, dispatch);
};

const FoundTitlesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FoundTitles);

export default FoundTitlesContainer;
