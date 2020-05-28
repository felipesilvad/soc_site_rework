module.exports = (sequelize, DataTypes) => {
  const LinkCategory = sequelize.define('linkCategory', {
    title: DataTypes.STRING
  })

  LinkCategory.associate = models => {
    LinkCategory.hasMany(models.link)
    LinkCategory.belongsTo(models.ost)
  }
  return LinkCategory
}
