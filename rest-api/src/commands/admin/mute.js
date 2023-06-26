const { SlashCommandBuilder } = require('discord.js');
const { setAsyncTimer } = require('../../utils/timer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mute')
		.setDescription('Mute member'),
	async execute(interaction) {
		// Пример использования
		const delayInMilliseconds = 60000; // 1 минута
		const timer = setAsyncTimer(delayInMilliseconds);

		await interaction.followUp(`User was muted ${delayInMilliseconds}`);
		console.log(interaction);
	},
};