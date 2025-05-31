document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
    
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            const now = new Date();
            document.getElementById('timestamp').value = now.toISOString();
        });
    }
    
    setupModals();
});

function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const modalLinks = document.querySelectorAll('.modal-link');
    const closeButtons = document.querySelectorAll('.close');
    
    if (modalLinks.length > 0) {
        modalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = link.getAttribute('href');
                const modal = document.querySelector(modalId);
                if (modal) {
                    modal.style.display = 'block';
                }
            });
        });
    }
    
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}
