// Track.js
import React from "react";
import "./Track.css";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
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
  const { track, onAddTrack, onRemoveTrack, isRemoval, wasAdded } = props;

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
          <div className="track">
            <div className="trackInformation">
              <img className="trackImage added" src={track.image} alt={track.name + ' album cover'} />
              <div className="trackInformationText">
                <h3 className="trackName">{track.name}</h3>
                <p className="trackArtist">{track.artist} · {track.album}</p>
              </div>
            </div>
            <button disabled data-tooltip-id="checkIcon-tooltip" data-tooltip-content="Already added"
              className="trackAction" onClick={() => onAddTrack(track)}><div className="Icon" id="checkIcon"></div></button>
            <Tooltip className="tooltip" id="checkIcon-tooltip" />
          </div>
        ) : (
          <div className="track">
            <div className="trackInformation">
              <img className="trackImage" src={track.image} alt={track.name + ' album cover'} />
              <div className="trackInformationText">
                <h3 className="trackName">{track.name}</h3>
                <p className="trackArtist">{track.artist} · {track.album}</p>
              </div>
            </div>
            <button data-tooltip-id="plusIcon-tooltip" data-tooltip-content="Add track" className="trackAction" onClick={() => onAddTrack(track)}><div className="Icon" id="plusIcon"></div></button>
            <Tooltip className="tooltip" id="plusIcon-tooltip" />
          </div>
        )
      )}
    </>

  );
}