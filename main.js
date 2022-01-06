require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
    require(`./src/handlers/${handler}`)(client, Discord);
});

client.login(process.env.BOT_TOKEN);
