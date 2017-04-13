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
};
