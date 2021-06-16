const Discord = require('discord.js');
const path = require('path');
const config = require(path.join(__dirname+'/../config.json'));

module.exports = {
  name: 'help',
  description: 'Show this screen',
  usage: config.prefix+ 'help',
  alias: ['h'],
  execute(message, args) {
    const newEmbed = new Discord.MessageEmbed()
        .setTitle('What can Breezy do?')
        .addFields(...(args
            .filter((command, idx) => {
              return command.name === idx;
            })
            .map((command) => {
              return {
                name: command.name,
                value: command.description + '\n**Usage:** `' + command.usage +
                '`\n**Aliases**: ' + command.alias,
              };
            })))
        .setColor(config.color);
    message.channel.send(newEmbed);
  },
};
