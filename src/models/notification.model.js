const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");

const Notification = sequelize.define(
  "notification",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    transaction_id: {
      type: DataTypes.INTEGER,
      references: { model: "transactions", key: "id" },
    },
    payload_received: { type: DataTypes.JSON },
    hash_received: { type: DataTypes.STRING(255) },
    hash_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    processed: { type: DataTypes.BOOLEAN, defaultValue: false },
    error_message: { type: DataTypes.TEXT },
    createdAt: { type: DataTypes.DATE, field: "created_at" },
    updatedAt: { type: DataTypes.DATE, field: "updated_at" },
  },
  {
    timestamps: true,
    tableName: "notifications",
  }
);

module.exports = Notification;
