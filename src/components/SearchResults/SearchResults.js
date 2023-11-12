import React, { useState } from "react";
import TrackList from "../TrackList/TrackList";

export default function SearchResults(props) {
  const { results, onAddTrack, placeholder, isFlex, wasAdded, playTrack, currentPlaying } = props;
  return (
    <div className="searchResultsAnchor">
      {results.length > 0 ? (
        <div className="searchResultsWrap">
          <TrackList tracks={results} onAddTrack={onAddTrack} wasAdded={wasAdded} playTrack={playTrack} currentPlaying={currentPlaying}
          />
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