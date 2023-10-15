import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { search, getAccessToken, savePlaylist } from '../../util/Spotify';

/**
 * The main component of the Jamming app.
 * @returns {JSX.Element} The App component JSX element.
 */
export default function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [addedTrackIds, setAddedTrackIds] = useState([]);
  const [name, setName] = useState('Your Playlist');
  const [accessToken, setAccessToken] = useState('');

  /**
   * Adds a track to the playlist and updates the addedTrackIds state.
   * @param {Object} track - The track to be added to the playlist.
   */
  const onAddTrack = (track) => {
    if (!addedTrackIds.includes(track.id)) {
      setPlaylist(prevPlaylist => [...prevPlaylist, track]);
      setAddedTrackIds(prevIds => [...prevIds, track.id]);
    } else {
      console.log("Track is already in the playlist!");
    }
  };

  /**
   * Removes a track from the playlist and updates the addedTrackIds state.
   * @param {Object} track - The track to be removed from the playlist.
   */
  const onRemoveTrack = (track) => {
    if (addedTrackIds.includes(track.id)) {
      setPlaylist(prevPlaylist => prevPlaylist.filter(item => item.id !== track.id));
      setAddedTrackIds(prevIds => prevIds.filter(id => id !== track.id));
    } else {
      console.log("Track is not in the playlist!");
    }
  };

  /**
   * Updates the name state of the playlist.
   * @param {string} name - The new name for the playlist.
   */
  const onUpdatePlaylistName = (name) => {
    if (name.length < 1) {
      setName('Your Playlist');
    } else {
      setName(name);
    }
  };

  useEffect(() => {
    /**
     * Fetches the access token and updates the accessToken state.
     */
    const fetchData = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error('Error retrieving access token:', error);
      }
    };

    fetchData();
  }, []);

  /**
   * Searches for tracks using the Spotify API and updates the results state.
   * @param {string} term - The search term.
   */
  const onSearch = (term) => {
    if (!accessToken || term.length < 1) {
      console.log('Access token not available or Search term is empty');
      return;
    }

    search(term, accessToken)
      .then((results) => {
        setResults(results);
      })
      .catch((error) => {
        console.error('Error during search:', error);
      });
  };

  /**
   * Saves the playlist to the user's Spotify account.
   */
  const onSavePlaylist = () => {
    const trackURIs = playlist.map(track => `spotify:track:${track.id}`);
    console.log(trackURIs);

    savePlaylist(name, trackURIs).then(() => {
      setPlaylist([]);
      setAddedTrackIds([]);
      setName('Your Playlist');
    });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>jammming</h1>
      </div>
      <div className="intro">
        <p>Search for your favorite songs, add them to a playlist and save the playlist to your Spotify account.</p>
      </div>
      <SearchBar onSearch={onSearch} />
      <SearchResults results={results} onAddTrack={onAddTrack} />
      <Playlist playlist={playlist} onRemoveTrack={onRemoveTrack} onNameChange={onUpdatePlaylistName} name={name} onSavePlaylist={onSavePlaylist} />
    </div>
  );
}
