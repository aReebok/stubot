const testRegex = require("../../commands/banReg");

module.exports = (Discord, client, message) => {
    const  PREFIX = "!"
    if (message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);
    
    // if (!message.content.startsWith(PREFIX)) return client.commands.get("banReg").execute(client, message, Discord);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);
    // console.log("commands: "  + cmd)
    if (command) {    
        message.react('👍');
        console.log(command + " USED!!!")
        command.execute(client, message, args, Discord)};
}