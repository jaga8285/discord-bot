const Discord = require('discord.js');
const path = require('path');
const config = require(path.join(__dirname+'/../config.json'));
// eslint-disable-next-line max-len
const applyTemplate = require(path.join(__dirname+'/../lib/applyTemplate.js'));

module.exports = {
  name: 'nextlink',
  description: 'Takes one argument n (default 2). '+
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
        .setColor(config.color)
        .setThumbnail('https://images-eu.ssl-images-amazon.com/images/S/pv-target-images/cf4e3cf73353496b14e14688baba726e09889d10ccc8c588dd7db36bc058b8df._V_SX402_.jpg');
    message.channel.send(newEmbed);
  },
};
