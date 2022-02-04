module.exports = {
    name: "testRegex",
    description: "This should send back wahtever message was sent. ",
    async execute(client, message, Discord){
        const {RichEmbed} = require('discord.js');
        // message.reply(`/echo ${message} @${message.author.username}\\`);
        const r = new RegExp('co+c+k+', 'i');
        const ban = new RegExp('co*0*.*c+k','i');
        if (ban.test(`${message.toString().replaceAll(" ", '')}`)) {
            await message.reply("( ͡° ͜ʖ ͡°) nice try <:OMEGALUL:863653416789606400>");
            return message.delete();
        } 
    }
}