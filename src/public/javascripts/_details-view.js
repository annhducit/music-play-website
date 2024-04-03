function DetailsView(getSongList) {
    const userId = $('.main-navigation-user').dataset.id;
    const itemList = $('.item-list');
    const playBtn = $('.song_play-btn');
    const playIcon = $('.icon-play-btn-details');

    let songList = [];
    let bookmarkSongIds = [];
    let firstClick = true;

    const handleEvents = async () => {
        // Handle click play playlist btn
        playBtn.onclick = () => {
            playIcon.classList.toggle('fa-pause');

            if (firstClick) {
                musicPlayer.loadCurrentSong();
                firstClick = false;
            }
            musicPlayer.handleClickPlayButton();
        };

        // Handle click playlist items
        handleClickItems();
    };

    const handleClickItems = () => {
        const itemDivs = Array.from($$('.playlist_item-song'));
        itemDivs.forEach((item, index) => {
            // Handle click playlist items
            item.onclick = () => {
                const headArray = songList.slice(0, index);
                const tailArray = songList.slice(index);
                const songs = [...tailArray, ...headArray];
                musicPlayer.refreshSongs(songs);
            };

            const heartIcon = item.querySelector('#heart');
            heartIcon.onclick = async (e) => {
                e.stopPropagation();
                heartIcon.classList.toggle('fa-solid');

                const songId = heartIcon.dataset.songId;
                if (heartIcon.classList.contains('fa-solid')) {
                    await createBookmark({ userId, songId });
                } else {
                    await deleteBookmark({ userId, songId });
                }

                await loadBookmarkSongIds();
                await loadSongList();
            };
        });
    };

    const loadSongList = async () => {
        songList = await getSongList();
        musicPlayer.setSongs(songList);

        itemList.innerHTML = songList
            .reduce(
                (acc, fs, index) => [...acc, renderSongItem(fs, index + 1)],
                [],
            )
            .join('\n');

        handleClickItems();
    };

    const renderSongItem = (song, index) => {
        return `
            <div class='playlist_item-song' data-id="${song._id}">
                <div class='row playlist_item-song-general'>
                    <div class='col l-1'>
                        ${index}
                    </div>
                    <div class='col l-4'>
                        <div class='playlist_item-song-details'>
                            <div class='playlist_item-song-details-left'>
                                <div class='playlist_item-block-img'>
                                    <img
                                        src='${song.imageLink}'
                                        class='playlist_item-song-image'
                                        alt=''
                                    />
                                </div>
                            </div>
                            <div class='playlist_item-song-details-right'>
                                <p><b>${song.name}</b></p>
                                <a href='#'>${song.artist}</a>
                            </div>
                        </div>
                    </div>
                    <div class='col l-3'>
                        <a href='#'>Favorite</a>
                    </div>
                    <div class='col l-3'>
                        <span>11 hours ago</span>
                    </div>
                    <div class='col l-1'>
                        <i
                            id='heart'
                            class='fa-regular fa-heart playlist_icon-heart ${
                                bookmarkSongIds.includes(song._id)
                                    ? 'fa-solid'
                                    : ''
                            }'
                            style="color: lightcoral"
                            data-song-id="${song._id}"
                        ></i>
                        <span class='playlist_item-song-time'>4:55</span>
                    </div>
                </div>
            </div>
        `;
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

    const start = () => {
        loadBookmarkSongIds();
        loadSongList();
        handleEvents();
    };

    return {
        start,
    };
}
