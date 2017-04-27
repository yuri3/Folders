import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  FETCH_NOTE_BY_ID_REQUEST,
  FETCH_NOTE_BY_ID_SUCCESS,
  FETCH_NOTE_BY_ID_FAILURE,
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAILURE,
  RESET_NOTE_STATUS_MESSAGES,
  UPDATE_NOTE_NAME_IN_VIEW,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  SELECT_DELETE_NOTE,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  MOVE_NOTE_IN_VIEW
} from '../actions/notes';

export const note = (state = {}, action) => {
  switch(action.type) {
    case FETCH_NOTE_BY_ID_SUCCESS:
    case UPDATE_NOTE_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export const notes = (state = [], action) => {
  switch(action.type) {
    case FETCH_NOTES_SUCCESS:
      return action.response;
    case CREATE_NOTE_SUCCESS:
      return [action.response, ...state];
    case DELETE_NOTE_SUCCESS:
      return state.filter((note) => note.id !== action.response.id);
    case MOVE_NOTE_IN_VIEW:
      const {dragIndex, hoverIndex} = action;
      const dragNote = state[dragIndex];
      const newCopyNotes = state.slice();
      newCopyNotes.splice(dragIndex, 1);
      newCopyNotes.splice(hoverIndex, 0, dragNote);
      return newCopyNotes;
    case UPDATE_NOTE_NAME_IN_VIEW:
      return state.map(note => {
        if(note.id === action.id) {
          return {
            ...note,
            name: action.newName,
          };
        }
        return note;
      });
    default:
      return state;
  }
};

export const noteOptions = (state = {
  isFetching: false,
  isFetchingById: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  successMsg: '',
  errorMsg: '',
  deleteId: null,
}, action) => {
  switch(action.type) {
    case FETCH_NOTES_REQUEST:
      return {...state, isFetching: true};
    case FETCH_NOTES_SUCCESS:
      return {...state, isFetching: false};
    case FETCH_NOTES_FAILURE:
      return {...state, isFetching: false, error: action.error};

    case FETCH_NOTE_BY_ID_REQUEST:
      return {...state, isFetchingById: true};
    case FETCH_NOTE_BY_ID_SUCCESS:
      return {...state, isFetchingById: false};
    case FETCH_NOTE_BY_ID_FAILURE:
      return {...state, isFetchingById: false, error: action.error};

    case CREATE_NOTE_REQUEST:
      return {...state, isCreating: true};
    case CREATE_NOTE_SUCCESS:
      return {...state, isCreating: false};
    case CREATE_NOTE_FAILURE:
      return {...state, isCreating: false, error: action.error};

    case UPDATE_NOTE_REQUEST:
      return {...state, isUpdating: true};
    case UPDATE_NOTE_SUCCESS:
      return {...state, isUpdating: false, successMsg: 'Update was made successfully!', errorMsg: ''};
    case UPDATE_NOTE_FAILURE:
      return {...state, isUpdating: false, errorMsg: action.error, successMsg: ''};
    case RESET_NOTE_STATUS_MESSAGES:
      return {...state, successMsg: '', errorMsg: ''};

    case SELECT_DELETE_NOTE:
      return {...state, deleteId: action.id};
    case DELETE_NOTE_REQUEST:
      return {...state, isDeleting: true};
    case DELETE_NOTE_SUCCESS:
      return {...state, isDeleting: false};
    case DELETE_NOTE_FAILURE:
      return {...state, isDeleting: false, error: action.error};
    default:
      return state;
  }
};
