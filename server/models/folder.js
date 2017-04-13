module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Folder.hasMany(models.Note, {
          foreignKey: 'folderId',
          as: 'notes',
        });
      },
    },
  });
  return Folder;
};
