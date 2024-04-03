function Slider() {
    const slider = $('#home-slider');
    const prevBtn = $('.home-slider-prev');
    const nextBtn = $('.home-slider-next');

    let x = slider.scrollLeft;
    let offsetWidth = slider.offsetWidth;
    let scrollWidth = slider.scrollWidth;

    const handleEvents = () => {
        // Handle clicking the prev button
        prevBtn.onclick = function () {
            x = x > 0 ? x - offsetWidth : scrollWidth - offsetWidth;
            scrollToSlide();
        };

        // Handle clicking the next button
        nextBtn.onclick = function () {
            x = x < scrollWidth ? x + offsetWidth : 0;
            scrollToSlide();
        };
    };

    const scrollToSlide = () => {
        slider.scrollTo({
            top: 0,
            left: x,
            behavior: 'smooth',
        });
    };

    const start = () => {
        handleEvents();
    };

    return {
        start,
    };
}
