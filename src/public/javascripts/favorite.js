function Favorite() {
    const userId = $('.main-navigation-user').dataset.id;

    const handleEvents = async () => {};

    const getBookmarkSongs = async () => {
        try {
            const res = await fetch(`/api/bookmarks/${userId}`);
            const json = await res.json();

            console.log(json);
            return json.data.map((p) => p.songId);
        } catch (e) {
            console.error(e);
            return [];
        }
    };

    const start = () => {
        handleEvents();
        DetailsView(getBookmarkSongs).start();
    };

    return {
        start,
    };
}
