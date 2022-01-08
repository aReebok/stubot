module.exports = {
    name: "where",
    description: "Tests an embedded object sending into chat",
    execute(client, message, args, Discord) {
        const fs = require('fs');
        if (message.author.id === client.user.id) return;

        fs.readFile("./src/commands/templates/lol.json", function (error, content) {
            var data = JSON.parse(content);
            return message.channel.send(data);
        })
    }
}