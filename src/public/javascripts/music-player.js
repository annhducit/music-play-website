function MusicPlayer() {
    const audio = $('#audio');
    const songProgress = $('#song-progress');
    const volumeProgress = $('#volume-progress');
    const playBtn = $('.main-songbar-play');
    const prevBtn = $('.main-songbar-previous');
    const nextBtn = $('.main-songbar-next');
    const randomBtn = $('.main-songbar-random');
    const repeatBtn = $('.main-songbar-repeat');
    const volumeBtn = $('.main-songbar-volume');
    const tracktime = $('.main-songbar-tracktime');
    const duration = $('.main-songbar-duration');
    const songName = $('.main-songbar-song-name');
    const artist = $('.main-songbar-artist');
    const songImageThumb = $('.main-songbar-image-thumb');

    let songs = [
        {
            name: 'Khuôn mặt đáng thương',
            artist: 'Sơn Tùng M-TP',
            imageLink: '/images/songs/khuonmatdangthuong.jpg',
            uploadLink: '/songs/khuonmatdangthuong.mp3',
        },
        {
            name: 'Em Là',
            artist: 'MONO',
            imageLink: '/images/songs/emla.jpg',
            uploadLink: '/songs/emla.mp3',
        },
        {
            name: 'Đừng về trễ',
            artist: 'Sơn Tùng M-TP',
            imageLink: '/images/songs/khuonmatdangthuong.jpg',
            uploadLink: '/songs/dungvetre.mp3',
        },
    ];
    let currentIndex = 0;
    let isPlaying = false;
    let isRewinding = false;
    let isRandom = false;
    let isRepeat = false;
    let prevVolume = 0;
    let songImageThumbAnimate = songImageThumb.animate(
        [{ transform: 'rotate(360deg)' }],
        {
            duration: 10000,
            iterations: Infinity,
        },
    );

    const handleEvents = () => {
        songImageThumbAnimate.pause();

        // Handle clicking the play button
        playBtn.onclick = handleClickPlayButton;

        // Handle when the song can be played
        audio.oncanplay = function () {
            duration.innerText = formatTime(Math.floor(audio.duration));
        };

        // Handle when the song is playing
        audio.onplay = function () {
            isPlaying = true;
            playBtn.classList.add('playing');
            songImageThumbAnimate.play();
        };

        // Handle when the song is paused
        audio.onpause = function () {
            isPlaying = false;
            playBtn.classList.remove('playing');
            songImageThumbAnimate.pause();
        };

        // Handle the song progress change
        audio.ontimeupdate = function () {
            if (this.duration && !isRewinding) {
                const progressPercent = Math.floor(
                    (100 * this.currentTime) / this.duration,
                );
                songProgress.value = progressPercent;
                tracktime.innerText = formatTime(Math.floor(this.currentTime));
            }
        };

        // Handle while rewinding the song
        songProgress.oninput = function (e) {
            isRewinding = true;
            const seekTime = (e.target.value * audio.duration) / 100;
            tracktime.innerText = formatTime(Math.floor(seekTime));
        };

        // Handle after rewinding the song
        songProgress.onchange = function (e) {
            isRewinding = false;
            const seekTime = (e.target.value * audio.duration) / 100;
            audio.currentTime = seekTime;
        };

        // Handle clicking the prev song button
        prevBtn.onclick = function () {
            if (isRandom) playRandomSong();
            else playPrevSong();
            audio.play();
        };

        // Handle clicking the next song button
        nextBtn.onclick = function () {
            if (isRandom) playRandomSong();
            else playNextSong();
            audio.play();
        };

        // Handle turning on/off the random song button
        randomBtn.onclick = function () {
            isRandom = !isRandom;
            this.classList.toggle('active', isRandom);
        };

        // Handle turning on/off the repeat song button
        repeatBtn.onclick = function () {
            isRepeat = !isRepeat;
            this.classList.toggle('active', isRepeat);
        };

        // Handle next song when audio ended
        audio.onended = function () {
            if (isRepeat) audio.play();
            else nextBtn.click();
        };

        // Handle turning on/off the sound
        volumeBtn.onclick = function () {
            audio.muted = !audio.muted;
            volumeBtn.classList.toggle('mute', audio.muted);
            if (audio.muted) {
                prevVolume = volumeProgress.value;
                volumeProgress.value = 0;
            } else {
                volumeProgress.value = prevVolume;
            }
        };

        // Handle changing the volume of the song
        volumeProgress.oninput = function (e) {
            audio.volume = e.target.value / 100;
            volumeBtn.classList.toggle('mute', e.target.value == 0);
        };
    };

    const handleClickPlayButton = () => {
        if (isPlaying) audio.pause();
        else audio.play();
    };

    const loadCurrentSong = () => {
        const currentSong = songs[currentIndex];
        audio.src = currentSong.uploadLink;
        songName.innerText = currentSong.name;
        artist.innerText = currentSong.artist;
        songImageThumb.style.backgroundImage = `url(${currentSong.imageLink})`;
    };

    const playPrevSong = () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = songs.length - 1;
        }
        loadCurrentSong();
    };

    const playNextSong = () => {
        currentIndex++;
        if (currentIndex >= songs.length) {
            currentIndex = 0;
        }
        loadCurrentSong();
    };

    const playRandomSong = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentIndex);
        currentIndex = newIndex;
        loadCurrentSong();
    };

    const setSongs = (newSongs) => {
        songs = newSongs;
        currentIndex = 0;
    };

    const refreshSongs = (newSongs) => {
        songs = newSongs;
        currentIndex = 0;
        loadCurrentSong();
        audio.play();
    };

    const getCurrentSong = () => {
        return songs[currentIndex];
    };

    const start = () => {
        // Listen / process DOM events
        handleEvents();

        // Load the first song information into UI when running the app
        loadCurrentSong();
    };

    return {
        getCurrentSong,
        setSongs,
        loadCurrentSong,
        handleClickPlayButton,
        refreshSongs,
        start,
    };
}
