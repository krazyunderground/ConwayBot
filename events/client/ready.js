module.exports = (Discord, client) => {
    client.user.setActivity("testing testing 123")
    console.log(`logged in as ${client.user.tag}`)
}