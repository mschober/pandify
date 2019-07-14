const { assert, expect } = require('chai');
const { UpdateOperation } = require('../../src/update-operation');

describe('update operation tests', () => {
  it('should add an existing song to an existing playlist', () => {
    let playlists = [
      {
        id: "playlist123",
        songs: []
      }
    ];
    let change = {
      operation: 'ADD_SONG',
      songId: "song123",
      playlistId: "playlist123"
    }

    let expectedPlaylists = [
      {
        id: "playlist123",
        songs: ["song123"]
      }
    ];

    UpdateOperation.addSong(playlists, change);
    
    assert.deepEqual(playlists, expectedPlaylists);
  });
  it('should add a new playlist to an existing user with no playlists', () => {
    let user = {
      id: 'user123'
    };
    let newPlaylist = {
      playlistId: 'pl123',
      songs: ['song123']
    };
    let change = {
      operation: 'ADD_PLAYLIST',
      songs: ['songab123'],
      userId: 'user123'
    }
    let expectedUser = {
      id: 'user123'
    }

    UpdateOperation.addPlaylist(user, change);
    expect(user).to.have.keys([
      'playlists',
      'id'
    ]);
    assert.equal(user.id, expectedUser.id);
    assert.equal(user.playlists.length, 1);
    expect(user.playlists).to.have.length(1);
    assert.deepEqual(user.playlists[0].songs, change.songs);
  });
  it('should add a new playlist to an existing user with existing playlist', () => {
    let user = {
      id: 'userab123',
      playlists: [
        'plab123',
        'plab456',
        'plcd123'
      ]
    };
    let change = {
      operation: 'ADD_PLAYLIST',
      songs: ['songcd123', 'songcd456', 'songef123'],
      userId: 'userab123'
    }
    let expectedUser = {
      id: 'userab123'
    }

    UpdateOperation.addPlaylist(user, change);
    expect(user).to.have.keys([
      'playlists',
      'id'
    ]);
    assert.equal(user.id, expectedUser.id);
    expect(user.playlists).to.have.length(4);
    assert.deepEqual(user.playlists[3].songs, change.songs);
  });
})