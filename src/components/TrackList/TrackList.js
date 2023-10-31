import React, { useRef } from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default function TrackList(props) {
  const { tracks, onAddTrack, onRemoveTrack, isRemoval, wasAdded} = props;
  const trackListRef = useRef(null);

  const tracksToDisplay = tracks ?? [];
  return (
    <div>
      {tracksToDisplay.length > 0 ? (
        <div className="TrackList" ref={trackListRef}>
          {tracksToDisplay.map((track) => (
            <Track
              key={track.id}
              track={track}
              onAddTrack={onAddTrack}
              onRemoveTrack={onRemoveTrack}
              isRemoval={isRemoval}
              wasAdded={track.wasAdded}
              />
          ))}
        </div>
      ) : (
        <div className="placeholder">
          <p>Add Songs ☺</p>
        </div>
      )}
    </div>
  );
}