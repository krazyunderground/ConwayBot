const Discord = require("discord.js")

module.exports = {
    name: "conway",
    category: "basic",
    use: "conway",
    cooldown: 0,
    async execute(client, message, args, Discord, economy, util){
        var board = [
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
            ["", "", "", "", "", "", "", "", "", "", "", ""],
        ]

        for (let y = 0; y < board.length; y++){

            for (let x = 0; x < board[y].length; x++){
                board[y][x] = Math.floor(Math.random() * 2)
            }

            for (let x = 0; x < board[y].length; x++){
                if(board[y][x] === 0) board[y][x] = "⬛"
                if(board[y][x] === 1) board[y][x] = "🟥"
            }

            board[y] = board[y].join(" ")
        }

        board = board.join("\n")

        const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('nextgen')
					.setLabel('Next Gen')
					.setStyle('SECONDARY'),
			);

        const embed = new Discord.MessageEmbed()
            .setTitle("Conway's Game Of Life")
            .setDescription(board)

        message.reply({embeds: [embed], components: [row]})
    }
}