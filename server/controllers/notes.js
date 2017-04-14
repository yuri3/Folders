const Note = require('../models').Note;
const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    return Note.create({
      name: req.body.name,
      description: req.body.description,
      folderId: req.params.folderId,
    })
      .then(notes => res.status(201).send(notes))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Note.findAll({
      where: {
        folderId: req.params.folderId,
      },
      include: [{
        model: Tag,
        as: 'tags',
      }],
    })
      .then(notes => res.status(200).send(notes))
      .catch(error => res.status(400).send(error))
  },
  retrieve(req, res) {
    return Note.findOne({
      where: {
        folderId: req.params.folderId,
        id: req.params.noteId,
      },
      include: [{
        model: Tag,
        as: 'tags',
      }],
    })
      .then(note => {
        if(!note) {
          return res.status(404).send({
            message: 'Note Not Found',
          });
        }
        return res.status(200).send(note);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Note.findOne({
      where: {
        folderId: req.params.folderId,
        id: req.params.noteId,
      },
      include: [{
        model: Tag,
        as: 'tags',
      }],
    })
      .then(note => {
        if(!note) {
          return res.status(404).send({
            message: 'Note Not Found',
          });
        }
        return note.update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(note))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Note.findOne({
      where: {
        folderId: req.params.folderId,
        id: req.body.id,
      },
    })
      .then(note => {
        if(!note) {
          return res.status(404).send({
            message: 'Note Not Found',
          });
        }
        return note.destroy()
          .then(() => res.status(200).send({message: 'Note deleted successfully.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
