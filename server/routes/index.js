const foldersController = require('../controllers').folders;
const notesController = require('../controllers').notes;
const tagsController = require('../controllers').tags;

module.exports = (app) => {
  app.post('/notes', foldersController.create);
  app.get('/notes', foldersController.list);
  app.put('/notes', foldersController.update);
  app.delete('/notes', foldersController.destroy);

  app.post('/notes/:folderId', notesController.create);
  app.get('/notes/:folderId', notesController.list);
  app.delete('/notes/:folderId', notesController.destroy);

  app.get('/notes/:folderId/:noteId', notesController.retrieve);
  app.put('/notes/:folderId/:noteId', notesController.update);
  app.post('/notes/:folderId/:noteId', tagsController.create);
  //app.get('/notes/:folderId/:noteId', tagsController.list);
  app.delete('/notes/:folderId/:noteId', tagsController.destroy);
};
