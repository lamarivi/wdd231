document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const form = document.getElementById('joinForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                alert('Please fill out all required fields correctly.');
                return;
            }

            const formData = new FormData(form);
            const params = new URLSearchParams(formData).toString();
            form.action = `thankyou.html?${params}`;
        });
    }

    const titleInput = document.getElementById('title');
    const titleError = document.getElementById('title-error');
    if (titleInput && titleError) {
        titleInput.addEventListener('input', function() {
            if (this.value && !this.validity.valid) {
                titleError.textContent = this.title;
                titleError.style.display = 'block';
            } else {
                titleError.style.display = 'none';
            }
        });
    }

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

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            });
        }
    });
});
