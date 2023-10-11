import React from 'react';
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import { SearchProvider } from './../SearchContext/SearchContext';
import Tracks from './../Tracks/Tracks';

// use global variables
export const ACTIONS = {
  ADD_TODO: 'add-todo',
  DELETE_TODO: 'delete-todo'
}

function App() {

  return (
    <>
      <SearchProvider>
        <div className="App">
          <SearchBar />
          <SearchResults />
          <Tracks />
        </div>
      </SearchProvider>

    </>
  );
}

export default App;