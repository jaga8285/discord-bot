const format = require('string-format');
const path = require('path');
const config = require(path.join(__dirname+'/../config.json'));
require('dotenv').config();

/**
 * Applies episode number to stored template.
 * @param {int} i episode number.
 * @return {String} The link to the episode.
 */
function applyTemplate(i) {
  const args = {
    ep: String(i).padStart(2, '0'),
    cred: process.env.FLARE_AUTH + '@',
  };
  return format(config.template, (args));
}

module.exports = applyTemplate;
