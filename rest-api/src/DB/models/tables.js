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
    muteRole: {
        type: DataTypes.STRING,
        allowNull: true
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

Guilds.hasMany(Members);
Members.belongsTo(Guilds);

module.exports ={
    Guilds, Members
}