const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    return Tag.create({
      label: req.body.label,
      noteId: req.params.noteId,
    })
      .then(tags => res.status(201).send(tags))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Tag.findAll({
      where: {
        noteId: req.params.noteId,
      },
    })
      .then(tags => res.status(200).send(tags))
      .catch(error => res.status(400).send(error))
  },
};
