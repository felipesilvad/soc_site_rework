module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('available', {
    url: DataTypes.STRING,
    provider: DataTypes.STRING
  })
  return Link
}
