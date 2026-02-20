import React from 'react';
import { Play } from 'lucide-react';

export const GameCard = ({ game, onSelect }) => {
  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(game)}
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-zinc-900 mb-1">{game.title}</h3>
        <p className="text-sm text-zinc-500 line-clamp-2">{game.description}</p>
      </div>
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="bg-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
          <Play className="w-6 h-6 text-zinc-900 fill-current" />
        </div>
      </div>
    </div>
  );
};
