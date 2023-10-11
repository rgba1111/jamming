import React, {useState} from 'react';
import { useSearch } from '../SearchContext/SearchContext';

export default function Tracks() {
    const { tracks, removeTrack } = useSearch();
    const [name, setName] = useState('Your Playlist')

    return (
        <>  
            <input style={{fontSize: '1.5rem'}} type="text" value={name} onChange={e => setName(e.target.value)}></input>
            <ol>
                {tracks.map((track, index) => { // Use track instead of result
                    return (
                        <li key={index}>
                            {JSON.stringify(track)}
                            <button onClick={() => removeTrack(track.date)}>Remove</button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}