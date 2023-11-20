import React, { useState } from 'react';
import { Palette } from 'color-thief-react';
import './ColorWrapper.css';

export default function ColorWrapper({ imgSource, children }) {
  const [palette, setPalette] = useState([]);
  const [isPaletteLoading, setIsPaletteLoading] = useState(true);

  const DEFAULT_BACKGROUND_STYLE = { background: 'linear-gradient(var(--foreground), var(--background))' };

  const getGradientStyle = (colors) => {
    if (colors && colors.length >= 2) {
      return {
        background: `linear-gradient(${colors[0]}, ${colors[1]}, var(--background))`,
        animation: 'fadeGradientIn 1.5s ease-in-out'
      };
    }
    return DEFAULT_BACKGROUND_STYLE;
  };

  return (
    <>
      <Palette src={imgSource} colorCount={5} format="hex" crossOrigin="anonymous">
        {({ data, loading, error }) => {
          let gradientStyle = loading || !data
            ? DEFAULT_BACKGROUND_STYLE
            : getGradientStyle(data);

          return <div className='colorWrap' style={gradientStyle}>{children}</div>;
        }}
      </Palette>

    </>
  );
}
