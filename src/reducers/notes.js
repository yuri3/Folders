import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  SELECT_DELETE_NOTE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  MOVE_NOTE_IN_VIEW,
  UPDATE_NOTE_NAME_IN_VIEW,
  SEARCH_NOTES_REQUEST,
  SEARCH_NOTES_SUCCESS,
  SEARCH_NOTES_FAILURE
} from '../actions/notes';

const initialState = {
  loading: false,
  error: null,
  lists: [],
  deleteId: null,
  search: {
    isSearching: false,
    matchInTitles: {count: 0, rows: []},
    matchInTags: {count: 0, rows: []},
  }
};

export default (state = initialState, action) => {
  const {type, response, error, id, dragIndex, hoverIndex, newName} = action;
  switch(type) {
    case FETCH_NOTES_REQUEST:
      return {...state, loading: true, error: null, lists: []};
    case FETCH_NOTES_SUCCESS:
      return {...state, loading: false, error: null, lists: response};
    case FETCH_NOTES_FAILURE:
      return {...state, loading: false, error, lists: []};

    case CREATE_NOTE_REQUEST:
      return {...state, loading: true};
    case CREATE_NOTE_SUCCESS:
      return {...state, loading: false, error: null, lists: [response, ...state.lists]};
    case CREATE_NOTE_FAILURE:
      return {...state, loading: false, error};

    case SELECT_DELETE_NOTE:
      return {...state, deleteId: id};
    case DELETE_NOTE_REQUEST:
      return {...state, loading: true};
    case DELETE_NOTE_SUCCESS:
      return {...state, loading: false, error: null, lists: state.lists.filter(note => note.id !== response.id)};
    case DELETE_NOTE_FAILURE:
      return {...state, loading: false, error};

    case MOVE_NOTE_IN_VIEW:
      const dragNote = state.lists[dragIndex];
      const newCopyNotes = state.lists.slice();
      newCopyNotes.splice(dragIndex, 1);
      newCopyNotes.splice(hoverIndex, 0, dragNote);
      return {...state, error: null, lists: newCopyNotes};

    case UPDATE_NOTE_NAME_IN_VIEW:
      return {
        ...state,
        error: null,
        lists: state.lists.map(note => {
          if (note.id === id) {
            return {
              ...note,
              name: newName,
            };
          }
          return note;
        }),
      };

    case SEARCH_NOTES_REQUEST:
      return {...state, search: {...state.search, isSearching: true}};
    case SEARCH_NOTES_SUCCESS:
      return {
        ...state,
        search: {
          isSearching: false,
          matchInTitles: response.notes,
          matchInTags: response.tags ? response.tags : {count: 0, rows: []},
        },
      };
    case SEARCH_NOTES_FAILURE:
      return {...state, search: {...state.search, isSearching: false, error}};
    default:
      return state;
  }
};
