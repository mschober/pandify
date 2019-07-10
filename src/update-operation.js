class UpdateOperation {
  static addSong(playlists, change) {
    console.log('going to addSong');
    let playlist = playlists.filter(pl => {
      console.log('pl is', pl, change);
      return pl.id === change.playlistId;
    })[0];
    
    playlist.songs.push(change.songId);
    console.log('found pl is', playlist);
  }

  static addPlaylist(user, change) {
    console.log('going to addPlaylist');
  }

  static removePlaylist(users, playlists, change) {
    console.log('going to removePlaylist');
  }
}

module.exports = {
  UpdateOperation
}