const Discord = require('discord.js');
const client = new Discord.Client();
const { bot_token, website_url, status_channel_id, guild_id } = require('./config.json');
const isUp = require('is-up');
const schedule = require('node-schedule');

const websiteCheck = async function(){
    // Get the channel that we want to edit from config.json
    const channel = client.channels.cache.get(status_channel_id);
    // If the channel is not found, then log an error and exit process
    if(!channel){
      console.error('Bot is not in the channel to send edit');
      process.exit(1);
    } else {
        //If we found it then run an up check
      const check = await isUp(website_url);
      // If the check comes back the website is down
      if (check === false) {
          // Log it and update the channel title
          console.log('Website is down');
          channel.setName(" 🔴 Status");
      } else {
          // If it is up, log it and update the channel title
          console.log('Website is up');
          channel.setName(" 🟢 Status");
      }
    }
};


client.once('ready', () => {
    // Every 5 minutes, run our check.
  const scheduledCheck = schedule.scheduleJob('*/5 * * * *', function(){
    console.log('Checking Status of site');
    websiteCheck();
  });
});

// Log the bot in
client.login(bot_token);