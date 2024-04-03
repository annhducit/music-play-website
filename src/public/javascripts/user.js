let musicPlayer = null;

function User() {
    let Page = null;
    const pathname = location.pathname;
    if (pathname === '/') {
        Page = Home;
    } else if (pathname.startsWith('/search')) {
        Page = Search;
    } else if (pathname === '/playlists') {
        Page = Playlists;
    } else if (pathname.startsWith('/playlists/')) {
        Page = PlaylistDetails;
    } else if (pathname.startsWith('/albums/')) {
        Page = AlbumDetails;
    } else if (pathname === '/favorite') {
        Page = Favorite;
    }
    musicPlayer = MusicPlayer();

    const start = () => {
        Page && Page().start();
        SearchBar().start();
        musicPlayer.start();
    };

    return {
        start,
    };
}
