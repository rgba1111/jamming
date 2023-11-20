import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import { search, getAccessToken, savePlaylist, signIn, getLastPlayedTracks } from '../../util/Spotify';

import ColorWrapper from '../ColorWrapper/ColorWrapper';
import toast, { Toaster } from 'react-hot-toast';

import 'react-perfect-scrollbar/dist/css/styles.css';

export default function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [lastPlayedTracks, setlastPlayedTracks] = useState([]);
  
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

  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRef = useRef(new Audio());

  const [addedSong, setAddedSong] = useState(false);
  const [removedSong, setRemovedSong] = useState(false);

  const [signedIn, setSignedIn] = useState(false);

  const playTrack = (trackId, trackPreviewUrl) => {
    if (currentPlaying !== trackId) {
      audioRef.current.pause();
      audioRef.current.src = trackPreviewUrl;
      audioRef.current.play().then(() => {
        setCurrentPlaying(trackId); // Update the currently playing track
      }).catch(e => {
        console.error("Error playing the track:", e);
        toast.error("Error playing the track!");
        setCurrentPlaying(null); // Reset if there's an error
      });
    } else {
      // Toggle play/pause for the same track
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        setCurrentPlaying(null); // Reset the currently playing track if paused
      }
    }
    audioRef.current.addEventListener('ended', () => {
      setCurrentPlaying(null);
    });
  };


  useEffect(() => {
    return () => audioRef.current.pause();
  }, []);


  const onAddTrack = (track) => {
    if (!addedTrackIds.includes(track.id)) {
      const updatedTrack = { ...track, wasAdded: true };
      setPlaylist(prevPlaylist => [...prevPlaylist, updatedTrack]);
      setAddedTrackIds(prevIds => [...prevIds, updatedTrack.id]);
      setResults(prevResults => prevResults.map(item => item.id === track.id ? updatedTrack : item));
      setImgSource(track.image);
      setAddedSong(true);
      setRemovedSong(false);
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
      setAddedSong(false);
      setRemovedSong(true);
      if (playlist.length === 1) {
        setImgSource('');
      }
    } else {
      console.log("Track is not in the playlist!");
    }
  };

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
    const storedToken = localStorage.getItem('accessToken');
  
    const fetchData = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
        if (token) {
          localStorage.setItem('accessToken', token); // Save the token to localStorage
          setSignedIn(true);
        }
      } catch (error) {
        console.error('Error retrieving access token:', error);
        toast.error("Error retrieving access token!");
      }
    };

    if (storedToken) {
      setAccessToken(storedToken);
      setSignedIn(true);
    } else {
      fetchData();
    }
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
        toast.error("Error during search!");
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
    savePlaylist(name, trackURIs).then(() => {
      setPlaylist([]);
      setAddedTrackIds([]);
      setName('My Playlist');
      setChangedName(false);

      toast.success(`${name} saved to Spotify!`);

      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });

      nameInputRef.current.value = '';
      setAddedTrackIds([]);
      playlist.forEach(track => onRemoveTrack(track));
      setImgSource('');
    });
  };


  const signOut = () => {
    const currentToken = localStorage.getItem('accessToken');
    if (currentToken) {
      localStorage.removeItem('accessToken');
    }
    setAccessToken('');
    setSignedIn(false);

    setPlaylist([]);
    setAddedTrackIds([]);
    setName('My Playlist');
    setChangedName(false);
    setAddedTrackIds([]);
    setImgSource('');
    setResults([]);
    setIsFlex('flexPlaceholder');

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
  });
  };
  
  useEffect(() => {
    // Function to fetch and set recently played tracks
    const fetchRecentlyPlayed = async () => {
      try {
        const tracks = await getLastPlayedTracks(accessToken);
        setResults(tracks);
      } catch (error) {
        console.error("Error fetching recently played tracks:", error);
        toast.error("Error fetching recently played tracks!");
      }
    };

    // Check if access token is available and fetch recently played tracks
    if (accessToken) {
      fetchRecentlyPlayed();
    }
  }, [accessToken]); // Dependency array includes accessToken


  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            iconTheme: {
              primary: 'var(--white)',
              secondary: 'black',
            },
            style: {
              background: 'var(--green)',
              border: '1px solid var(--overlay)',
              padding: '16px',
              color: 'var(--primaryText)',
              boxShadow: '0',
            },
          },
        }}
      />
      {!signedIn && (
        <div className='authOverlay'>
          <div className='authContainer'>
            <div className='authHeader'>
              <h1>jammming</h1>
            </div>
            <div className='authIntro'>
              <p>Discover new music with Spotify, create playlists and save them to your account.</p>
            </div>
            <div className='authButton'>
              <button onClick={signIn}>Log in with Spotify</button>
            </div>
          </div>
        </div>
      )}
  
      <div className="App">
        <div className="header">
          <h1>jammming</h1>
        </div>
        <div className="intro">
          <p>Find your favorite songs, add them to a playlist <br></br>and save the playlist to your Spotify account.</p>
        </div>
        <SearchBar onSearch={onSearch} inputRef={nameInputRef} onClearSearch={onClearSearch} setPlaceholder={setPlaceholder} />
        <div className='scrollContainer'>
          <div className='trackListContainer'>
            <SearchResults results={results} onAddTrack={onAddTrack} playTrack={playTrack}
              placeholder={placeholder} isFlex={isFlex} addedTrackIds={addedTrackIds} wasAdded={wasAdded} currentPlaying={currentPlaying}
              lastPlayedTracks={lastPlayedTracks}/>
          </div>
        </div>
        <div className='overflowWrapper'>
          <ColorWrapper imgSource={imgSource}></ColorWrapper>
          <Playlist imgSource={imgSource} playlist={playlist} addedSong={addedSong} removedSong={removedSong} onRemoveTrack={onRemoveTrack} playTrack={playTrack} currentPlaying={currentPlaying}
            onNameChange={onUpdatePlaylistName} name={name} onSavePlaylist={onSavePlaylist} changedName={changedName} inputRef={nameInputRef} onClearPlaylist={onClearPlaylist} />
        </div>
      </div>
      <div className='footer'>
        <button className='textButton' onClick={signOut}>Sign Out</button>
      </div>
    </>
  );
  
  
}