function Playlists() {
    const createBtn = $('.song-list-btn');
    const form = document.forms[0];
    const createPlayListBtn = $('.create-playlist-btn');
    const modal = Modal();

    const handleEvents = () => {
        createBtn.onclick = () => {
            modal.toggleModal();
        };

        createPlayListBtn.onclick = async (e) => {
            e.preventDefault();
            const data = new FormData();
            const elements = form.elements;

            data.append('name', elements.name.value);
            data.append('description', elements.description.value);
            data.append('files', elements.file.files[0]);

            await createPlaylist(data);

            location.reload();
        };
    };

    const createPlaylist = async (info) => {
        try {
            const res = await fetch('/api/playlists', {
                method: 'POST',
                body: info,
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
    };

    return {
        start,
    };
}
