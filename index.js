const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")

const PREFIX = "dot!"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', msg => {
    if (!msg.content.startsWith(PREFIX)) return;

    const args = msg.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (command === 'avatar') {
        const embed = new Discord.MessageEmbed()
            .setTitle('User Avatar')
            .setColor('#0099ff')
            .setThumbnail(msg.author.avatarURL())
            .setImage(msg.author.avatarURL())
            .setTimestamp()
        msg.channel.send({embeds: [embed]});
            
    }
})

const welcomeChannelId = "896513423863599116"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)