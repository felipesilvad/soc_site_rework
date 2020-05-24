module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('publisher', {
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
  Publisher.associate = models => Publisher.belongsToMany(models.game, { through: 'Publisher_Game' })
  return Publisher
}
