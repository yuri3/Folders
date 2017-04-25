import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { folders, folderOptions } from './folders';
import { notes, note, noteOptions } from './notes';
import { tags, tagOptions } from './tags';

const rootReducer = combineReducers({
  folders,
  folderOptions,
  notes,
  noteOptions,
  note,
  tags,
  tagOptions,
  form: formReducer,
});

export default rootReducer;
