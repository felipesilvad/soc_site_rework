module.exports = (sequelize, DataTypes) => {
  const Platform = sequelize.define('platform', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName: true
  }
  )

  Platform.associate = models => Platform.belongsToMany(models.ost, { through: 'Ost_Platform' })
  return Platform
}
