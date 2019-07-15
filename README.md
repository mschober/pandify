# Pandify

> A mixtape editing program.

## Using Mixtape

> Mixtape relies on a simple console interface to apply batches of changes to users, songs, and playlists. The program is designed to make one pass over the incoming changes and apply them.

### Disclaimer

- Mixtape assumes all input files are validated and will not create edge scenarios.
- Mixtape assumes songs can only be played 1 in a a given playlist. This is considered an important fast follow update.

### Running Mixtape

The pandify script assumes your system has `node` installed at `/usr/local/bin/node`. If that isn't the case, remove the shebang and runt it as `node pandify ...`.

```sh
./pandify <input_file_path> <changes_file_path> <output_file_path>
```

## Schemas

### User

- id: unique identifier for this user.
- playlists: hash of user's playlists.
  - A hash is used for O(1) time lookups and deletes.

### Playlist

- id: unique idenfier for this user.
- songs: hash of this playlist's songs.
 - songs should not be a hash since the same song may be played more than once in a playlist. This will be fixed in a future release.
- users: hash of users who are subscribed to this playlist (backreference).

### Song

- id: unique idenfier for this song

## How to scale it out
> Pandify is written with feature completeness in mind vs high scalablility and would need some important changes to make it effective with very large files. All of the information for the datafiles of [ songs, users, playlists ] are currently read into memory and edited in memory before writing back out. As soon as the file became too big to read into memory the program would fail. This is also true for the incoming changes. 

Scaling changes would be relatively straight forward since changes can be viewed as a stream. Instead of reading them into memory, a large range of changes could be read like a "page" and applied before reading the next "page". 

Scaling the updates is more tricky. The first challenge is to find via a read, update, and write a change to a particular datafile. For example, adding an exisint song to an existing user. Users are hashmaps, but that only applies if ALL the users are in memory. There would need to be an index of sorts on the datafiles to quickly access the right range of users to find the specific one. If userIds were all UUIDs, and filenames were prefixed with an alphanum range like 'ae1-ad4', then the correct file could be accessed quickly for reading. Writing could be done at the end of a "page" of changes. The same filename indexing could be used to write the data back out. This approach would incur a rebalancing of the files after a period of time that would have to run to split large datafiles into new ranges. Datafiles that are read could be stored in memory during the duration of a "page" of changes to avoid reading the same data from disk. 

This would scale the system up to reasonbaly mid-large size filesets. It would be slow and cumbersome for changfiles that want to touch most of the records in the system. But it would do reasonably well for large datafiles with smaller change files. 

To get into the next tier of scalability I think it would make sense to spin a hadoop cluster and handle changes with a true Map/Reduce paradigm since it would be easy to map change sets and then shuffle them together and update the filesystem. This is sort of the bread and butter of M/R in a batch update need. It gets more tricky if these batch updates need to coincide with Near Real Time, low-latency systems like might be present if this "mixtape" backend was supporting music streaming services online.
