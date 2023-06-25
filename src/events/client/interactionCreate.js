const { Events } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	// once: true,
	async execute(interaction, client) {
        const commands = interaction.client.commands.get(interaction.commandName)

        if (interaction.isChatInputCommand()) {
            await interaction.deferReply({ephemeral: true})

		    if (!commands) return interaction.followUp({content:"Данной команды больше не существует"}) && client.commands.delete(interaction.commandName)
            // console.log(commands)
            if (commands.permission) {
                const authorPerms = interaction.channel.permissionsFor(interaction.member)
                if (!authorPerms || !authorPerms.has(commands.permission) || interaction.member.id == "372421007736307712"){
                    return interaction.followUp({content: `У вас нет прав`, ephemeral: true})
                }
            }
            await commands.execute(interaction, client)
        } 
        // else if (interaction.isButton()) {
        //     if (interaction.customId.includes('-button')) {
        //         if (interaction.customId.includes('voice')) {
        //             console.log(interaction.user.tag)
                    
        //             if (!interaction.member.voice.channel) { 
        //                 await interaction.reply({content:'Вы не находитесь в **голосовом канале**', ephemeral: true})
        //             } else {
        //                 const roomDB = await roomRaw.findOne({ channelid: interaction.member.voice.channel.id })
        //                 if (roomDB.userid == interaction.member.id) {
        //                     if (interaction.customId.includes('voice_lock')) {
        //                         await interaction.reply({
        //                             content: 'Отметьте **пользователя** которого хотите замутить\размутить', 
        //                             ephemeral: true
        //                         }).then(async() => {
        //                             await interaction.user.voice.channelId.permissionOverwrites.edit(interaction.guild.everyone.id, {
        //                                 SEND_MESSAGES: false,
        //                                 READ_MESSAGE_HISTORY: false,
        //                                 ATTACH_FILES: false
        //                             });
        //                         })
        //                     } else if (interaction.customId.includes('voice_mute')) {
        //                         await interaction.reply({
        //                             content: 'Отметьте **пользователя** которого хотите замутить/размутить', 
        //                             ephemeral: true
        //                         }).then(() => {
        //                             const filter = m => m.mentions.users.first() && m.author.id === interaction.user.id
        //                             const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 })
        //                             collector.on('collect', async m => {
                                        
        //                                 const person = m.mentions.members.first()
        //                                 if (person.voice.serverMute) {
        //                                     await person.voice.setMute(0)
        //                                 } else if (!person.voice.serverMute) {
        //                                     await person.voice.setMute(1)
        //                                 }
        //                             })
        //                             collector.on('ignore', collected => {
        //                                 console.log(`Collected ${collected.size} items`)
        //                             })
        //                         })
        //                     } else if (interaction.customId.includes('voice_edit')) {
        //                         await interaction.reply({content:`Введите название комнаты`, ephemeral: true})
        //                         .then(()=>{
        //                             const filter = m => m.author.id === interaction.user.id
        //                             const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 })
        //                             collector.on('collect', async m => {
        //                                 await m.member.voice.channel.setName(`${m.content}`)
        //                             })
        //                             collector.on('ignore', collected => {
        //                                 console.log(`Collected ${collected.size} items`)
        //                             })
        //                         })
        //                     } else if (interaction.customId.includes('voice_hide')) {
        //                         await interaction.reply({content:`test`, ephemeral: true})
        //                     } else if (interaction.customId.includes('voice_crown')) {
        //                         await interaction.reply({
        //                             content: 'Отметьте **пользователя** которому хотите передать права канала', 
        //                             ephemeral: true
        //                         }).then(() => {
        //                             const filter = m => m.mentions.users.first() && m.author.id === interaction.user.id
        //                             const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 })
        //                             collector.on('collect', async m => {
        //                                 await roomRaw.findOneAndUpdate({ channelid: interaction.member.voice.channel.id }, 
        //                                     { 'userid': m.mentions.users.first().id }
        //                                     )
        //                             })
        //                             collector.on('ignore', collected => {
        //                                 console.log(`Collected ${collected.size} items`)
        //                             })
        //                         })
        //                     } else if (interaction.customId.includes('voice_limit')) {
        //                         await interaction.reply({content:`Введите число участников`, ephemeral: true})
        //                         .then(()=>{
        //                             const filter = m => m.author.id === interaction.user.id
        //                             const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 })
                                
        //                             collector.on('collect', async m => {
        //                                 try {
        //                                     await m.member.voice.channel.setUserLimit(m.content)
        //                                 } catch(e) {
        //                                     // console.log(e)
        //                                     interaction.editReply({content:`Введено не число`})
        //                                 }
                                        
        //                             })
        //                             collector.on('ignore', collected => {
        //                                 console.log(`Collected ${collected.size} items`)
        //                             })
        //                         })
        //                     } else if (interaction.customId.includes('voice_kick')) {
        //                             await interaction.reply({content:`Отметьте пользователся которого хотите выгнать`, ephemeral: true}).then(() => {
        //                                 const filter = m => m.mentions.members.first() && m.author.id === interaction.user.id
        //                                 const collector = interaction.channel.createMessageCollector({ filter, time: 15000, max: 1 })
        //                                 collector.on('collect', async m => {
        //                                     m.mentions.members.first().voice.disconnect()
        //                                     interaction.editReply({content: `${m.mentions.members.first().nickname} был выгнан`})
        //                                 })
        //                                 collector.on('ignore', collected => {
        //                                     console.log(`Collected ${collected.size} items`)
        //                                 })
        //                             })
        //                     } else if (interaction.customId.includes('voice_user')) {

        //                     }
        //                 } else {
        //                     await interaction.reply({content:'Вы не владелец комнаты', ephemeral: true})
        //                 }
        //         }
                        
        //         }
        //     }
	    // } 
        // else if (interaction.isUserContextMenuCommand()) {
            
            
        //     // console.log(commands)
        //     if(!commands) return
        //     try{
        //         await commands.execute(interaction, client)
        //     } catch(e) {
        //         console.error(e)
        //     }
        //     // await interaction.deferReply({ ephemeral: true })
        //     // const command = interaction.client.commands.get(interaction.commandName)
        //     // console.log(command)
        //     // if (command) {
        //     //     console.log(`obj1ect`)
        //     //     command.execute(client, interaction)
        //     // }
        // } 
    }
}
