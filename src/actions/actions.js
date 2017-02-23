export const  SET_STATUS = 'SET_STATUS';

export const FOLDER_STATUS = {
  IS_CREATE_DONE: 'IS_CREATE_DONE',
  IS_RENAME_DONE: 'IS_RENAME_DONE',
  IS_REMOVE_DONE: 'IS_REMOVE_DONE'
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  }
};

export const CREATE_FOLDER = 'CREATE_FOLDER';

export const createFolder = (id, name = 'New Folder') => ({
  type: CREATE_FOLDER,
  id,
  name
});

export const SELECT_RENAME_INPUT = 'SELECT_RENAME_INPUT';

export const selectRenameInput = (id) => ({
  type: SELECT_RENAME_INPUT,
  id
});

export const renameFolder = (id, newName) => ({
  type: FOLDER_STATUS.IS_RENAME_DONE,
  id,
  newName
});

export const REMOVE_FOLDER = 'REMOVE_FOLDER';

export const removeFolder = (id) => ({
  type: REMOVE_FOLDER,
  id
});