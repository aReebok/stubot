module.exports = {
    name: "ping",
    description: "this is a ping command",
<<<<<<< HEAD
    execute(client, message, args, Discord){
        message.react('👍');
        message.channel.send('pong');
=======
    async execute(client, message, args, Discord){
        message.channel.sendTyping();
        // sends pong and displays latency. 
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
>>>>>>> 53656777ad85a59e5f9cd7b5c954eb2173e82bc2
    }
}