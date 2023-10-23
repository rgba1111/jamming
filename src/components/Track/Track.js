// Track.js
import React from "react";
import "./Track.css";

/**
 * Track Component:
 * Displays track information and provides buttons for adding/removing the track.
 *
 * Props:
 * @param {Object} track - The track object containing name and other details.
 * @param {Function} onAddTrack - Callback function to add the track to the playlist.
 * @param {Function} onRemoveTrack - Callback function to remove the track from the playlist.
 * @param {boolean} isRemoval - Indicates whether the remove button should be displayed.
 */
export default function Track(props) {
  const { track, onAddTrack, onRemoveTrack, isRemoval } = props;

  return (
    <div className="track">
      <div className="trackInformation">
        <img className="trackImage" src={track.image} alt="album cover" />
        <h3 className="trackName">{track.name}</h3>
        <p className="trackArtist">{track.album} · {track.artist}</p>
      </div>
      {isRemoval ? (
        // Display remove button if isRemoval is true
        <button className="trackAction" onClick={() => onRemoveTrack(track)}><div className="Icon" id="minusIcon"></div></button>
      ) : (
        // Display add button if isRemoval is false
        <button className="trackAction" onClick={() => onAddTrack(track)}><div className="Icon" id="plusIcon"></div></button>
      )}
    </div>
  );
}


