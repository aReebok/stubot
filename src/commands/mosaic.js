module.exports = {
    name: 'mosaic',
    description: "Talks to the API.",
    async execute(client, message, args, Discord) {
        // message.react('👍');
        const axios = require('axios');
        // test simple get http reqs on axios
        
        let uploads = [];
        message.attachments.forEach(attachment => {
            uploads.push(attachment.url); });

        if (uploads.length === 0) { return message.reply("Please upload a photo attachment.")}

        let jsonObj = {
            userID: `${message.author.id}`,
            imageURL: `${uploads[0]}`
        };

        let returnObj = {}

        await axios.post('https://flask-tutorial-areebok.herokuapp.com/image', jsonObj)
            .then(res => {
                console.log('From /img \t' + res.data);
                returnObj['img'] = `${res.data}`
            }).catch(err => console.log(err));

    
        await axios.get('https://flask-tutorial-areebok.herokuapp.com/pwd')
            .then(res => console.log('From /pwd \t' + res.data))
            .catch((err) => console.log(err));

        await axios.get('https://flask-tutorial-areebok.herokuapp.com/ls')
            .then(res => console.log('From /ls \t' + res.data))
            .catch((err) => console.log(err));

        return message.reply(`https://flask-tutorial-areebok.herokuapp.com/image/${returnObj.img}`)
    }

}