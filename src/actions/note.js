import {CALL_API} from '../middleware/api';
//---FETCH_NOTE_BY_ID------------------------------------------------------------>
export const FETCH_NOTE_BY_ID_REQUEST = 'FETCH_NOTE_BY_ID_REQUEST';
export const FETCH_NOTE_BY_ID_SUCCESS = 'FETCH_NOTE_BY_ID_SUCCESS';
export const FETCH_NOTE_BY_ID_FAILURE = 'FETCH_NOTE_BY_ID_FAILURE';

const fetchNote = (params) => ({
  [CALL_API]: {
    types: [FETCH_NOTE_BY_ID_REQUEST, FETCH_NOTE_BY_ID_SUCCESS, FETCH_NOTE_BY_ID_FAILURE],
    endpoint: `notes/${params.folderId}/${params.noteId}`,
  }
});

export const fetchNoteById = (params) => dispatch => {
  dispatch(fetchNote(params));
};
//---UPDATE_NOTE------------------------------------------------------------>
export const RESET_NOTE_STATUS_MESSAGES = 'RESET_NOTE_STATUS_MESSAGES';
export const resetMessages = () => ({
  type: RESET_NOTE_STATUS_MESSAGES,
});

export const UPDATE_NOTE_REQUEST = 'UPDATE_NOTE_REQUEST';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAILURE = 'UPDATE_NOTE_FAILURE';

const updateNote = (params, requestOptions) => ({
  [CALL_API]: {
    types: [UPDATE_NOTE_REQUEST, UPDATE_NOTE_SUCCESS, UPDATE_NOTE_FAILURE],
    endpoint: `notes/${params.folderId}/${params.noteId}`,
    requestOptions,
  }
});

export const updateSelectedNote = (params, data) => dispatch => {
  dispatch(updateNote(params, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  })).then(() => dispatch(resetMessages()));
};
