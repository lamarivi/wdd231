document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp if the element exists
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Initialize modals only if they exist on the page
    const modalElements = document.querySelectorAll('.modal');
    if (modalElements.length > 0) {
        // Modal functions
        window.openModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'block';
        };

        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'none';
        };

        // Close when clicking outside modal content
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        };
    }

    // Form validation (only if form exists)
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            // Add any form validation logic here
            // Example: if (!valid) event.preventDefault();
        });
    }
});
