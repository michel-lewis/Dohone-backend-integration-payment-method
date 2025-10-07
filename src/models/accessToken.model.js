const { 
    Model,
    DataTypes,
} = require('sequelize')
const sequelize = require('../config/dbConnection')

const AccessToken = sequelize.define('accessToken', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    access_token: { type: DataTypes.STRING(255), unique: true },
    token_type: { type: DataTypes.STRING(50), defaultValue: 'bearer' },
    refresh_token: { type: DataTypes.STRING(255) },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' }
}, {
    timestamps: true,
    tableName: 'access_tokens'
})

module.exports = AccessToken

