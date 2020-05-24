module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('class', {
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

  Class.associate = models => Class.belongsToMany(models.ost, { through: 'Ost_Class' })
  return Class
}
