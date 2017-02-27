import { createSelector } from 'reselect';

const getFolders = (state) => state.folders;

export const getSubFolders = createSelector(
  [getFolders],
  folders => folders.filter(folder => folder.parentId)
);
