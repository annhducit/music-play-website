function Search() {
    const userId = $('.main-navigation-user').dataset.id;
    const searchOptionBtns = $$('.search-btn');
    const searchSongPlayButton = $('.search-song_play-btn');
    const searchIconPlay = $('.search-icon-play');
    const searchedSongDivs = Array.from($$('.searched-song'));

    let searchOption = 0;
    let bookmarkSongIds = [];

    const render = () => {
        Array.from(searchOptionBtns)[searchOption].classList.add('active');
    };

    const handleEvents = () => {
        // Handle clicking on the search btn
        Array.from(searchOptionBtns).forEach((btn, index) => {
            btn.onclick = () => {
                searchOption = index;
                Array.from(searchOptionBtns).forEach((btn) =>
                    btn.classList.remove('active'),
                );
                render();
            };
        });

        // Handle clicking on the search icon play
        searchSongPlayButton.onclick = () => {
            searchIconPlay.classList.toggle('fa-pause');
            searchIconPlay.style.fontSize = '30px';

            const id = searchSongPlayButton.dataset.id;
            refreshSongs(id);
        };

        // Handle clicking on the searched song divs
        searchedSongDivs.forEach((item) => {
            item.onclick = () => {
                const id = item.dataset.id;
                refreshSongs(id);
            };

            const heartIcon = item.querySelector('#heart');
            heartIcon.onclick = async (e) => {
                e.stopPropagation();
                heartIcon.classList.toggle('fa-solid');

                const songId = item.dataset.id;
                if (heartIcon.classList.contains('fa-solid')) {
                    await createBookmark({ userId, songId });
                } else {
                    await deleteBookmark({ userId, songId });
                }

                await loadBookmarkSongIds();
            };
        });
    };

    const refreshSongs = async (id) => {
        const song = await fetchSong(id);
        const randomSongs = await fetchRandomSongs();
        musicPlayer.refreshSongs([song, ...randomSongs]);
    };

    const loadBookmarks = async () => {
        searchedSongDivs.forEach((item) => {
            if (bookmarkSongIds.includes(item.dataset.id)) {
                const heartIcon = item.querySelector('#heart');
                heartIcon.classList.add('fa-solid');
            }
        });
    };

    const fetchSong = async (id) => {
        try {
            const res = await fetch(`/api/songs/${id}`);
            const json = await res.json();

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

    const loadBookmarkSongIds = async () => {
        const bookmarks = await fetchBookmarks(userId);
        bookmarkSongIds = bookmarks.map((p) => p.songId._id);
    };

    const fetchBookmarks = async (userId) => {
        try {
            const res = await fetch(`/api/bookmarks/${userId}`);
            const json = await res.json();

            console.log(json);
            return json.data;
        } catch (e) {
            console.error(e);
            return [];
        }
    };

    const createBookmark = async (info) => {
        try {
            const res = await fetch('/api/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            const json = await res.json();
            console.log(json);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteBookmark = async (info) => {
        try {
            const res = await fetch('/api/bookmarks', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            const json = await res.json();
            console.log(json);
        } catch (e) {
            console.error(e);
        }
    };

    const start = async () => {
        render();
        await loadBookmarkSongIds();
        loadBookmarks();
        handleEvents();
    };

    return {
        start,
    };
}
