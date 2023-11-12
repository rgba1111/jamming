import React from "react";
import "./Track.css";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const Track = ({ track, playTrack, onAddTrack, onRemoveTrack, isRemoval, wasAdded, isPlaying }) => {
  const playPreview = () => {
    if (track.preview) {
      playTrack(track.preview);
    }
  };

  const getTrackClass = () => {
    if (!track.preview) return "notPlayableTrack";
    return isPlaying ? "playingTrack" : "playableTrack";
  };

  const renderTrackImage = () => (
    <div className={getTrackClass()}>
      <img
        className={`trackImage ${isPlaying ? "isPlaying" : "isNotPlaying"}`}
        src={track.image}
        alt={`${track.name} album cover`}
        onClick={playPreview}
        data-tooltip-id={!track.preview ? 'preview-tooltip' : undefined}
        data-tooltip-content={!track.preview ? `Can't play "${track.name}"` : undefined}
      />
      {!track.preview && <Tooltip className="tooltip" id='preview-tooltip' />}
    </div>
  );

  const renderActionButton = () => {
    let tooltipId, tooltipContent;

    if (isRemoval) {
      tooltipId = "minusIcon-tooltip";
      tooltipContent = "Remove track";
      return (
        <button
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          className="trackAction"
          onClick={() => onRemoveTrack(track)}
        >
          <div className="Icon" id="minusIcon"></div>
        </button>
      );
    } else if (wasAdded) {
      tooltipId = "checkIcon-tooltip";
      tooltipContent = "Already added";
      return (
        <button
          disabled
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          className="trackAction"
        >
          <div className="Icon" id="checkIcon"></div>
        </button>
      );
    } else {
      tooltipId = "plusIcon-tooltip";
      tooltipContent = "Add track";
      return (
        <button
          data-tooltip-id={tooltipId}
          data-tooltip-content={tooltipContent}
          className="trackAction"
          onClick={() => onAddTrack(track)}
        >
          <div className="Icon" id="plusIcon"></div>
        </button>
      );
    }
  };

  return (
    <div className="track">
      <div className="trackInformation">
        {renderTrackImage()}
        <div className="trackInformationText">
          <h3 className="trackName">{track.name}</h3>
          <p className="trackArtist">{track.artist} · {track.album}</p>
        </div>
      </div>
      {renderActionButton()}
      {['minusIcon-tooltip', 'checkIcon-tooltip', 'plusIcon-tooltip'].includes(renderActionButton().props['data-tooltip-id']) && (
        <Tooltip className="tooltip" id={renderActionButton().props['data-tooltip-id']} />
      )}
    </div>
  );
};
export default Track;