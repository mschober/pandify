const { assert, expect } = require('chai');
const { UpdateOperation } = require('../../src/update-operation');

describe('update operation tests', () => {
  it('should add an existing song to an existing playlist', () => {
    let playlists = {
      'playlist123': {
        id: "playlist123",
        songs: {},
        users: {
          'userab123': {
            id: 'userab123'
          }
        }
      }
    };
    let change = {
      operation: 'ADD_SONG',
      songId: "song123",
      playlistId: "playlist123"
    }

    let expectedPlaylists = {
      'playlist123': {
        id: 'playlist123',
        songs: {
          'song123': {
            id: 'song123'
          }
        },
        users: {
          'userab123': {
            id: 'userab123'
          }
        }
      }
    };

    UpdateOperation.addSong(playlists, change);
    
    assert.deepEqual(playlists, expectedPlaylists);
  });
  it('should add a new playlist to an existing user with no playlists', () => {
    let user = {
      id: 'user123'
    };
    let users = {
      'user123': user
    };
    let playlists = {
      'plab123': {
        id: 'plab123'
      }
    };
    let change = {
      operation: 'ADD_PLAYLIST',
      songs: ['songab123'],
      userId: 'user123'
    }
    let expectedUser = {
      id: 'user123'
    }

    let newPlaylistId = UpdateOperation.addPlaylist(users, playlists, change);

    // user should now have playlists
    expect(user).to.have.keys([
      'playlists',
      'id'
    ]);

    // user should not have changed
    assert.equal(user.id, expectedUser.id);

    // the users playlist should have an entry
    expect(Object.keys(user.playlists)).to.have.length(1);

    // the users playlist should have songs from change
    assert.deepEqual(user.playlists[newPlaylistId].songs, change.songs);

    // the playlists should have a new playlist
    expect(Object.keys(playlists)).to.have.length(2);

    // the new playlists songs should match changed songs
    assert.deepEqual(playlists[newPlaylistId].songs, change.songs);
    // console.log('DEBUG:', playlists, user);
  });
  it('should add a new playlist to an existing user with existing playlist', () => {
    let user = {
      id: 'userab123',
      playlists: {
        'plab123': { id: 'plab123' },
        'plcd456': { id: 'plcd456' },
        'plcd123': { id: 'plcd123' }
      }
    };

    let users = {
      'userab456': {
        id: 'userab456'
      },
      'userab123': user
    };

    let playlists = {
      'plab123': { id: 'plab123' },
      'plcd456': { id: 'plcd456' },
      'plcd123': { id: 'plcd123' }
    };

    let change = {
      operation: 'ADD_PLAYLIST',
      songs: ['songcd123', 'songcd456', 'songef123'],
      userId: 'userab123'
    }
    let expectedUser = {
      id: 'userab123'
    }

    let newPlaylistId = UpdateOperation.addPlaylist(users, playlists, change);
    // user should now have playlists
    expect(user).to.have.keys([
      'playlists',
      'id'
    ]);

    // user should not have changed
    assert.equal(user.id, expectedUser.id);

    // the users playlist should have an entry
    expect(Object.keys(user.playlists)).to.have.length(4);

    // the users playlist should have songs from change
    assert.deepEqual(user.playlists[newPlaylistId].songs, change.songs);

    // the playlists should have a new playlist
    expect(Object.keys(playlists)).to.have.length(4);

    // the new playlists songs should match changed songs
    assert.deepEqual(playlists[newPlaylistId].songs, change.songs);
    // console.log('DEBUG:', playlists, user);
  });
})