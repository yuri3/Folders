const Folder = require('../models').Folder;
const Note = require('../models').Note;
const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    return Folder.create({
      name: req.body.name,
    })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Folder.findAll({
      /*include: [{
        model: Note,
        as: 'notes',
        include: [{
          model: Tag,
          as: 'tags',
        }]
      }],*/
    })
      .then(folders => res.status(200).send(folders))
      .catch(error => res.status(400).send(error));
  },

};
