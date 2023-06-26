const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const sequelize = require('./src/DB/initdb')
require('dotenv').config()
var figlet = require("figlet");

figlet("VAC-APP", { font: "banner4" }, (err, data) => {console.log(data)});

token = process.env.TOKEN

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildScheduledEvents
] });

client.commands = new Collection();
const commands = [];

const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commandFolders = fs.readdirSync('./src/commands')
for (let folder of commandFolders) {
	const commandFiles = fs
	.readdirSync(`./src/commands/${folder}`)
	.filter((file) => file.endsWith('.js'))
	for (const file of commandFiles){
		const command = require(`./src/commands/${folder}/${file}`)
		commands.push(command.data.toJSON());
		client.commands.set(command.data.name, command)
	}
	
}

const eventFolders = fs.readdirSync(`./src/events/`)

for (let folder of eventFolders) {
	const eventFiles = fs
	.readdirSync(`./src/events/${folder}`)
	.filter((file) => file.endsWith('.js'))
	for (const file of eventFiles){
		const event = require(`./src/events/${folder}/${file}`);
		if ('name' in event && 'execute' in event) {
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args, commands, client));
				// client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args, commands, client));
				// client.on(event.name, (...args) => event.execute(...args));
			}
		} else {
			console.log(`\u001b[1;32m[WARNING] The event at ${eventFiles} is missing a required "name" or "execute" property.\u001b[0m `);
		}
	}
}

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

client.login(token);