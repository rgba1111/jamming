import React, {useState} from "react";
import TrackList from "../TrackList/TrackList";
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function SearchResults(props) {
  const { results, onAddTrack, placeholder, isFlex, wasAdded} = props; 
  return (
    <div className="searchResultsAnchor">
      {results.length > 0 ? (
          <div className="searchResultsWrap">
              <TrackList tracks={results} onAddTrack={onAddTrack} wasAdded={wasAdded}/>
          </div>
      ) : (
        <div className="stopElement_idle">
          <div className="placeholder" id={isFlex}>
              <p>{placeholder}</p>
          </div>
        </div>
      )}
    </div>
  );
}