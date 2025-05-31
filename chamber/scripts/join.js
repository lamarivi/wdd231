// Set timestamp when form is submitted
document.getElementById("joinForm").addEventListener("submit", function() {
    const now = new Date();
    document.getElementById("timestamp").value = now.toISOString();
});

// Modal functionality (if you add modals later)
const setupModals = () => {
    const modals = document.querySelectorAll('.modal');
    const modalLinks = document.querySelectorAll('.modal-link');
    const closeButtons = document.querySelectorAll('.close');
    
    if (modalLinks.length > 0) {
        modalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = link.getAttribute('href');
                document.querySelector(modalId).style.display = 'block';
            });
        });
    }
    
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.closest('.modal').style.display = 'none';
            });
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year and last modified date
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
    
    // Initialize modals if they exist
    setupModals();
});
