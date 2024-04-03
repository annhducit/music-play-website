function Home() {
    const topSongsDiv = $('#top-songs');
    const recentlyPlayedDiv = $('#recently-played');

    const start = () => {
        Slider().start();
        SongList(topSongsDiv).start();
        SongList(recentlyPlayedDiv).start();
    };

    return {
        start,
    };
}
