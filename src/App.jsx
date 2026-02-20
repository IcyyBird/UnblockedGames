import React, { useState, useMemo } from 'react';
import { Search, Gamepad2, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-bottom border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-zinc-900 p-2 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Unblocked Hub</span>
            </div>

            <div className="flex-1 max-w-md mx-8 hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-100 border-none rounded-xl focus:ring-2 focus:ring-zinc-900 transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-zinc-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight"
          >
            Play Anywhere, <span className="text-zinc-400">Anytime.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          >
            A curated collection of the best web games, unblocked and ready to play in your browser.
          </motion.p>
          
          <div className="sm:hidden px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl focus:ring-2 focus:ring-white transition-all outline-none text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Games</h2>
          <span className="text-sm text-zinc-500">{filteredGames.length} games found</span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <GameCard 
                    game={game} 
                    onSelect={setSelectedGame} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-zinc-100 rounded-full mb-4">
              <Search className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No games found</h3>
            <p className="text-zinc-500">Try adjusting your search or browse our featured collection.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-zinc-900 font-medium underline underline-offset-4"
            >
              Clear search
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-zinc-900" />
            <span className="font-bold">Unblocked Hub</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Unblocked Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GamePlayer 
              game={selectedGame} 
              onClose={() => setSelectedGame(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
