import {CALL_API} from '../middleware/api';
//---FETCH_ALL_NOTES------------------------------------------------------------>
export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

const fetchNotes = (params) => ({
  [CALL_API]: {
    types: [FETCH_NOTES_REQUEST, FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILURE],
    endpoint: `notes/${params.folderId}`,
  }
});

export const fetchAllNotes = (params) => dispatch => {
  dispatch(fetchNotes(params));
};
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
//---CREATE_NOTE------------------------------------------------------------>
export const CREATE_NOTE_REQUEST = 'CREATE_NOTE_REQUEST';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAILURE = 'CREATE_NOTE_FAILURE';

const createNote = (folderId, requestOptions) => ({
  [CALL_API]: {
    types: [CREATE_NOTE_REQUEST, CREATE_NOTE_SUCCESS, CREATE_NOTE_FAILURE],
    endpoint: `notes/${folderId}`,
    requestOptions,
  }
});

export const createNewNote = (folderId, order, name = 'New Note') => dispatch => {
  dispatch(createNote(folderId, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({order, name, description: ''}),
  }));
};
//---UPDATE_NOTE------------------------------------------------------------>
export const RESET_NOTE_STATUS_MESSAGES = 'RESET_NOTE_STATUS_MESSAGES';
export const resetMessages = () => ({
  type: RESET_NOTE_STATUS_MESSAGES,
});

export const UPDATE_NOTE_NAME_IN_VIEW = 'UPDATE_NOTE_NAME_IN_VIEW';
export const updateNoteName = (id, newName) => ({
  type: UPDATE_NOTE_NAME_IN_VIEW,
  id,
  newName,
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
  }));
};
//---DELETE_NOTE------------------------------------------------------------>
export const SELECT_DELETE_NOTE = 'SELECT_DELETE_NOTE';
export const selectDeleteNote = (id) => ({
  type: SELECT_DELETE_NOTE,
  id,
});

export const DELETE_NOTE_REQUEST = 'DELETE_NOTE_REQUEST';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE';

const deleteNote = (requestOptions) => ({
  [CALL_API]: {
    types: [DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, DELETE_NOTE_FAILURE],
    endpoint: 'notes/:folderId',
    requestOptions,
  }
});

export const deleteSelectedNote = (id) => dispatch => {
  dispatch(selectDeleteNote(id));
  dispatch(deleteNote({
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id}),
  }));
};
//---MOVE_NOTE----------------------------------------------------------------->
export const MOVE_NOTE_IN_VIEW = 'MOVE_NOTE_IN_VIEW';

export const MOVE_NOTE_REQUEST = 'MOVE_NOTE_REQUEST';
export const MOVE_NOTE_SUCCESS = 'MOVE_NOTE_SUCCESS';
export const MOVE_NOTE_FAILURE = 'MOVE_NOTE_FAILURE';

const moveNote = (requestOptions) => ({
  [CALL_API]: {
    types: [MOVE_NOTE_REQUEST, MOVE_NOTE_SUCCESS, MOVE_NOTE_FAILURE],
    endpoint: `notes/:folderId/drag`,
    requestOptions,
  }
});

export const moveSelectedNote = (data) => dispatch => {
  if(Array.isArray(data)) {
    console.log('data', data);
    dispatch(moveNote({
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }));
  } else {
    dispatch({
      type: MOVE_NOTE_IN_VIEW,
      dragIndex: data.dragIndex,
      hoverIndex: data.hoverIndex,
    });
  }
};
