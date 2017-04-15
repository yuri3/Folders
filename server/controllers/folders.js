const Folder = require('../models').Folder;
const Note = require('../models').Note;
const Tag = require('../models').Tag;

module.exports = {
  create(req, res) {
    let promise;
    if(req.body.name === 'New Folder') {
      promise = Folder.create({
        name: req.body.name,
        parentId: req.body.parentId,
      });
    } else {
      promise = Folder.create({
        name: req.body.name,
      });
    }
    return promise
      .then(folder => res.status(201).send(folder))
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
  update(req, res) {
    return Folder.findById(req.body.id, {
      /*include: [{
        model: Note,
        as: 'notes',
        include: [{
          model: Tag,
          as: 'tags',
        }]
      }],*/
    })
      .then(folder => {
        if(!folder) {
          return res.status(404).send({
            message: 'Folder Not Found',
          });
        }
        return folder.update(req.body, {fields: Object.keys(req.body)})
          .then(() => res.status(200).send(folder))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Folder.findById(req.body.id)
      .then(folder => {
        if(!folder) {
          return res.status(404).send({
            message: 'Folder Not Found',
          });
        }
        return folder.destroy()
          .then(() => res.status(200).send({message: 'Folder deleted successfully.'}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
