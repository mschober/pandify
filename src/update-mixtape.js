const { UpdateOperation } = require('./update-operation');
const fs = require('fs');
const ROOT_PATH = '../';

// TODO: fix the require
function updateMixtape(input, changes, output) {
  let { users, songs, playlists } = require(ROOT_PATH + input);
  let updates = require(ROOT_PATH + changes);
  
  console.log('updating mixtape', users, songs, playlists, updates);
  let i = 0;
  while (i < updates.length) {
    let change = updates[i];
    if (change.operation === 'ADD_SONG') {
      UpdateOperation.addSong(playlists, change);
    }
    else if (change.operation === 'ADD_PLAYLIST') {
      UpdateOperation.addPlaylist(users, playlists, change);
    }
    else if (change.operation === 'REMOVE_PLAYLIST') {
      UpdateOperation.removePlaylist(users, playlists, change);
    }
    else {
      throw new Error('encountered unknown change' + change.operation);
    }
    i++;
  }
  let toWrite = JSON.stringify({
    users, songs, playlists
  });
  console.log('DEBUG: results', toWrite);
  fs.writeFileSync(output, toWrite);
}


module.exports = {
  updateMixtape
}