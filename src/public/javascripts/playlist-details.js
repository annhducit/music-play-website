function PlaylistDetails() {
    const playlistDetailsId = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1,
    );
    const deletePlaylistBtn = $('.song-list-delete');
    const confirmDeleteBtn = $('.details-view-btn.delete');
    const cancelDeleteBtn = $('.details-view-btn.cancel');
    const modal = Modal();

    const handleEvents = () => {
        deletePlaylistBtn.onclick = modal.toggleModal;

        confirmDeleteBtn.onclick = async () => {
            await deletePlaylist(playlistDetailsId);

            location.replace('/playlists');
        };

        cancelDeleteBtn.onclick = modal.toggleModal;
    };

    const getSongList = async () => {
        try {
            const res = await fetch(`/api/playlists/${playlistDetailsId}`);
            const json = await res.json();

            console.log(json);
            return json.data.songs;
        } catch (e) {
            return [];
        }
    };

    const deletePlaylist = async (id) => {
        try {
            const res = await fetch(`/api/playlists/${id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            console.log(json);
        } catch (e) {
            console.error(e);
        }
    };

    const start = () => {
        modal.start();

        handleEvents();

        DetailsView(getSongList).start();
    };

    return {
        start,
    };
}
