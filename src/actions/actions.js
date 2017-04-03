import uuidV1 from 'uuid/v1';

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const createFolder = (parentId = '', name = 'New Folder') => ({
  type: CREATE_FOLDER,
  id: uuidV1(),
  parentId,
  name,
});

export const SELECT_RENAME_INPUT = 'SELECT_RENAME_INPUT';
export const selectRenameInput = (id) => ({
  type: SELECT_RENAME_INPUT,
  id,
});

export const RENAME_FOLDER = 'RENAME_FOLDER';
export const renameFolder = (id, newName) => ({
  type: RENAME_FOLDER,
  id,
  newName,
});

export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export const removeFolder = (id) => ({
  type: REMOVE_FOLDER,
  id,
});

export const MOVE_FOLDER = 'MOVE_FOLDER';
export const moveFolder = (dragIndex, hoverIndex) => ({
  type: MOVE_FOLDER,
  dragIndex,
  hoverIndex,
});

//---NOTES---------------------------------------------------------->
export const CREATE_NOTE = 'CREATE_NOTE';
export const createNote = (parentFolderId, name = 'New Note') => ({
  type: CREATE_NOTE,
  id: uuidV1(),
  parentFolderId,
  name,
});

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const removeNote = (id) => ({
  type: REMOVE_NOTE,
  id,
});

export const CHANGE_NOTE_NAME = 'CHANGE_NOTE_NAME';
export const changeNoteName = (id, newName) => ({
  type: CHANGE_NOTE_NAME,
  id,
  newName,
});

export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const changeDescription = (id, description) => ({
  type: CHANGE_DESCRIPTION,
  id,
  description,
});

export const UPDATE_TAG_FLAG = 'UPDATE_TAG_FLAG';
export const updateTagFlag = (id) => ({
  type: UPDATE_TAG_FLAG,
  id,
});

export const SEARCH_NOTES = 'SEARCH_NOTES';
export const searchNotes = (notes, tags, searchText) => ({
  type: SEARCH_NOTES,
  notes,
  tags,
  searchText,
});

export const MOVE_NOTE = 'MOVE_NOTE';
export const moveNote = (dragIndex, hoverIndex) => ({
  type: MOVE_NOTE,
  dragIndex,
  hoverIndex,
});

//---TAGS---------------------------------------------------------------->
export const ADD_TAG = 'ADD_TAG';
export const addTag = (parentNoteId, label) => ({
  type: ADD_TAG,
  parentNoteId,
  key: uuidV1(),
  label,
});

export const REMOVE_TAG = 'REMOVE_TAG';
export const removeTag = (key, parentNoteId) => ({
  type: REMOVE_TAG,
  key,
  parentNoteId,
});
