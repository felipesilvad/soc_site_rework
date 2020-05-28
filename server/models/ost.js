module.exports = (sequelize, DataTypes) => {
  const Ost = sequelize.define('ost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    releaseDate: DataTypes.DATEONLY,
    label: DataTypes.STRING
  },
  {
    freezeTableName: true
  }
  )

  Ost.associate = models => {
    Ost.belongsToMany(models.artist, { through: 'Ost_Artist' })
    Ost.belongsToMany(models.class, { through: 'Ost_Class' })
    Ost.belongsToMany(models.type, { through: 'Ost_Type' })
    Ost.belongsToMany(models.platform, { through: 'Ost_Platform' })
    Ost.belongsToMany(models.game, { through: 'Ost_Game' })
    Ost.hasMany(models.disc)
    Ost.hasMany(models.linkCategory)
    Ost.belongsToMany(Ost, { through: 'related_ost', as: 'related' })
  }
  return Ost
}
