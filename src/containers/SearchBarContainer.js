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
      searchText: '',
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
    const dataSource = matchInTitles.length > 0 || matchInTags.length > 0 ?
      [
        `${matchInTitles.length} match(es) in titl(es).`,
        `${matchInTags.length} match(es) in tag(s).`,
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
    const {notes, tags, searchNotes} = this.props;
    source !== 'touchTap' && searchNotes(notes, tags, value);
  }
  handleOnNewRequest(note, index) {
    const {history, handleToggle} = this.props;
    const {
      searchText,
      isInputChecked,
      matchInTitles,
      matchInTags
    } = this.state;
    if((index === 0 || index === -1) && (isInputChecked && matchInTitles.length > 0)) {
      history.push({
        pathname: `/notes/search`,
        search: `?type=titles&q=${searchText}`,
        state: {type: 'TITLES'}
      });
    } else if((index === 1) && (isInputChecked && matchInTags.length > 0)) {
      history.push({
        pathname: '/notes/search',
        search: `?type=tags&q=${searchText}`,
        state: {type: 'TAGS'}
      })
    } else {
      history.push(`/notes/${note.parentFolderId}/${note.id}`);
    }
    handleToggle();
  }
  render() {
    const {isInputChecked, dataSource} = this.state;
    const {notes} = this.props;
    return (
      <div style={style}>
        {isInputChecked &&
        <AutoComplete
          ref={(input) => this.input = input}
          floatingLabelText="Type to search..."
          fullWidth={true}
          maxSearchResults={3}
          filter={AutoComplete.noFilter}
          dataSource={dataSource}
          dataSourceConfig={{text: 'name', value: 'name'}}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleOnNewRequest}
          onBlur={() => this.input.state.searchText = ''}
        />}
        {!isInputChecked &&
        <AutoComplete
          ref={(input) => this.input = input}
          floatingLabelText="Type to search..."
          fullWidth={true}
          maxSearchResults={10}
          filter={(searchText, note) => (
            searchText !== '' &&
              (note.toUpperCase().indexOf(searchText.toUpperCase())) > -1
            )
          }
          dataSource={notes}
          dataSourceConfig={{text: 'name', value: 'name'}}
          onNewRequest={this.handleOnNewRequest}
          onBlur={() => this.input.state.searchText = ''}
        />}
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
    parentFolderId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    descriptions: PropTypes.string,
  })),
  tags: PropTypes.arrayOf(PropTypes.shape({
    parentNoteId: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  options: PropTypes.shape({
    foundNotes: PropTypes.shape({
      searchText: PropTypes.string.isRequired,
      matchInTitles: PropTypes.array.isRequired,
      matchInTags: PropTypes.array.isRequired,
      matchInDescriptions: PropTypes.array,
    }),
  }).isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  notes: state.notes,
  tags: state.tags,
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
