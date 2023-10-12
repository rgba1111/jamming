import React from "react";
import Track from "../Track/Track";

/**
 * Renders a list of tracks with add/remove functionality.
 * @param {Object} props - The props object.
 * @param {Array} props.tracks - The list of tracks to render.
 * @param {Function} props.onAddTrack - The function to call when a track is added.
 * @param {Function} props.onRemoveTrack - The function to call when a track is removed.
 * @param {boolean} props.isRemoval - Whether or not the component is in removal mode.
 * @returns {JSX.Element} - The rendered TrackList component.
 */
export default function TrackList(props) {
  const { tracks, onAddTrack, onRemoveTrack, isRemoval } = props;

  return (
    <div className="TrackList">
      {tracks.map(track => (
        <Track key={track.id} track={track} onAddTrack={onAddTrack} onRemoveTrack={onRemoveTrack} isRemoval={isRemoval} />
      ))}
    </div>
  );
}
