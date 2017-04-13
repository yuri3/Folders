module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Note.belongsTo(models.Folder, {
          foreignKey: 'folderId',
          onDelete: 'CASCADE',
        });
        Note.hasMany(models.Tag, {
          foreignKey: 'noteId',
          as: 'tags',
        });
      },
    },
  });
  return Note;
};
