module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
