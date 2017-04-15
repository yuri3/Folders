module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
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
