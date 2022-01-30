module.exports = {
    name: 'roll',
    description: "Rolls a 6 sided dice.",
    async execute(client, message, args, Discord) {
        message.react('👍');
        let result = Math.ceil(Math.random() * 6);
        return message.reply(`You rolled a... ${result}!`)
    }
}