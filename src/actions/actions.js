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
export const createNote = (parentId, name = 'New Note') => ({
  type: CREATE_NOTE,
  id: uuidV1(),
  parentId,
  name,
});

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const removeNote = (parentId, id) => ({
  type: REMOVE_NOTE,
  parentId,
  id,
});

export const REMOVE_FOUND_NOTE = 'REMOVE_FOUND_NOTE';
export const removeFoundNote = (id) => ({
  type: REMOVE_FOUND_NOTE,
  id,
});

export const CHANGE_NOTE_NAME = 'CHANGE_NOTE_NAME';
export const changeNoteName = (parentId, id, newName) => ({
  type: CHANGE_NOTE_NAME,
  parentId,
  id,
  newName,
});

export const ADD_TAG = 'ADD_TAG';
export const addTag = (parentId, id, label) => ({
  type: ADD_TAG,
  parentId,
  id,
  key: uuidV1(),
  label,
});

export const REMOVE_TAG = 'REMOVE_TAG';
export const removeTag = (parentId, id, key) => ({
  type: REMOVE_TAG,
  parentId,
  id,
  key,
});

export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const changeDescription = (parentId, id, description) => ({
  type: CHANGE_DESCRIPTION,
  parentId,
  id,
  description,
});

export const SEARCH_NOTES = 'SEARCH_NOTES';
export const searchNotes = (notes, searchText) => ({
  type: SEARCH_NOTES,
  notes,
  searchText,
});

export const SEARCH_NOTES_BY_TAG = 'SEARCH_NOTES_BY_TAG';
export const searchNotesByTag = (notes, label) => ({
  type: SEARCH_NOTES_BY_TAG,
  notes,
  label,
});

export const MOVE_NOTE = 'MOVE_NOTE';
export const moveNote = (dragIndex, hoverIndex, parentId) => ({
  type: MOVE_NOTE,
  dragIndex,
  hoverIndex,
  parentId,
});

export const MOVE_FOUND_NOTE = 'MOVE_FOUND_NOTE';
export const moveFoundNote = (dragIndex, hoverIndex) => ({
  type: MOVE_FOUND_NOTE,
  dragIndex,
  hoverIndex,
});

export const MOVE_FOUND_NOTE_BY_TAG = 'MOVE_FOUND_NOTE_BY_TAG';
export const moveFoundNoteByTag = (dragIndexByTag, hoverIndexByTag) => ({
  type: MOVE_FOUND_NOTE_BY_TAG,
  dragIndexByTag,
  hoverIndexByTag,
});
