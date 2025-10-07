const { 
    Model,
    DataTypes,
} = require('sequelize')
const sequelize = require('../config/dbConnection')


const Transaction = sequelize.define(  'transaction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    issuertrxref: { type: DataTypes.STRING(50), unique: true, allowNull: false },
    acquirertrxref: { type: DataTypes.STRING(50) },
    intent: { type: DataTypes.STRING(20), allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    currency: { type: DataTypes.STRING(5), defaultValue: 'XAF' },
    customer_phone: { type: DataTypes.STRING(20) },
    operator: { type: DataTypes.STRING(50) },
    status: { 
      type: DataTypes.ENUM('INITIATED', 'PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'),
      defaultValue: 'INITIATED'
    },
    description: { type: DataTypes.TEXT },
    notify_url: { type: DataTypes.TEXT },
    transaction_data: { type: DataTypes.JSON },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' } 
}, {
    timestamps: true,
    tableName: 'transactions'
})

module.exports = Transaction
