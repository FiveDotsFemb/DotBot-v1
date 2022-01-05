const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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

// prefix
client.on('message', async (msg) => {
    if (!msg.content.startsWith(PREFIX)) return;

    const args = msg.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

// avatar
    if (command === 'avatar') {
        const embed = new Discord.MessageEmbed()
            .setTitle('User Avatar')
            .setColor('#FF33AC')
            .setImage(msg.author.avatarURL())
            .setTimestamp()
        msg.channel.send({embeds: [embed]});
            
    }
// member count
    if (command === 'members') {
        msg.reply(`There are ${msg.guild.memberCount} members in this server`)
    }

// poll command
    if (command === 'poll') {
        let message = await msg.reply(args.join(' '));
        await message.react('✅');
        await message.react('❌');
    }
})

const welcomeChannelId = (process.env.CHANNEL)

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)