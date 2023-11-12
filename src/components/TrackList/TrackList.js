import React, { useRef } from "react";
import Track from "../Track/Track";
import "./TrackList.css";
import { Tooltip } from 'react-tooltip';

export default function TrackList(props) {
  const { tracks, onAddTrack, onRemoveTrack, isRemoval, wasAdded, playTrack, currentPlaying } = props;
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
              isPlaying={currentPlaying === track.id}
              playTrack={() => playTrack(track.id, track.preview)}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="placeholder" data-tooltip-id="playlistPlaceholder-tooltip" data-tooltip-content="Add songs by clicking ⨁">
            <p>Add Songs ☺</p>
          </div>
          <Tooltip className="tooltip" id="playlistPlaceholder-tooltip" />
        </>
      )}
    </div>
  );
}
