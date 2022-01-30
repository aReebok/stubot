require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    name: 'v2g',
    description: "Sends a video to gfycat api and recieves a gif of it",
    async execute(client, message, args, Discord) {
        message.react('👍');
        message.channel.sendTyping();
        
        let uploads = [];
        message.attachments.forEach(attachment => {
            uploads.push(attachment.url); });

        if (uploads.length === 0) { return message.reply("Please upload a video attachment.")}

        let createGIF = {
            fetchUrl: `${uploads[0]}`,
            title: `gif by Discord User ${message.author.id}`
        };

        let retgfy = {};

        const response = await axios.post('https://api.gfycat.com/v1/gfycats', createGIF).catch(error => {
            console.log(error);
            return message.reply("There was some issue posting given attachment.");
        });

        retgfy ['gfyname'] = response.data.gfyname;
        message.channel.send(`The gif was uploaded to gyfcat; encoding in progress (may take some time)...`)
        
        let uploadComplete = 0;
        while (!uploadComplete) {
            console.log("checking if upload completed...")
            const response = await axios.get(`https://api.gfycat.com/v1/gfycats/fetch/status/${retgfy.gfyname}`).catch(error => {
                console.log(error);
                return message.reply("There was some error checking image status.");
            });

            if (response.data.task.toLowerCase() === 'complete') { 
                uploadComplete = 1; 
                console.log(`${retgfy.gfyname}: upload COMPLETED!`)
            } else if (response.data.task === "NotFoundo") {
                return message.reply("There was some error checking image status: NotFoundo.");
            } else { 
                console.log(response.data);
                await sleep(1000);
                message.channel.sendTyping();
            }
        }

        const gifResponse = await axios.get(`https://api.gfycat.com/v1/gfycats/${retgfy.gfyname}`).catch(error => {
            console.log(error)
            return message.reply("There was an issue retriving the gif response.")
        });

        return message.reply(gifResponse.data.gfyItem.gifUrl);
    }
}