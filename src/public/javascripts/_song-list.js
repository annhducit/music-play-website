function SongList(container) {
    const handleEvents = () => {
        const songItems = container.querySelectorAll('.song-item');
        
        // Handle cliking song items
        Array.from(songItems).forEach((si) => {
            const id = si.dataset.id;
            si.onclick = async () => {
                const song = await fetchSong(id);
                const randomSongs = await fetchRandomSongs();
                musicPlayer.refreshSongs([song, ...randomSongs]);
            };
        });
    };

    const fetchSong = async (id) => {
        try {
            const res = await fetch(`/api/songs/${id}`);
            const json = await res.json();

            console.log(json);
            return json.data;
        } catch (e) {
            return [];
        }
    };

    const fetchRandomSongs = async () => {
        try {
            const res = await fetch('/api/songs/readRandomSongs');
            const json = await res.json();

            return json.data;
        } catch (e) {
            return [];
        }
    };

    const start = () => {
        handleEvents();
    };

    return {
        start,
    };
}
