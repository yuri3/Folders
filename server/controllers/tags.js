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
  destroy(req, res) {
    return Tag.findOne({
      where: {
        noteId: req.params.noteId,
        id: req.body.id,
      },
    })
      .then(tag => {
        if(!tag) {
          return res.status(404).send({
            message: 'Tag Not Found',
          });
        }
        return tag.destroy()
          .then(() => res.status(200).send({message: 'Tag deleted successfully.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
