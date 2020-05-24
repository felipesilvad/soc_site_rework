module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('type', {
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

  Type.associate = models => Type.belongsToMany(models.ost, { through: 'Ost_Type' })
  return Type
}
