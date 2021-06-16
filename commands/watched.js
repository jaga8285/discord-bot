const path = require('path');
const config = require(path.join(__dirname+'/../config.json'));
const fs = require('fs');

module.exports = {
  name: 'watched',
  description: 'Takes one argument n (default 1). '+
    'Marks next x episodes as watched',
  alias: ['w'],
  usage: config.prefix+ 'watched 2',
  execute(message, args) {
    const nEpisodes = parseInt(args[0]);
    if (isNaN(nEpisodes) || config.currentEpisode + nEpisodes <=0) {
      throw new Error('Invalid or missing arguments for command watched');
    }
    config.currentEpisode += nEpisodes;
    fs.writeFile(
        path.join(__dirname+'/../config.json'),
        JSON.stringify(config, null, 2), () =>{
          console.log('overwrote '+__dirname+'/../config.json');
          message.react('👍');
        });
  },
};
