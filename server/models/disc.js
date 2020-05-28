module.exports = (sequelize, DataTypes) => {
  const Disc = sequelize.define('disc', {
    number: DataTypes.INTEGER,
    body: DataTypes.STRING
  })

  Disc.associate = models => {
    Disc.belongsTo(models.ost)
  }
  return Disc
}
