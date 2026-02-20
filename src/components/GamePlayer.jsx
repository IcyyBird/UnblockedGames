import React from 'react';
import { X, Maximize2, RotateCcw } from 'lucide-react';

export const GamePlayer = ({ game, onClose }) => {
  const iframeRef = React.useRef(null);

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = game.url;
    }
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      iframeRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between p-4 bg-zinc-900 text-white">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">{game.title}</h2>
          <div className="flex gap-2">
            <button 
              onClick={handleReload}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Reload Game"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleFullscreen}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-red-500 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 relative bg-zinc-800">
        <iframe
          ref={iframeRef}
          src={game.url}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          title={game.title}
        />
      </div>
    </div>
  );
};
