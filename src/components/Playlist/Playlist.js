import React from "react"; // Importing the React library
import "./Playlist.css"; // Importing the Playlist component's styling
import TrackList from "../TrackList/TrackList"; // Importing the TrackList component
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

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
                        <input
                            className="playlistName"
                            placeholder={name}
                            onChange={handleNameChange}
                            ref={inputRef}
                            data-tooltip-id="playlistName-tooltip" data-tooltip-content="Click here to edit the name"
                        />
                        {/* <Tooltip className="tooltip" id="playlistName-tooltip" /> */}
                    </div>
                    {playlist.length > 0 && changedName ? (
                        <>
                            <button
                                className="cta"
                                onClick={onSavePlaylist}
                                data-tooltip-id="onSavePlaylist-tooltip" data-tooltip-content="Save playlist to your account"
                            >
                                Save Playlist
                            </button>
                            <Tooltip className="tooltip" id="onSavePlaylist-tooltip" />
                        </>

                    ) : (
                        <>
                            <button
                                disabled
                                className="cta"
                                data-tooltip-id="disabledOnSavePlaylist-tooltip" data-tooltip-content="Add songs and a name first"
                            >
                                Save Playlist
                            </button>
                            <Tooltip className="tooltip" id="disabledOnSavePlaylist-tooltip" />
                        </>
                    )}
                </div>
                <div className="playlistContainer">
                    <TrackList tracks={playlist} onRemoveTrack={onRemoveTrack} isRemoval={true} isPlaylistTrack={"playListTrack"} />
                </div>
                <div className="buttonWrap">
                    {playlist.length > 0 ? (
                        <>
                            <button
                                className="textButton"
                                onClick={onClearPlaylist}
                                data-tooltip-id="onClearPlaylist-tooltip" data-tooltip-content="Remove all songs from playlist"
                            >
                                Clear Playlist
                            </button>
                            <Tooltip className="tooltip" id="onClearPlaylist-tooltip" />
                        </>
                    ) : (<button disabled className="textButton" onClick={onClearPlaylist}>Clear Playlist</button>)}
                </div>
            </div>
        </>

    );
}