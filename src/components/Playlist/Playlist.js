import React from "react"; // Importing the React library
import "./Playlist.css"; // Importing the Playlist component's styling
import TrackList from "../TrackList/TrackList"; // Importing the TrackList component

export default function Playlist(props) { // Defining a functional component called Playlist
    const { playlist, onRemoveTrack, onNameChange, name, onSavePlaylist } = props; // Destructuring the props object to get the playlist and onRemoveTrack functions

    const handleNameChange = (e) => {
        e.preventDefault();
        onNameChange(e.target.value);
    }

    return (
        <div className="playlist"> {/* Defining a div with a class name of "Playlist" */}
            <div className="playlistInput">
                <div className="Label">
                    <div className="Icon" id="editIcon"></div>
                    <input className="playlistName" placeholder={name} onChange={handleNameChange} />
                </div>
                <button onClick={onSavePlaylist}>Save Playlist</button>
            </div>
            <TrackList tracks={playlist} onRemoveTrack={onRemoveTrack} isRemoval={true} /> {/* Rendering the TrackList component with the playlist, onRemoveTrack, and isRemoval props */}
        </div>
    );
}