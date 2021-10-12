const Discord = require("discord.js")
const { MessageSelectMenu, MessageActionRow } = require(`discord.js`)

module.exports = {
    name: "help",
    description: "shows help menus",
    category: "basic",
    use: "help",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){

        let prefix = process.env.PREFIX

            const basic = new Discord.MessageEmbed()
                .setTitle("Command List:")

        var basiccommand = new Array()

        client.commands.forEach(command => {
            switch(command.category){
                case "basic":
                    basiccommand.push(command)
                break
            }
        })

        basiccommand.forEach(command => {
            basic.addField(`**${prefix}${command.use}**`, command.description)
        })
        
        message.reply({embeds: [basic], ephemeral: true})

    }

}