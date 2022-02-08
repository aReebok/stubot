module.exports = {
    name: "banReg",
    description: "This should send back wahtever message was sent. ",
    async execute(client, message, args, Discord){
        const {RichEmbed} = require('discord.js');
        // bans variations of a bad word
        
        const ban = new RegExp('co*0*.*c+k','i');
        if (ban.test(`${message.toString().replaceAll(" ", '')}`)) {
            await message.reply("( ͡° ͜ʖ ͡°) nice try <:OMEGALUL:863653416789606400>");
            return message.delete();
        } 
    }
}