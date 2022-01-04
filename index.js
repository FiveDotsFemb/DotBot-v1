const Discord = require("discord.js")
require("dotenv").config()

const TOKEN = "OTI3Nzc0NDk4NTA4MzkwNDkw.YdPHVQ.GA4K_bMFNYPQYuFGhCQr4F_E034"
const PREFIX = "dot!"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi" ){
        message.reply("hello")
    }
})

client.login(process.env.TOKEN)