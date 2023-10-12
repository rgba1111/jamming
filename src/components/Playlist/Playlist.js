import React from "react"; // Importing the React library
import TrackList from "../TrackList/TrackList"; // Importing the TrackList component

export default function Playlist(props) { // Defining a functional component called Playlist
  const { playlist, onRemoveTrack } = props; // Destructuring the props object to get the playlist and onRemoveTrack functions

  return (
    <div className="Playlist"> {/* Defining a div with a class name of "Playlist" */}
      <h1>Playlist</h1> {/* Adding a heading with the text "Playlist" */}
      <input defaultValue={"New Playlist"} /> {/* Adding an input field with a default value of "New Playlist" */}
      <button className="Playlist-save">Save to Spotify</button> {/* Adding a button with the text "Save to Spotify" */}
      <TrackList tracks={playlist} onRemoveTrack={onRemoveTrack} isRemoval={true} /> {/* Rendering the TrackList component with the playlist, onRemoveTrack, and isRemoval props */}
    </div>
  );
}