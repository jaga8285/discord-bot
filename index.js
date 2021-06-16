const fs = require('fs');
const path = require('path');
const config = require(path.join(__dirname+'/config.json'));
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

require('dotenv').config();

client.once('ready', () => {
  console.log('Ready!');

  const commandFiles = fs.readdirSync('./commands')
      .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Adding ${command.name} command...`);
    if (client.commands.has(command.name)) {
      console.error('WARNING: command already exists, overriding');
    }
    client.commands.set(command.name, command);
    if (command.alias!=null) {
      for (let i = 0; i<command.alias.length; i++) {
        if (client.commands.has(command.alias[i])) {
          console.error('WARNING: command already exists, skipping alias');
          continue;
        }
        client.commands.set(command.alias[i], command);
      }
    }
  }
});

const prefix = config.prefix;

client.on('message', (message)=>{
  if (message.content == 'estou na zona') {
    message.channel.send('com os rapazes');
  }
	if (message.content == 'eles não podem breezy') {
		message.channel.send('😢');
	}
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    console.log('Executing command '+command);
    if (client.commands.get(command).name === 'help') {
      args = client.commands;
    }
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.react('❌');
  }
});

client.login(process.env.DISCORD_TOKEN);
