import React, { useRef } from 'react';
import Color from 'color-thief-react';
import './ColorWrapper.css';

export default function ColorWrapper({ imgSource, children }) {
  const previousColorRef = useRef(null);
  
  return (
    <Color src={imgSource} crossOrigin="anonymous" format="hex">
      {({ data, loading }) => {
        if (!loading && data !== previousColorRef.current) {
          previousColorRef.current = data;
        }

        return (
        <div className='baseColor'>
          <div className='colorWrap' style={{ backgroundColor: loading ? previousColorRef.current : data }}>
            {children}
          </div>
        </div>
        );
      }}
    </Color>
  );
}
