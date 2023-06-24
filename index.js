const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config()
var figlet = require("figlet");
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

const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`\u001b[1;32m[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.\u001b[0m `);
	}
}

const eventFolders = fs.readdirSync(`./src/events/`)

for (let folder of eventFolders) {
	const eventFiles = fs
	.readdirSync(`./src/events/${folder}`)
	.filter((file) => file.endsWith('.js'))
	for (const file of eventFiles){
		const event = require(`./src/events/${folder}/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, commands, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, commands, client));
		}
	}
}

figlet("VAC-LOGGING", { font: "banner4" }, (err, data) => {console.log(data)})

client.once(Events.ClientReady, c => {
	console.log(`\u001b[1;34mReady! Logged in as ${c.user.tag}\u001b[0m`);
});

// Log in to Discord with your client's token
client.login(token);