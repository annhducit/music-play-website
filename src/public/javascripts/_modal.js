function Modal() {
    const modal = $('.modal');
    const modalContent = $('.modal-content');
    const close = $('.close');

    const initialize = () => {
        modal.style.display = 'none';
    };

    const handleEvents = () => {
        modal.onclick = toggleModal;

        modalContent.onclick = (e) => e.stopPropagation();

        close.onclick = toggleModal;
    };

    const toggleModal = () => {
        modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
    };

    const start = () => {
        initialize();
        handleEvents();
    };

    return {
        toggleModal,
        start,
    };
}
