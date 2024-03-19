import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice"
import { ActivityType, Client, GatewayIntentBits } from "discord.js"
import 'dotenv/config'
import got from "got"

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates]
})
const player = createAudioPlayer()

client.once("ready", (c) => {
  console.log(`${c.user.username} Bot is oline`)
  const activities = [
    {
      name: "safatanc.com",
      type: ActivityType.Watching,
      url: "https://safatanc.com"
    },
    {
      name: "UTY FM | 90.7",
      type: ActivityType.Listening,
      url: "https://radiouty.com"
    },
  ]
  setInterval(() => {
    c.user.setPresence({
      activities: [
        activities[Math.floor(Math.random() * activities.length)]
      ],
      status: "online"
    })
  }, 5000)

  const url = "https://scure.streaming.id/utyfmedari"
  const stream = got.stream(url)
  const streamSource = createAudioResource(stream, {
    inlineVolume: true,
  })
  player.play(streamSource)
})

client.on("messageCreate", async (message) => {
  if (!message.content.includes(client.user)) return
  if (!message.content.toLowerCase().includes("join")) return
  await message.reply({
    content: `Oke, Radio UTY FM diputar di channel ${message.member.voice.channel.name}`,
    flags: "SuppressNotifications"
  })

  const voiceChannel = joinVoiceChannel({
    guildId: message.guildId,
    channelId: message.member.voice.channelId,
    adapterCreator: message.guild.voiceAdapterCreator
  })

  voiceChannel.subscribe(player)
})

client.login(process.env.DISCORD_TOKEN)