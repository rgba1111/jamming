import React from "react"; // Importing the React library
import "./Playlist.css"; // Importing the Playlist component's styling
import TrackList from "../TrackList/TrackList"; // Importing the TrackList component

export default function Playlist(props) { // Defining a functional component called Playlist
    const { playlist, onRemoveTrack, onNameChange, name, onSavePlaylist, changedName, inputRef, onClearPlaylist } = props; // Destructuring the props object to get the playlist and onRemoveTrack functions
    const handleNameChange = (e) => {
        e.preventDefault();
        onNameChange(e.target.value); // Updating the name state
    };

    return (
        <>
            <div className="playlist">
                <div className="playlistInput">
                    <div className="Label">
                        {playlist.length > 0 ? (
                            <div className="staticIcon" id="heartIconFilled" key={playlist.length}></div>
                        ) : (
                            <div className="staticIcon" id="heartIconOutline"></div>
                        )}
                        <input className="playlistName" placeholder={name} onChange={handleNameChange} ref={inputRef} />
                    </div>
                    {playlist.length > 0 && changedName ? (
                        <button className="cta" onClick={onSavePlaylist}>Save Playlist</button>
                    ) : (
                        <button disabled className="cta" onClick={onSavePlaylist}>Save Playlist</button>
                    )}
                </div>
                <TrackList tracks={playlist} onRemoveTrack={onRemoveTrack} isRemoval={true} isPlaylistTrack={"playListTrack"} />

                <div className="buttonWrap">
                    {playlist.length > 0 ? (
                        <button className="textButton" onClick={onClearPlaylist}>Clear Playlist</button>
                    ) : (<button disabled className="textButton" onClick={onClearPlaylist}>Clear Playlist</button>)}
                </div>
            </div>
        </>

    );
}