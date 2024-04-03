function SearchBar() {
    const inputDiv = $('.main-navigation-searchbar-input');
    const searchBtn = $('.main-navigation-searchbar-icon');

    const handleEvents = () => {
        searchBtn.onclick = () => {
            const search = inputDiv.value;
            search && location.replace(`/search/${search}`);
        };
    };

    const start = () => {
        handleEvents();
    };

    return {
        start,
    };
}
