import React from "react";
import TrackList from "../TrackList/TrackList";

/**
 * Renders the search results component.
 * @param {Object} props - The props object.
 * @param {Array} props.results - The array of search results.
 * @param {Function} props.onAddTrack - The function to add a track to the playlist.
 * @returns {JSX.Element} - The JSX element to render.
 */
export default function SearchResults(props) {
  
  const { results, onAddTrack } = props;

  return (
    <div>
      <h1>Search Results</h1>
      <TrackList tracks={results} onAddTrack={onAddTrack} />
    </div>
  );
}
