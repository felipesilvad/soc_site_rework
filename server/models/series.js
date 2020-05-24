module.exports = (sequelize, DataTypes) => {
  const Series = sequelize.define('series', {
    slug: {
      type: DataTypes.STRING,
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

  Series.associate = models => Series.belongsToMany(models.game, { through: 'Series_Game' })
  return Series
}
