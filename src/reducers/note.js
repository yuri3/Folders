import {
  FETCH_NOTE_BY_ID_REQUEST,
  FETCH_NOTE_BY_ID_SUCCESS,
  FETCH_NOTE_BY_ID_FAILURE,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAILURE,
  RESET_NOTE_STATUS_MESSAGES,
} from '../actions/note';

const initialState = {
  loading: false,
  error: '',
  currentNote: {},
  success: '',
};

export default (state = initialState, action) => {
  const {type, response, error} = action;
  switch(type) {
    case FETCH_NOTE_BY_ID_REQUEST:
      return {...state, loading: true, error: '', currentNote: {}};
    case FETCH_NOTE_BY_ID_SUCCESS:
      return {...state, loading: false, error: '', currentNote: response};
    case FETCH_NOTE_BY_ID_FAILURE:
      return {...state, loading: false, error, currentNote: {}};

    case UPDATE_NOTE_REQUEST:
      return {...state, loading: true};
    case UPDATE_NOTE_SUCCESS:
      return {...state, loading: false, error: '', currentNote: response, success: 'Update was made successfully!'};
    case UPDATE_NOTE_FAILURE:
      return {...state, loading: false, error, success: ''};

    case RESET_NOTE_STATUS_MESSAGES:
      return {...state, success: initialState.success, error: initialState.error};

    default:
      return state;
  }
};
