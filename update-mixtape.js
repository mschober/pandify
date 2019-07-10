class UpdateOperation {
  static addSong() {
    console.log('going to addSong');
  }

  static addPlaylist() {
    console.log('going to addPlaylist');
  }

  static removePlaylist() {
    console.log('going to removePlaylist');
  }
}

// TODO: fix the require
function updateMixtape(input, changes, output) {
  let { users, songs, playlists } = require('./' + input);
  let updates = require('./' + changes);
  
  console.log('updating mixtape', users, songs, playlists, updates);
  let i = 0;
  while (i < updates.length) {
    let change = updates[i];
    if (change.operation === 'ADD_SONG') {
      UpdateOperation.addSong(songs, playlists, change);
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
}


module.exports = {
  updateMixtape
}