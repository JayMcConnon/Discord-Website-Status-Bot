const Discord = require('discord.js');
const client = new Discord.Client();
const { bot_token, website_url, status_channel_id, guild_id } = require('./config.json');
const isUp = require('is-up');

const websiteCheck = async function(){
    const channel = client.channels.cache.get(status_channel_id);
    if(!channel){
      console.error('Bot is not in the channel to send edit');
      process.exit(1);
    } else {
      const check = await isUp(website_url);
      if (check === false) {
          console.log('Website is down');
          channel.setName(" 🔴 Status");
      } else {
          console.log('Website is up');
          channel.setName(" 🟢 Status");
      }
    }
};


client.once('ready', () => {
  console.log('Checking Status of site');
  websiteCheck();
});

client.login(bot_token);