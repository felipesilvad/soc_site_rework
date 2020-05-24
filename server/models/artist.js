module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('artist', {
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

  Artist.associate = models => Artist.belongsToMany(models.ost, { through: 'Ost_Artist' })
  return Artist
}
