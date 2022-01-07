require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client(
    {intents:[
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
    require(`./src/handlers/${handler}`)(client, Discord);
});

client.login(process.env.BOT_TOKEN);
