import React, { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import type { Option } from 'artplayer/types/option';
import './ArtPlayer.css';

interface ArtPlayerProps {
  option: Partial<Option>;
  getInstance?: (art: Artplayer) => void;
  className?: string;
}

const ArtPlayer: React.FC<ArtPlayerProps> = ({ option, getInstance, className = '' }) => {
  const artRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<Artplayer | null>(null);

  useEffect(() => {
    if (!artRef.current) return;

    const art = new Artplayer({
      container: artRef.current,
      ...option,
    });

    instanceRef.current = art;

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art);
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [option, getInstance]);

  return <div ref={artRef} className={className}></div>;
};

export default ArtPlayer;