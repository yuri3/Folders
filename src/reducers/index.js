import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { folders, folderOptions } from './folder_Reducers';
import { notes, note, noteOptions } from './note_Reducers';

const rootReducer = combineReducers({
  folders,
  folderOptions,
  notes,
  noteOptions,
  note,
  form: formReducer,
});

export default rootReducer;
