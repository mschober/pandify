class UpdateOperation {
  static addSong(playlists, change) {
    // console.log('DEBUG: going to addSong');
    // find playlist
    let playlist = playlists[change.playlistId];

    // add song to playlist
    playlist.songs[change.songId] = {
      id: change.songId
    };
    // console.log('DEBUG: found pl is', playlist);
  }

  static addPlaylist(users, playlists, change) {
    console.log('going to addPlaylist');
    // create playlist (change)
    let songs = change.songs;
    let userId = change.userId;
    let newPlaylist = {
      id: 'plab456',
      songs: songs,
      users: [userId]
    }
    // add playlist to playlists
    playlists[newPlaylist.id] = newPlaylist;
    // find user
    let user = users[userId];

    // addPlaylist to user (playlist)
    if (user.playlists) {
      user.playlists[newPlaylist.id] = newPlaylist;
    }
    else {
      user.playlists = {};
      user.playlists[newPlaylist.id] = newPlaylist;
    }
    return newPlaylist.id;
  }

  static removePlaylist(users, playlists, change) {
    console.log('DEBUG: going to removePlaylist');
    let playlistId = change.playlistId;

    // get the playlist
    let playlist = playlists[playlistId];

    // remove playlist from playlists
    delete playlists[playlistId];

    // remove references to playlist from existing users
    let updateUsers = playlist.users;
    for (let userKey in updateUsers) {
      // TODO: if the userKey doesn't exist it needs to be handled.
      let user = users[userKey];

      // TODO: if the user backref to the playlist doesn't exit it needs to be handled.
      delete user.playlists[playlistId];
    };

    //TODO: should probably return T/F to signify success/failure instead of the incoming id.
    return playlistId;
  }
}

module.exports = {
  UpdateOperation
}