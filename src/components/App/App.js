import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { search, getAccessToken, savePlaylist } from '../../util/Spotify';
import ColorWrapper from '../ColorWrapper/ColorWrapper';

import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [addedTrackIds, setAddedTrackIds] = useState([]);
  const [name, setName] = useState('My Playlist');
  const [accessToken, setAccessToken] = useState('');
  const [changedName, setChangedName] = useState(false);
  const nameInputRef = useRef(null);
  const [placeholder, setPlaceholder] = useState('Search for anything');
  const [isFlex, setIsFlex] = useState('');
  const [wasAdded, setWasAdded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [imgSource, setImgSource] = useState('');

  const onAddTrack = (track) => {
    if (!addedTrackIds.includes(track.id)) {
      const updatedTrack = { ...track, wasAdded: true };
      setPlaylist(prevPlaylist => [...prevPlaylist, updatedTrack]);
      setAddedTrackIds(prevIds => [...prevIds, updatedTrack.id]);
      setResults(prevResults => prevResults.map(item => item.id === track.id ? updatedTrack : item));
      setImgSource(track.image);
    } else {
      console.log("Track is already in the playlist!");
    }
  };

  const onRemoveTrack = (track) => {
    if (addedTrackIds.includes(track.id)) {
      const updatedTrack = { ...track, wasAdded: false };
      setPlaylist(prevPlaylist => prevPlaylist.filter(item => item.id !== track.id));
      setAddedTrackIds(prevIds => prevIds.filter(id => id !== track.id));
      setResults(prevResults => prevResults.map(item => item.id === track.id ? updatedTrack : item));
      if (playlist.length === 1) {
        setImgSource('');
      }
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
      setName('My playlist');
      setChangedName(false);

    } else {
      setName(name);
      setChangedName(true);
    }
  };

  useEffect(() => {
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

  const onSearch = (term) => {
    if (!accessToken || term.length < 1) {
      console.log('Access token not available. Search term too short or empty.');
      return;
    }

    setSearchTerm(term);

    search(term, accessToken)
      .then((results) => {
        if (results.length < 1) {
          setPlaceholder('No results. Try another search term!');
          return;
        } else {
          const updatedResults = results.map((track) => {
            if (addedTrackIds.includes(track.id)) {
              return { ...track, wasAdded: true };
            } else {
              return track;
            }
          });
          setResults(updatedResults);
        }
      })
      .catch((error) => {
        console.error('Error during search:', error);
      });
  };

  const onClearSearch = () => {
    setResults([]);
    setIsFlex('flexPlaceholder');
  }

  const onClearPlaylist = () => {
    setPlaylist([]);
    setAddedTrackIds([]);
    onUpdatePlaylistName('My playlist');
    setAddedTrackIds([]);
    playlist.forEach(track => onRemoveTrack(track));
    setImgSource('');
  }

  const onSavePlaylist = () => {
    const trackURIs = playlist.map(track => `spotify:track:${track.id}`);
    console.log(trackURIs);
    savePlaylist(name, trackURIs).then(() => {
      setPlaylist([]);
      setAddedTrackIds([]);
      setName('My Playlist');
      setChangedName(false);
      alert(`${name} saved to your account!`);
      nameInputRef.current.value = '';
      setAddedTrackIds([]);
      playlist.forEach(track => onRemoveTrack(track));
      setImgSource('');
    });
  };


  return (
    <>
      <div className="App">
        <div className="header">
          <h1>jammming</h1>
        </div>
        <div className="intro">
          <p>Find your favorite songs, add them to a playlist <br></br>and save the playlist to your Spotify account.</p>
        </div>
        <SearchBar onSearch={onSearch} inputRef={nameInputRef} onClearSearch={onClearSearch} setPlaceholder={setPlaceholder} />
        <div className='scrollContainer'>
          <PerfectScrollbar>
            <div className='trackListContainer'>
              <SearchResults results={results} onAddTrack={onAddTrack} placeholder={placeholder} isFlex={isFlex} addedTrackIds={addedTrackIds} wasAdded={wasAdded} />
            </div>
          </PerfectScrollbar>
        </div>
        <div className='overflowWrapper'>
        <ColorWrapper imgSource={imgSource}></ColorWrapper>
          <Playlist imgSource={imgSource} playlist={playlist} onRemoveTrack={onRemoveTrack} onNameChange={onUpdatePlaylistName} name={name} onSavePlaylist={onSavePlaylist} changedName={changedName} inputRef={nameInputRef} onClearPlaylist={onClearPlaylist}/>
      </div>
        </div>

    </>
  );
}