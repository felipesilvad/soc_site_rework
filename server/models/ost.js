module.exports = (sequelize, DataTypes) => {
  const Ost = sequelize.define('ost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    cover: DataTypes.BLOB('long'),
    releaseDate: DataTypes.DATEONLY,
    label: DataTypes.STRING
  },
  {
    freezeTableName: true
  }
  )

  const Link = sequelize.define('link', {
    url: DataTypes.STRING,
    provider: DataTypes.STRING
  })

  const LinkCategory = sequelize.define('linkCategory', {
    title: DataTypes.STRING
  })

  const Disc = sequelize.define('disc', {
    number: DataTypes.INTEGER
  })

  const Track = sequelize.define('track', {
    number: DataTypes.INTEGER,
    length: DataTypes.STRING,
    name: DataTypes.STRING
  })

  Disc.hasMany(Track)

  LinkCategory.hasMany(Link)
  Ost.hasMany(LinkCategory)
  Ost.hasMany(Disc)

  Ost.associate = models => {
    Ost.belongsToMany(models.artist, { through: 'Ost_Artist' })
    Ost.belongsToMany(models.class, { through: 'Ost_Class' })
    Ost.belongsToMany(models.type, { through: 'Ost_Type' })
    Ost.belongsToMany(models.platform, { through: 'Ost_Platform' })
    Ost.belongsToMany(models.game, { through: 'Ost_Game' })
  }
  return Ost
}
