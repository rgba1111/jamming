import React, { createContext, useContext, useState } from 'react';

// Create a new context
const SearchContext = createContext();

// Create a provider component to manage the state and provide it to the components
export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [tracks, setTracks] = useState([]);

  // Function to update results
  const updateResults = (data) => {
    setResults(data);
  };

  // Function to add a track
  const addTrack = (trackId) => {
    const newTrackItem = newTrack(trackId);
    setTracks(prevTracks => [...prevTracks, newTrackItem]);
  };

  const removeTrack = (trackId) => {
    // Filter out the track with the given ID
    const updatedTracks = tracks.filter(track => track.date !== trackId);
    setTracks(updatedTracks); // Update the tracks state
};

  // Function to create a new track object
  const newTrack = (trackId) => {
    return { date: Date.now(), id: trackId };
  };

  // Provide the results state, updateResults function, tracks state, and addTrack function to the components
  return (
    <SearchContext.Provider value={{ results, updateResults, tracks, addTrack, removeTrack }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the context within components
export const useSearch = () => {
  return useContext(SearchContext);
};
    