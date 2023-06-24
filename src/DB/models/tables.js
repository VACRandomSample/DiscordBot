const { DataTypes } = require('sequelize');
const sequelize = require('../initdb.js');

const Guilds = sequelize.define('Guilds', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    guildId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registeredAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

const Members = sequelize.define('Members', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    memberId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
});

module.exports ={
    Guilds, Members
}