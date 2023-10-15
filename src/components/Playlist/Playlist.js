import React from "react"; // Importing the React library
import TrackList from "../TrackList/TrackList"; // Importing the TrackList component

export default function Playlist(props) { // Defining a functional component called Playlist
    const { playlist, onRemoveTrack, onNameChange, name, onSavePlaylist } = props; // Destructuring the props object to get the playlist and onRemoveTrack functions

    const handleNameChange = (e) => {
        e.preventDefault();
        onNameChange(e.target.value);
    }

    return (
        <div className="Playlist"> {/* Defining a div with a class name of "Playlist" */}
            <h1>{name}</h1> {/* Adding a heading with the text "Playlist" */}
            <input placeholder={name} onChange={handleNameChange} /> {/* Adding an input field with a default value of "New Playlist" */}
            <button className="Playlist-save" onClick={onSavePlaylist}>Save to Spotify</button> {/* Adding a button with the text "Save to Spotify" */}
            <TrackList tracks={playlist} onRemoveTrack={onRemoveTrack} isRemoval={true} /> {/* Rendering the TrackList component with the playlist, onRemoveTrack, and isRemoval props */}
        </div>
    );
}