const Discord = require('discord.js');
const path = require('path');
const config = require(path.join(__dirname+'/../config.json'));
// eslint-disable-next-line max-len
const applyTemplate = require(path.join(__dirname+'/../lib/applyTemplate.js'));

module.exports = {
  name: 'catchup',
  description: 'Takes one argument n (default 1). '+
  'Get previous n episodes links',
  usage: config.prefix+ 'catchup 2',
  alias: ['c', 'cu'],
  execute(message, args) {
    let episodeList = '';
    const nEpisodes = !isNaN(parseInt(args[0]))? parseInt(args[0]) : 2;
    // eslint-disable-next-line max-len
    for (let i = Math.max(config.currentEpisode - nEpisodes, 1); i < config.currentEpisode; i++) {
      episodeList = episodeList + `[Episode ${i}](` +
      applyTemplate(config.currentEpisode-i) + ')\n';
    }
    const newEmbed = new Discord.MessageEmbed()
        .setTitle('Catching up')
        .addField(
            ' Last watched ',
            'The episode we last watched was '+
            String(config.currentEpisode-1)+'\n')
        .setColor(config.color)
        .addField('Links', episodeList);
    message.channel.send(newEmbed);
  },
};
