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
        <>
            <div className="playlist">
                <div className="playlistInput">
                    <div className="Label">
                        {playlist.length > 0 ? (
                            <div className="staticIcon" id="heartIconFilled"></div>
                        ) : (
                            <div className="staticIcon" id="heartIconOutline"></div>
                        )}
                        <input className="playlistName" placeholder={name} onChange={handleNameChange} />
                    </div>
                    {playlist.length > 0 ? (
                            <button className="cta" onClick={onSavePlaylist}>Save Playlist</button>
                        ) : (
                            <button disabled className="cta" onClick={onSavePlaylist}>Save Playlist</button>
                        )}
                </div>
                <TrackList tracks={playlist} onRemoveTrack={onRemoveTrack} isRemoval={true} />
            </div>
        </>

    );
}