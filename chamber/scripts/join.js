document.addEventListener('DOMContentLoaded', function() {
    // Set timestamp if the element exists
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Initialize organizational title validation
    const titleInput = document.getElementById('title');
    const titleError = document.getElementById('title-error');
    
    if (titleInput && titleError) {
        titleInput.addEventListener('input', function() {
            if (this.validity.patternMismatch) {
                titleError.style.display = 'block';
            } else {
                titleError.style.display = 'none';
            }
        });

        titleInput.addEventListener('blur', function() {
            if (this.value && this.validity.patternMismatch) {
                titleError.style.display = 'block';
            }
        });
    }

    // Initialize modals only if they exist on the page
    const modalElements = document.querySelectorAll('.modal');
    if (modalElements.length > 0) {
        // Modal functions
        window.openModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        };

        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        };

        // Close when clicking outside modal content
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        };

        // Close with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                        document.body.style.overflow = ''; // Restore scrolling
                    }
                });
            }
        });
    }

    // Form validation
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Validate required fields
            const requiredFields = joinForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    isValid = false;
                } else {
                    field.classList.remove('invalid');
                }
            });

            // Special validation for organizational title
            if (titleInput && titleInput.value && titleInput.validity.patternMismatch) {
                titleInput.classList.add('invalid');
                titleError.style.display = 'block';
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
                // Scroll to first invalid field
                const firstInvalid = joinForm.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Clear validation on input
        joinForm.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('invalid');
                }
            });
        });
    }
});
