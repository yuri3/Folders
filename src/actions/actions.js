import uuidV1 from 'uuid/v1';

export const  SET_STATUS = 'SET_STATUS';
export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  }
};

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const createFolder = (parentId = '', name = 'New Folder') => ({
  type: CREATE_FOLDER,
  id: uuidV1(),
  parentId,
  name
});

export const SELECT_RENAME_INPUT = 'SELECT_RENAME_INPUT';
export const selectRenameInput = (id) => ({
  type: SELECT_RENAME_INPUT,
  id
});

export const RENAME_FOLDER = 'RENAME_FOLDER';
export const renameFolder = (id, newName) => ({
  type: RENAME_FOLDER,
  id,
  newName
});

export const REMOVE_FOLDER = 'REMOVE_FOLDER';
export const removeFolder = (id) => ({
  type: REMOVE_FOLDER,
  id
});
