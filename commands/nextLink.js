const Discord = require('discord.js');
const path = require('path');
const config = require(path.join(__dirname+'/../config.json'));
// eslint-disable-next-line max-len
const applyTemplate = require(path.join(__dirname+'/../lib/applyTemplate.js'));

module.exports = {
  name: 'nextlink',
  description: 'Takes one argument n (default 1). '+
  'Get next n episodes links',
  usage: config.prefix+ 'nextlink 2',
  alias: ['l', 'nl', 'link'],
  execute(message, args) {
    let episodeList = '';
    const nEpisodes = !isNaN(parseInt(args[0]))? parseInt(args[0]) : 2;
    // eslint-disable-next-line max-len
    for (let i = 0; i < (nEpisodes); i++) {
      episodeList = episodeList + `[Episode ${config.currentEpisode+i}](` +
      applyTemplate(config.currentEpisode+i) + ')\n';
    }
    const newEmbed = new Discord.MessageEmbed()
        .setTitle(`Currently on Episode ${config.currentEpisode}`)
        .addField('Links', episodeList)
        .setColor(config.color);
    message.channel.send(newEmbed);
  },
};
