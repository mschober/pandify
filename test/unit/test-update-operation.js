const { assert } = require('chai');
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
  })
})