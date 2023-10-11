import React from 'react';
import SearchBar from './../SearchBar';
import SearchResults from './../SearchResults';
import { SearchProvider } from './../SearchContext';
import Tracks from './../Tracks';

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