// Define binded-document query variables
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Router
const pathname = location.pathname;
if (pathname.startsWith('/')) {
    User().start();
}

// Utilities functions
function formatTime(number) {
    const minutes = Math.floor(number / 60);
    const seconds = number % 60;
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
}
