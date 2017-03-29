import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';
import NoteList from '../components/NoteList';

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
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    const {options: {foundNotes: {matchInTitles}}} = this.props;
    this.setState({foundMatch: matchInTitles});
  }
  componentWillReceiveProps(nextProps) {
    const {
      notes,
      options: {foundNotes: {matchInTitles}},
    } = nextProps;
    if(notes.length < this.props.notes.length) {
      const foundMatch = matchInTitles.filter((note) => {
        return notes.find((n) => n.id === note.id);
      });
      this.setState({foundMatch});
    } else {
      this.setState({foundMatch: matchInTitles});
    }
  }
  render() {
    const {
      options: {foundNotes: {searchText}},
      location: {state},
      moveFoundNote,
      removeNote
    } = this.props;
    const {foundMatch} = this.state;
    return (
      <div style={style}>
        <div style={headerStyle}>
          <strong>{`FOUND (${searchText.toUpperCase()}) BY ${state.type}`}</strong>
        </div>
        <NoteList
          folder={{notes: foundMatch}}
          moveNote={moveFoundNote}
          removeNote={removeNote}
        />
      </div>
    );
  }
}

FoundTitles.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.string,
    descriptions: PropTypes.string,
  })).isRequired,
  options: PropTypes.object.isRequired,
  moveFoundNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.folders.reduce((prev, curr) => {// read about normalize???
    const {notes} = curr;
    if(notes.length > 0) {
      notes.forEach((note) => prev.push(note));
      return prev;
    }
    return prev;
  }, []),
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
