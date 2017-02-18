export const  SET_STATUS = 'SET_STATUS';
export const FOLDER_STATUS = {
  IS_CREATE_DONE: 'IS_CREATE_DONE',
  IS_RENAME_DONE: 'IS_RENAME_DONE',
  IS_REMOVE_DONE: 'IS_REMOVE_DONE'
}

export const SWITCH_RENAME_INPUT = 'SWITCH_RENAME_INPUT';

export const switchRenameInput = (id) => ({
  type: SWITCH_RENAME_INPUT,
  id
});

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  }
}

export const createFolder = (id, name) => {
  return {
    type: FOLDER_STATUS.IS_CREATE_DONE,
    id,
    name
  }
}; 

export const renameFolder = (id, newName) => {
  return {
    type: FOLDER_STATUS.IS_RENAME_DONE,
    id,
    newName
  }
};

export const removeFolder = (id) => {
  return {
    type: FOLDER_STATUS.IS_REMOVE_DONE,
    id
  }
};
