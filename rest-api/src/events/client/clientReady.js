const { Routes, REST, Events, ActivityType } = require('discord.js');
const {Guilds, Members} = require('../../DB/models/tables.js');
require("dotenv").config();

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client, commands) {        
        
        client.guilds.fetch()
        .then(async(guilds) => {
            
            guilds.forEach(async(guild) => {
                
                const guildDB = await Guilds.findOrCreate({
                    where:{
                        guildId: guild.id
                    },
                    defaults: {
                        guildId: guild.id
                    }
                })
                const guildMembers = await client.guilds.cache.get(guild.id)
                const members = await guildMembers.members.fetch()

                members.forEach(async(member) => {

                    const roles = member.roles.cache
                                .filter((roles)=> roles.id)
                                .map((role)=> role.toString())

                    const memberDB = await Members.findOrCreate({
                        where:{
                            memberId: member.id,
                            GuildId: guildDB[0].id
                        },
                        defaults: {
                            memberId: member.id,
                            roles: roles,
                            GuildId: guildDB[0].id
                        }
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
        
        // Назначение статуса
        async function executeInInterval(interval) {
            
            let index = 0;
            const dataArray = await run()

            setInterval(() => {
                
                run(index)

                index++;

                if (index >= dataArray.length) {
                    index = 0; // Начать сначала, если массив кончился
                }
            }, interval);
        }

        async function run(index) {
            const countGuilds = await Guilds.count();
            const countMembers = await Members.count();

            const dataArray = [`${countGuilds} сервера`, `${countMembers} участника`];
            
            client.user.setActivity(dataArray[index], { type: ActivityType.Watching  });
            console.log(`Set status to ${dataArray[index]}`); // Выполнение операций над данными

            return dataArray
        }

        const intervalInMilliseconds = 30000; // 30 секунды

        await executeInInterval(intervalInMilliseconds);   
    }
}