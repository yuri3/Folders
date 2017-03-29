import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/actions';

const style = {
  padding: '10px',
};

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isInputChecked: true,
      searchText: [],
      matchInTitles: [],
      matchInTags: [],
      matchInDescriptions: [],
    };
    this.handleOnToggle = this.handleOnToggle.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleOnNewRequest = this.handleOnNewRequest.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const {options: {foundNotes}} = nextProps;
    const {searchText, matchInTitles, matchInTags} = foundNotes;
    const matchInTitlesLength = matchInTitles.length;
    const matchInTagsLength = matchInTags.length;
    const dataSource = matchInTitlesLength > 0 || matchInTagsLength > 0 ?
      [
        `${matchInTitlesLength} match(es) in titl(es).`,
        `${matchInTagsLength} match(es) in tag(s).`,
      ] : [];
      this.setState({
        ...this.state,
        searchText,
        matchInTitles,
        matchInTags,
        dataSource,
      });
  }
  handleOnToggle(event, isInputChecked) {
    this.setState({isInputChecked});
  }
  handleUpdateInput(value, arr, params) {
    const {source} = params;
    const {notes, searchNote} = this.props;
    source !== 'touchTap' && searchNote(notes, value);
  }
  handleOnNewRequest(note, index) {
    const {history, handleToggle} = this.props;
    const {
      searchText,
      isInputChecked,
      matchInTitles
    } = this.state;
    if(index === 0 || index === -1 && (isInputChecked && matchInTitles.length > 0)) {
      console.log('titles');
      history.push({
        pathname: `/notes/search`,
        search: `?type=titles&q=${searchText}`,
        state: {type: 'TITLES'}
      });
    } else {
      console.log('fsdffd');
      history.push(`/notes/${note.parentId}/${note.id}`);
    }
    handleToggle();
  }
  render() {
    const {isInputChecked, dataSource} = this.state;
    const {notes} = this.props;
    return (
      <div style={style}>
        <AutoComplete
          ref={(input) => this.input = input}
          floatingLabelText="Type to search..."
          fullWidth={true}
          maxSearchResults={isInputChecked ? 2 : 10}
          filter={isInputChecked ? AutoComplete.noFilter :
            (searchText, note) => (
              searchText !== '' &&
                (note.toUpperCase().indexOf(searchText.toUpperCase())) > -1
            )
          }
          dataSource={isInputChecked ? dataSource : notes}
          dataSourceConfig={{text: 'name', value: 'name'}}
          onUpdateInput={isInputChecked ? this.handleUpdateInput : () => {}}
          onNewRequest={this.handleOnNewRequest}
          onBlur={() => this.input.state.searchText = ''}
        />
        <Toggle
          label="Deep Search..."
          labelPosition="right"
          defaultToggled={true}
          onToggle={this.handleOnToggle}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.string,
    descriptions: PropTypes.string,
  })),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
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

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBarContainer;
