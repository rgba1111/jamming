import React, { useState } from "react";
import "./Track.css";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'


export default function Track(props) {
  const { track, onAddTrack, onRemoveTrack, isRemoval, wasAdded } = props;

  const onHandleAddTrack = (track) => {
    onAddTrack(track);
  }

  const trackPreview = new Audio(track.preview);

  const playPreview = () => {
    var element = document.querySelector('.trackImage');
    trackPreview.play();

    if (trackPreview.duration > 0 && !trackPreview.paused) {
      element.style.border = "solid 2px red";
      console.log('playing');
    } else {
      element.style.border = "none";
      console.log('not playing');
    }

  }

  trackPreview.addEventListener('ended', () => {
    var element = document.querySelector('.trackImage');
    element.style.border = "none";
    console.log('done playing');
  });

  return (
    <>
      {isRemoval ? (
        <div className="track">
          <div className="trackInformation">
            <img className="trackImage" src={track.image} alt={track.name + ' album cover'} />
            <div className="trackInformationText">
              <h3 className="trackName">{track.name}</h3>
              <p className="trackArtist">{track.artist} · {track.album}</p>
              
            </div>
          </div>
          <button data-tooltip-id="minusIcon-tooltip" data-tooltip-content="Remove track" className="trackAction" onClick={() => onRemoveTrack(track)}><div className="Icon" id="minusIcon"></div></button>
          <Tooltip className="tooltip" id="minusIcon-tooltip" />

        </div>
      ) : (
        wasAdded ? (
          // track has already been added to the playlist
          <div className="track">
            <div className="trackInformation">
              <img className="trackImage added" src={track.image} alt={track.name + ' album cover'} />
              <div className="trackInformationText">
                <h3 className="trackName">{track.name}</h3>
                <p className="trackArtist">{track.artist} · {track.album}</p>
              </div>
            </div>
            <button disabled data-tooltip-id="checkIcon-tooltip" data-tooltip-content="Already added"
              className="trackAction" ><div className="Icon" id="checkIcon"></div></button>
            <Tooltip className="tooltip" id="checkIcon-tooltip" />
          </div>
        ) : (
          // track has not yet been added to the playlist
          <div className="track">
            <div className="trackInformation">
              <img onClick={playPreview} className="trackImage" src={track.image} alt={track.name + ' album cover'} />
              <div className="trackInformationText">
                <h3 className="trackName">{track.name}</h3>
                <p className="trackArtist">{track.artist} · {track.album}</p>
              </div>
            </div>
            <button data-tooltip-id="plusIcon-tooltip" data-tooltip-content="Add track" className="trackAction" onClick={() => onHandleAddTrack(track)}><div className="Icon" id="plusIcon"></div></button>
            <Tooltip className="tooltip" id="plusIcon-tooltip" />
          </div>
        )
      )}
    </>

  );
}