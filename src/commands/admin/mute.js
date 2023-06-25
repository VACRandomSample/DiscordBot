const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute member'),
	async execute(interaction) {
		await interaction.followUp('Pong!');
	},
};