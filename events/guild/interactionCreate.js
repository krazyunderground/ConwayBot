module.exports = async (Discord, client, interaction) => {
	if (interaction.isCommand()){
		try {
			return await client.slashs.get(interaction.commandName).execute(interaction, client, Discord);
		} catch (error) {
			console.error(error);
			return await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

	const encboard =interaction.channel.messages.cache.get(interaction.message.id).embeds[0].description
	
	board = encboard.split("\n")

	newboard = board
	
	for (let y = 0; y < board.length; y++){
		board[y] = board[y].split(" ")
		for (let x = 0; x < board[y].length; x++){
			if(board[y][x] === "⬛") board[y][x] = 0
			else board[y][x] = 1
		}
	}

	for (let y = 0; y < board.length; y++){
		for (let x = 0; x < board[y].length; x++){
			var alive = board[y][x]
			var neighbours = 0
			if(y>0){//up neighbor
				if(board[y-1][x] === 1){
					neighbours++
				}
			}
			if(y<(board.length-1)){//down neighbour
				if(board[y+1][x] === 1){
					neighbours++
				}
				
			}
			if(x>0){//left neighbor
				if(board[y][x-1] === 1){
					neighbours++
				}
			}
			if(x<(y.length-1)){//right neighbor
				if(board[y][x+1] === 1){
					neighbours++
				}
				
			}
			if(y>0 && x>0){//up left left neighbour
				if(board[y-1][x-1] === 1){
					neighbours++
				}
			}
			if(y>0 && x<(y.length-1)){//up right left neighbour
				if(board[y-1][x+1] === 1){
					neighbours++
				}
				
			}
			if(y<(board.length-1) && x>0){//bottom left left neighbour
				if(board[y+1][x-1] === 1){
					neighbours++
				}
			}
			if(y<(board.length-1) && x<(y.length-1)){//bottom left left neighbour
				if(board[y+1][x+1] === 1){
					neighbours++
				}
			}

			if(alive === 1){
				if(neighbours === 2){
					newboard[y][x] = 1
				} else if(neighbours === 3){
					newboard[y][x] = 1
				} else newboard[y][x] = 0
			} else if(neighbours === 3){
				newboard[y][x] = 1
			} else {
				newboard[y][x] = 0
			}
		}
	}

	for (let y = 0; y < newboard.length; y++){
		for (let x = 0; x < newboard[y].length; x++){
			if(newboard[y][x] === 0) newboard[y][x] = "⬛"
			if(newboard[y][x] === 1) newboard[y][x] = "🟥"
		}
		newboard[y] = newboard[y].join(" ")
	}

	newboard = newboard.join("\n")

	const row = new Discord.MessageActionRow()
		.addComponents(
			new Discord.MessageButton()
				.setCustomId('nextgen')
				.setLabel('Next Gen')
				.setStyle('SECONDARY'),
		);
	const disabled = new Discord.MessageActionRow()
		.addComponents(
			new Discord.MessageButton()
				.setCustomId('nextgen')
				.setLabel('Next Gen')
				.setStyle('SECONDARY')
				.setDisabled(true)
		);

	const embed = new Discord.MessageEmbed()
		.setTitle("Conway's Game Of Life")
		.setDescription(newboard)

	interaction.reply({embeds: [embed], components: [row]})
	interaction.message.edit({embeds: [interaction.message.embeds[0]], components: [disabled]})
}

