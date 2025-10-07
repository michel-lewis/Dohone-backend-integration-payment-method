const { 
    Model,
    DataTypes,
} = require('sequelize')
const sequelize = require('../config/dbConnection')

const Bill = sequelize.define("bill", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    transaction_id: { 
      type: DataTypes.INTEGER, 
      references: { model: 'transactions', key: 'id' }
    },
    bill_ref: { type: DataTypes.STRING(50) },
    due_amount: { type: DataTypes.INTEGER },
    due_time: { type: DataTypes.DATE },
    bill_status: { type: DataTypes.STRING(10) },
    biller_id: { type: DataTypes.STRING(50) },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
  
}, {
    timestamps: true,
    tableName: 'bills'
})

module.exports = Bill