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

export const CHANGE_NOTE_NAME = 'CHANGE_NOTE_NAME';
export const changeNoteName = (parentId, id, newName) => ({
  type: CHANGE_NOTE_NAME,
  parentId,
  id,
  newName,
});

export const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
export const changeDescription = (parentId, id, description) => ({
  type: CHANGE_DESCRIPTION,
  parentId,
  id,
  description,
});

export const MOVE_NOTE = 'MOVE_NOTE';
export const moveNote = (parentId, dragIndex, hoverIndex) => ({
  type: MOVE_NOTE,
  parentId,
  dragIndex,
  hoverIndex,
});
