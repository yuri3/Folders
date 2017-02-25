export const  SET_STATUS = 'SET_STATUS';

export const FOLDER_STATUS = {
  IS_CREATE_DONE: 'IS_CREATE_DONE',
  IS_RENAME_DONE: 'IS_RENAME_DONE',
  IS_REMOVE_DONE: 'IS_REMOVE_DONE'
};

export const CREATE_FOLDER = 'CREATE_FOLDER';
export const SELECT_RENAME_INPUT = 'SELECT_RENAME_INPUT';
export const REMOVE_FOLDER = 'REMOVE_FOLDER';
/*
function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = {type};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
      if(action.type === CREATE_FOLDER && !action.name) {action.name = 'New Folder';}
    });
    return action;
  }
}

export const setStatus = makeActionCreator(SET_STATUS, 'status');
export const createFolder = makeActionCreator(CREATE_FOLDER, 'id', 'name');
export const selectRenameInput = makeActionCreator(SELECT_RENAME_INPUT, 'id');
export const renameFolder = makeActionCreator(FOLDER_STATUS.IS_RENAME_DONE, 'id', 'newName');
export const removeFolder = makeActionCreator(FOLDER_STATUS.IS_REMOVE_DONE, 'id');
*/
export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  }
};

export const createFolder = (id, name = 'New Folder') => ({
  type: CREATE_FOLDER,
  id,
  name
});

export const selectRenameInput = (id) => ({
  type: SELECT_RENAME_INPUT,
  id
});

export const renameFolder = (id, newName) => ({
  type: FOLDER_STATUS.IS_RENAME_DONE,
  id,
  newName
});

export const removeFolder = (id) => ({
  type: REMOVE_FOLDER,
  id
});