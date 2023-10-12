import React, { useState } from 'react';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

/**
 * Renders the main App component.
 * @returns {JSX.Element} The App component JSX.
 */
export default function App() {
  const [results, setResults] = useState([
    {
      name: "example name",
      artist: "example artist",
      album: "example album",
      id: 1
    },
    {
      name: "example name 2",
      artist: "example artist 2",
      album: "example album",
      id: 2
    }
  ]);

  const [playlist, setPlaylist] = useState([]);
  const [addedTrackIds, setAddedTrackIds] = useState([]);

  /**
   * Adds a track to the playlist if it's not already added.
   * @param {Object} track - The track to add to the playlist.
   */
  const onAddTrack = (track) => {
    // Check if the track is already in the playlist by its ID
    if (!addedTrackIds.includes(track.id)) {
      // Add the track to the playlist and update addedTrackIds
      setPlaylist(prevPlaylist => [...prevPlaylist, track]);
      setAddedTrackIds(prevIds => [...prevIds, track.id]);
    } else {
      console.log("Track is already in the playlist!");
    }
  };

  /**
   * Removes a track from the playlist if it's in the playlist.
   * @param {Object} track - The track to remove from the playlist.
   */
  const onRemoveTrack = (track) => {
    // Check if the track is in the playlist by its ID
    if (addedTrackIds.includes(track.id)) {
      // Remove the track from the playlist and update addedTrackIds
      setPlaylist(prevPlaylist => prevPlaylist.filter(item => item.id !== track.id));
      setAddedTrackIds(prevIds => prevIds.filter(id => id !== track.id));
    } else {
      console.log("Track is not in the playlist!");
    }
  };

  return (
    <div className="App">
      <SearchBar />
      <SearchResults results={results} onAddTrack={onAddTrack} />
      <Playlist playlist={playlist} onRemoveTrack={onRemoveTrack} />
    </div>
  );
}