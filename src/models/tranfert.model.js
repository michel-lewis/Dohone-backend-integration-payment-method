const { 
    Model,
    DataTypes,
} = require('sequelize')
const sequelize = require('../config/dbConnection')

const Transfert = sequelize.define("transfert", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    transaction_id: { 
      type: DataTypes.INTEGER, 
      references: { model: 'transactions', key: 'id' }
    },
    recipient_phone: { type: DataTypes.STRING(20) },
    recipient_name: { type: DataTypes.STRING(100) },
    transfer_type: { type: DataTypes.STRING(50) },
    operator_reference: { type: DataTypes.STRING(100) },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
}, {
    timestamps: true,
    tableName: 'transferts'
})

module.exports = Transfert