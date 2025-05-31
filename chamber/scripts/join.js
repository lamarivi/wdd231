document.addEventListener('DOMContentLoaded', function() {
    const timestampElement = document.getElementById('timestamp');
    if (timestampElement) {
        timestampElement.value = new Date().toISOString();
    }
});

const modals = document.querySelectorAll('.modal');
if (modals.length > 0) {
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target.className === 'modal') {
            event.target.style.display = 'none';
        }
    }
}
