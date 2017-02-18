

export const  SET_STATUS = 'SET_STATUS';
export const STATUS = {
  IS_CREATE_DONE: 'IS_CREATE_DONE',
  IS_RENAME: 'IS_RENAME',
  IS_RENAME_DONE: 'IS_RENAME_DONE',
  IS_RENAME_CANCEL: 'IS_RENAME_CANCEL',
  IS_REMOVE_DONE: 'IS_REMOVE_DONE'
}

export const CREATE_SUBFOLDER = 'CREATE_SUBFOLDER';

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status,
  }
}

export const createFolder = (id, name) => {
  return {
    type: STATUS.IS_CREATE_DONE,
    id,
    name
  }
}; 

export const isRename = (id) => {
  return {
    type: STATUS.IS_RENAME,
    id,
  }
}

export const isRenameCancel = () => {
  return {
    type: STATUS.IS_RENAME_CANCEL,
  }
}

export const renameFolder = (id, newName) => {
  return {
    type: STATUS.IS_RENAME_DONE,
    id,
    newName
  }
};

export const removeFolder = (id) => {
  return {
    type: STATUS.IS_REMOVE_DONE,
    id
  }
};

export const createSubFolder = (parentFolderId, name) => {
  return {
    type: CREATE_SUBFOLDER,
    parentFolderId,
    name
  }
};
