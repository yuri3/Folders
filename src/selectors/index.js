import { createSelector } from 'reselect';

const getFolders = (state) => state.folders;

export const getSubFolders = createSelector(
  [getFolders],
  folders => folders.filter(folder => folder.parentId)
);

export const setSubFoldersId = createSelector(
  [getSubFolders],
  (subFolders) => {
    return subFolders.map(folder => {
      if(folder['id']) {return folder;}
      const subFoldersId = subFolders.reduce((maxId, folder) => Math.max(Number.parseInt(folder.id, 10), maxId), -1) + 1;
      folder.id = subFoldersId + 'a';
      return folder;
    });
  }
);
