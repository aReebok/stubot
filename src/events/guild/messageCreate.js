const testRegex = require("../../commands/testRegex");

module.exports = (Discord, client, message) => {
    const  PREFIX = "!"
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) {
        const command = client.commands.get("testRegex")
        return command.execute(client, message, Discord);
    }
    const args = message.content.slice(PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);
    console.log("commands: "  + cmd)
    if (command) {    
        message.react('👍');
        console.log(command + " USED!!!")
        command.execute(client, message, args, Discord)};
}