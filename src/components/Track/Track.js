import React, { useRef } from "react";
import "./Track.css";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

export default function Track(props) {
  const { track, onAddTrack, onRemoveTrack, isRemoval, wasAdded } = props;
  
  const trackImageRef = useRef(null);

  const playPreview = () => {
    const trackPreview = new Audio(track.preview);
    const element = trackImageRef.current;
  
    trackPreview.play().then(() => {
      // Promise resolved, means playback has started
      element.style.border = "solid 2px red";
      console.log('playing');
    }).catch(error => {
      // Auto-play was prevented
      console.log('playback prevented', error);
    });
  
    trackPreview.addEventListener('ended', () => {
      element.style.border = "none";
      console.log('done playing');
    });
  
    trackPreview.addEventListener('pause', () => {
      element.style.border = "none";
      console.log('paused');
    });
  };
  

  return (
    <>
      {isRemoval ? (
        <div className="track">
          <div className="trackInformation">
            <img
              ref={trackImageRef}
              className="trackImage"
              src={track.image}
              alt={`${track.name} album cover`}
            />
            <div className="trackInformationText">
              <h3 className="trackName">{track.name}</h3>
              <p className="trackArtist">{track.artist} · {track.album}</p>
            </div>
          </div>
          <button 
            data-tooltip-id="minusIcon-tooltip" 
            data-tooltip-content="Remove track" 
            className="trackAction" 
            onClick={() => onRemoveTrack(track)}>
              <div className="Icon" id="minusIcon"></div>
          </button>
          <Tooltip className="tooltip" id="minusIcon-tooltip" />
        </div>
      ) : wasAdded ? (
        <div className="track">
          <div className="trackInformation">
            <img
              ref={trackImageRef}
              className="trackImage added"
              src={track.image}
              alt={`${track.name} album cover`}
            />
            <div className="trackInformationText">
              <h3 className="trackName">{track.name}</h3>
              <p className="trackArtist">{track.artist} · {track.album}</p>
            </div>
          </div>
          <button 
            disabled 
            data-tooltip-id="checkIcon-tooltip" 
            data-tooltip-content="Already added"
            className="trackAction">
              <div className="Icon" id="checkIcon"></div>
          </button>
          <Tooltip className="tooltip" id="checkIcon-tooltip" />
        </div>
      ) : (
        <div className="track">
          <div className="trackInformation">
            <img
              onClick={playPreview}
              ref={trackImageRef}
              className="trackImage"
              src={track.image}
              alt={`${track.name} album cover`}
            />
            <div className="trackInformationText">
              <h3 className="trackName">{track.name}</h3>
              <p className="trackArtist">{track.artist} · {track.album}</p>
            </div>
          </div>
          <button 
            data-tooltip-id="plusIcon-tooltip" 
            data-tooltip-content="Add track" 
            className="trackAction" 
            onClick={() => onAddTrack(track)}>
              <div className="Icon" id="plusIcon"></div>
          </button>
          <Tooltip className="tooltip" id="plusIcon-tooltip" />
        </div>
      )}
    </>
  );
}
