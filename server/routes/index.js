const foldersController = require('../controllers').folders;
const notesController = require('../controllers').notes;
const tagsController = require('../controllers').tags;

module.exports = (app) => {
  app.post('/notes', foldersController.create);
  app.get('/notes', foldersController.list);

  app.post('/notes/:folderId', notesController.create);
  app.get('/notes/:folderId', notesController.list);

  app.post('/notes/:folderId/:noteId', tagsController.create);
  app.get('/notes/:folderId/:noteId', tagsController.list);
};
