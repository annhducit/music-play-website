function AlbumDetails() {
    const albumDetailsId = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1,
    );

    const handleEvents = () => {};

    const getSongList = async () => {
        try {
            const res = await fetch(`/api/albums/${albumDetailsId}`);
            const json = await res.json();

            console.log(json);
            return json.data.songs;
        } catch (e) {
            return [];
        }
    };

    const start = () => {
        handleEvents();

        DetailsView(getSongList).start();
    };

    return {
        start,
    };
}
