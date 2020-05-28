module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('link', {
    url: DataTypes.STRING,
    provider: DataTypes.STRING
  })

  Link.associate = models => {
    Link.belongsTo(models.linkCategory)
  }
  return Link
}
