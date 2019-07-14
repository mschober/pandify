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
    // create playlist (change)
    let songs = change.songs;
    let userId = change.userId;
    let newPlaylist = {
      playlistId: 'pl123',
      songs: songs
    }
    // addPlaylist to user (playlist)
    if (user.playlists) {
      user.playlists.push(newPlaylist);
    }
    else {
      user.playlists = [newPlaylist]
    }
  }

  static removePlaylist(users, playlists, change) {
    console.log('going to removePlaylist');
  }
}

module.exports = {
  UpdateOperation
}