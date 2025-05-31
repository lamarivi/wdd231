document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('joinForm');
    const timestampInput = document.getElementById('timestamp');
    const titleInput = document.getElementById('title');
    const titleError = document.getElementById('title-error');

    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    if (titleInput && titleError) {
        titleInput.addEventListener('input', validateTitle);
        titleInput.addEventListener('blur', validateTitle);
        
        function validateTitle() {
            if (titleInput.value && !titleInput.validity.valid) {
                titleError.textContent = 'Title must be 7+ characters (letters, hyphens, spaces only)';
                titleError.style.display = 'block';
                titleInput.classList.add('invalid');
            } else {
                titleError.style.display = 'none';
                titleInput.classList.remove('invalid');
            }
        }
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                highlightInvalidFields();
                return;
            }

            const formData = new FormData(form);
            const params = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                params.append(key, value);
            }

            form.action = `thankyou.html?${params.toString()}`;

            sessionStorage.setItem('formSubmission', JSON.stringify(Object.fromEntries(formData)));
        });
    }

    const modals = document.querySelectorAll('.modal');
    if (modals.length > 0) {
        window.openModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };

        window.addEventListener('click', function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (modal.style.display === 'block') {
                        modal.style.display = 'none';
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }

    function highlightInvalidFields() {
        const invalidFields = form.querySelectorAll(':invalid');
        
        invalidFields.forEach(field => {
            field.classList.add('invalid');
            
            field.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('invalid');
                }
            });
        });

        if (invalidFields.length > 0) {
            invalidFields[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
});
