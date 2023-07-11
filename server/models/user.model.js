module.exports = function (sequelize, DataTypes) {
  return sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    is_active: {
      type: DataTypes.INTEGER,
      enum: [0, 1, 2],
      default: 0
    },
    role: {
      type: DataTypes.INTEGER,
      enum: [1, 2, 3, 4],
      default: 1
    },
    refresh_token: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    reset_token: {
      allowNull: true,
      type: DataTypes.STRING
    },
    reset_expiry_time: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
      default: Date.now
    },
    updatedAt: {
      type: DataTypes.DATE,
      default: Date.now
    }
  })
}
