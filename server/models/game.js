module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    slug: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING

    },
    releaseDate: DataTypes.DATEONLY
  },
  {
    freezeTableName: true
  }
  )
  Game.associate = models => Game.belongsToMany(models.publisher, { through: 'Publisher_Game' })
  Game.associate = models => Game.belongsToMany(models.ost, { through: 'Ost_Game' })
  Game.associate = models => Game.belongsToMany(models.series, { through: 'Series_Game' })
  return Game
}
