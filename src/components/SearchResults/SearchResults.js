import React, {useState} from "react";
import TrackList from "../TrackList/TrackList";

/**
 * Renders the search results component.
 * @param {Object} props - The props object.
 * @param {Array} props.results - The array of search results.
 * @param {Function} props.onAddTrack - The function to add a track to the playlist.
 * @returns {JSX.Element} - The JSX element to render.
 */

export default function SearchResults(props) {
  const { results, onAddTrack, placeholder, isFlex, wasAdded} = props;
  console.log('SearchResults component received new results:', results);

  return (
    <>
      {results.length > 0 ? (
        <div>
          <TrackList tracks={results} onAddTrack={onAddTrack} wasAdded={wasAdded}/>
        </div>
      ) : (
        <div className="placeholder" id={isFlex}>
            <p>{placeholder}</p>
        </div>
      )}
    </>
  );
}