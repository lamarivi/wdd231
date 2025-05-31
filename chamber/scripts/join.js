document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

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

    const modalElements = document.querySelectorAll('.modal');
    if (modalElements.length > 0) {
        window.openModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; 
                const focusable = modal.querySelector('input, button, [tabindex]');
                if (focusable) focusable.focus();
            }
        };

        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };

        function closeAllModals() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = '';
        }

        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeAllModals();
            }
        });
    }

    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(event) {
            let isValid = true;
            
            const requiredFields = joinForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    isValid = false;
                } else {
                    field.classList.remove('invalid');
                }
            });

            if (titleInput && titleInput.value && titleInput.validity.patternMismatch) {
                titleInput.classList.add('invalid');
                titleError.style.display = 'block';
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
                const firstInvalid = joinForm.querySelector('.invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        joinForm.querySelectorAll('input, select, textarea').forEach(element => {
            element.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.classList.remove('invalid');
                }
            });
        });
    }
});
