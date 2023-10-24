import React, { useRef } from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default function TrackList(props) {
  const { tracks, onAddTrack, onRemoveTrack, isRemoval, isPlaylistTrack } = props;
  const trackListRef = useRef(null);

  return (
    <>
      {tracks.length > 0 ? (
        <div className="TrackList" ref={trackListRef}>
          {tracks.map((track) => (
            <div className={isPlaylistTrack}>
              <Track
                key={track.id}
                track={track}
                onAddTrack={onAddTrack}
                onRemoveTrack={onRemoveTrack}
                isRemoval={isRemoval}
              />
            </div>
          ))
          }
        </div>
      ) : (
        <div className="placeholder">
          <p>Add Songs ☺</p>
        </div>
      )}
    </>
  );
}
