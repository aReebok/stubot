require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch');

const Discord = require('discord.js');
const client = new Discord.Client(
    {intents:[
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]});


// Command handler created from src: https://www.youtube.com/watch?v=Sihf7B8D4Y8.

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
    require(`./src/handlers/${handler}`)(client, Discord);
});

client.login(process.env.BOT_TOKEN);
