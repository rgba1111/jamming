import React, { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import './ColorWrapper.css';

export default function ColorWrapper({ imgSource, children }) {
  const [palette, setPalette] = useState([]);
  const [isPaletteLoading, setIsPaletteLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imgSource;

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 5);
      setPalette(colors.map(color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`));
      setIsPaletteLoading(false);
    };
  }, [imgSource]);

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

  let gradientStyle = isPaletteLoading || !palette.length
    ? DEFAULT_BACKGROUND_STYLE
    : getGradientStyle(palette);

  return (
    <div className='colorWrap' style={gradientStyle}>{children}</div>
  );
}
