import React from 'react';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Track from './../Track/Track';
import TrackList from './../TrackList/TrackList';


// use global variables
export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo'
}

function App() {
  return (
    <>
      <div className="App">
        <SearchBar />
        <SearchResults />
        <TrackList />
        <Track />
      </div>
    </>

  );
}

export default App;