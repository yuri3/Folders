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
  isFetchingById: false,
  isUpdating: false,
  error: null,
  note: {},
  successMsg: null,
};

export default (state = initialState, action) => {
  const {type, response, error} = action;
  switch(type) {
    case FETCH_NOTE_BY_ID_REQUEST:
      return {...state, isFetchingById: true, error: null, note: {}};
    case FETCH_NOTE_BY_ID_SUCCESS:
      return {...state, isFetchingById: false, error: null, note: response};
    case FETCH_NOTE_BY_ID_FAILURE:
      return {...state, isFetchingById: false, error, note: {}};

    case UPDATE_NOTE_REQUEST:
      return {...state, isUpdating: true};
    case UPDATE_NOTE_SUCCESS:
      return {...state, isUpdating: false, error: null, note: response, successMsg: 'Update was made successfully!'};
    case UPDATE_NOTE_FAILURE:
      return {...state, isUpdating: false, error, successMsg: null};

    case RESET_NOTE_STATUS_MESSAGES:
      return {...state, successMsg: null, error: null};

    default:
      return state;
  }
};
