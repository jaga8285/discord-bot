const Discord = require('discord.js');
const path = require('path');
const config = require(path.join(__dirname+'/../config.json'));
const fs = require('fs');

module.exports = {
  name: 'template',
  description: 'Change template link, '+
    '{cred} will be replaced by stored credentials, '+
    '{ep} will be replaced by episode number',
  usage: config.prefix+ 'template https://{cred}flare.tangerina.org/lab16/src/episodes/Banana/BananaFishEp{ep}.mkv',
  alias: ['t'],
  execute(message, args) {
    if ( args[0] == null ) {
      const newEmbed = new Discord.MessageEmbed()
          .setTitle('Current Template')
          .addField(
              'The current link template is:',
              config.template)
          .setColor(config.color);
      message.channel.send(newEmbed);
      return;
    }
    config.template = args[0];
    fs.writeFile(
        path.join(__dirname+'/../config.json'),
        JSON.stringify(config, null, 2), () =>{
          console.log('overwrote '+__dirname+'/../config.json');
          message.react('👍');
        });
  },
};
