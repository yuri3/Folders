import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { folders, folderOptions } from './folder_Reducers';

const rootReducer = combineReducers({
  folders,
  folderOptions,
  form: formReducer,
});

export default rootReducer;
