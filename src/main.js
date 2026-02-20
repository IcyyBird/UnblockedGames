async function init() {
    const gamesContainer = document.getElementById('games-grid');
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const modal = document.getElementById('game-modal');
    const closeModal = document.getElementById('close-modal');
    const gameFrame = document.getElementById('game-frame');
    const gameTitle = document.getElementById('game-title');
    const reloadGame = document.getElementById('reload-game');
    const fullscreenGame = document.getElementById('fullscreen-game');
    const gameCount = document.getElementById('game-count');

    let games = [];

    try {
        const response = await fetch('./src/data/games.json');
        games = await response.json();
        renderGames(games);
    } catch (error) {
        console.error('Error loading games:', error);
    }

    function renderGames(filteredGames) {
        gamesContainer.innerHTML = '';
        gameCount.textContent = `${filteredGames.length} games found`;

        if (filteredGames.length === 0) {
            gamesContainer.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <div class="inline-block p-4 bg-zinc-100 rounded-full mb-4">
                        <svg class="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">No games found</h3>
                    <p class="text-zinc-500">Try adjusting your search or browse our featured collection.</p>
                </div>
            `;
            return;
        }

        filteredGames.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card group';
            card.innerHTML = `
                <div class="aspect-video overflow-hidden">
                    <img 
                        src="${game.thumbnail}" 
                        alt="${game.title}"
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerpolicy="no-referrer"
                    />
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-zinc-900 mb-1">${game.title}</h3>
                    <p class="text-sm text-zinc-500 line-clamp-2">${game.description}</p>
                </div>
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div class="bg-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <svg class="w-6 h-6 text-zinc-900 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            `;
            card.onclick = () => openGame(game);
            gamesContainer.appendChild(card);
        });
    }

    function openGame(game) {
        gameFrame.src = game.url;
        gameTitle.textContent = game.title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeGame() {
        modal.classList.remove('active');
        gameFrame.src = '';
        document.body.style.overflow = '';
    }

    function handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const filtered = games.filter(game => 
            game.title.toLowerCase().includes(query) || 
            game.description.toLowerCase().includes(query)
        );
        renderGames(filtered);
    }

    searchInput.oninput = handleSearch;
    mobileSearchInput.oninput = handleSearch;
    closeModal.onclick = closeGame;

    reloadGame.onclick = () => {
        const currentSrc = gameFrame.src;
        gameFrame.src = '';
        gameFrame.src = currentSrc;
    };

    fullscreenGame.onclick = () => {
        if (gameFrame.requestFullscreen) {
            gameFrame.requestFullscreen();
        }
    };

    // Close on escape
    window.onkeydown = (e) => {
        if (e.key === 'Escape') closeGame();
    };
}

document.addEventListener('DOMContentLoaded', init);
