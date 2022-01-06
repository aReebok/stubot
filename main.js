require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});


// client.once('ready', () => {
//     console.log(`${client.user.tag} has logged in.`);
// })

// client.on('message', (message) => {
    
// });

client.login(process.env.BOT_TOKEN);
