const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "shows latencies of the bot",
    category: "basic",
    use: "ping",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        message.channel.send('Calculating current ping...').then((resultMessage) => {
        const pingEmbed = new Discord.MessageEmbed()
            .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
            .setDescription(`🏓 Latency is ${message.createdTimestamp - (Date.now() + 1)}ms \n⌛ API Latency is ${Math.round(client.ws.ping)}ms\n🆙 Uptime: ${process.uptime().toFixed(2)}`)
            .setFooter("Pong!", client.user.displayAvatarURL())
            .setTimestamp()
        
        resultMessage.delete();    
        message.channel.send({embeds: [pingEmbed]})
        })
    }
}