const { Routes, REST, Events } = require('discord.js');
const {Guilds, Members} = require('../../DB/models/tables.js');
const sequelize = require('../../DB/initdb.js');
require("dotenv").config();

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client, commands) {
        // Сброс таблиц и их создание
        
        (async () => {
            console.log('\u001b[1;36m#DROP DATABASE\u001b[0m');
            try {
                await sequelize.drop();
                console.log('\u001b[1;36m#DB DATABASE droped\u001b[0m')
            } catch (error) {
                console.error(`\u001b[1;31m#DB ERROR DROP DATABASE:\u001b[0m`, error);
            } 
        })();

        (async () => {
            try {
                await sequelize.sync({ force: true });
                
                console.log('\u001b[1;36m#DB TABLES ["Guilds", "Members"] created successfully.\u001b[0m');
            } catch (error) {
                console.error('\u001b[1;31m#ERROR creating tables:\u001b[0m', error);
            }
        })();

        client.guilds.fetch()
        .then(async(guilds) => {
            
            guilds.forEach(async(guild) => {
                
                const guildDB = await Guilds.create({
                    guildId: guild.id
                })

                const guildMembers = await client.guilds.cache.get(guild.id)
                const members = await guildMembers.members.fetch()

                members.forEach(async(member) => {

                    const roles = member.roles.cache
                                .filter((roles)=> roles.id)
                                .map((role)=> role.toString())

                    const memberDB = await Members.create({
                        memberId: member.id,
                        roles: roles,
                        GuildId: guildDB.id
                    })
                })
            })
        })

        const clientId = '1121927650798211233'
        // const guildId = '994559651951689838'
        
        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        
        (async () => {
            try {
                await rest.put(
                    // Routes.applicationGuildCommands(clientId, guildId),
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
                console.log('\u001b[1;32mSuccessfully reloaded application (/) commands.\u001b[0m');
                console.log(`\u001b[1;44mReady! Logged in as ${client.user.tag}\u001b[0m`);
            } catch (error) {
                console.error(error);
            }
        })();        
    }
}