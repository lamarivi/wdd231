document.addEventListener('DOMContentLoaded', function() {
    const FORM_DATA_KEY = 'margaritaBiodiversaFormData';
    const SUBMISSION_DATA_KEY = 'formSubmissionData';
    const MOBILE_BREAKPOINT = 767;

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const primaryNav = document.getElementById('primaryNav');
    
    if (hamburgerBtn && primaryNav) {
        const toggleMenu = (isOpen) => {
            primaryNav.classList.toggle('active', isOpen);
            hamburgerBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
            hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
        };

        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = !primaryNav.classList.contains('active');
            toggleMenu(isExpanded);
        });

        document.querySelectorAll('.nav-a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= MOBILE_BREAKPOINT) {
                    toggleMenu(false);
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (window.innerWidth <= MOBILE_BREAKPOINT && 
                !e.target.closest('.nav') && 
                !e.target.closest('.hamburger') &&
                primaryNav.classList.contains('active')) {
                toggleMenu(false);
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > MOBILE_BREAKPOINT && primaryNav.classList.contains('active')) {
                toggleMenu(false);
            }
        });
    }

    const form = document.getElementById('membershipForm');
    
    if (form) {
        const timestampField = document.getElementById('timestamp');
        if (timestampField) {
            timestampField.value = new Date().toISOString();
        }
        
        const loadFormData = () => {
            try {
                const savedFormData = localStorage.getItem(FORM_DATA_KEY);
                if (savedFormData) {
                    const formData = JSON.parse(savedFormData);
                    for (const key in formData) {
                        const element = form.elements[key];
                        if (element) {
                            if (element.type === 'checkbox' || element.type === 'radio') {
                                element.checked = element.value === formData[key];
                            } else {
                                element.value = formData[key];
                            }
                        }
                    }
                }
            } catch (e) {
                console.error('Error loading form data:', e);
            }
        };

        const saveFormData = () => {
            const formData = {};
            for (const element of form.elements) {
                if (element.name) {
                    if (element.type === 'checkbox' || element.type === 'radio') {
                        if (element.checked) {
                            formData[element.name] = element.value;
                        }
                    } else if (element.type !== 'submit') {
                        formData[element.name] = element.value;
                    }
                }
            }
            try {
                localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
            } catch (e) {
                console.error('Error saving form data:', e);
            }
        };

        const prepareSubmissionData = () => {
            const formData = {};
            const fieldsToSave = ['firstName', 'lastName', 'email', 'phone', 'membership', 'organization', 'interests', 'description'];
            
            fieldsToSave.forEach(field => {
                const element = form.elements[field];
                if (element) {
                    if (element.type === 'checkbox' || element.type === 'radio') {
                        if (element.checked) {
                            formData[field] = element.value;
                        }
                    } else if (element.type === 'select-multiple') {
                        formData[field] = Array.from(element.selectedOptions).map(option => option.value);
                    } else {
                        formData[field] = element.value;
                    }
                }
            });
            
            formData.timestamp = new Date().toISOString();
            
            return formData;
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            
            if (!form.checkValidity()) {
                alert('Please fill out all required fields correctly.');
                return;
            }
            
            try {
                const submissionData = prepareSubmissionData();
                sessionStorage.setItem(SUBMISSION_DATA_KEY, JSON.stringify(submissionData));
                
                localStorage.removeItem(FORM_DATA_KEY);
                
                window.location.href = 'form-action.html';
            } catch (e) {
                console.error('Error processing form submission:', e);
                alert('An error occurred while processing your submission. Please try again.');
            }
        };

        loadFormData();
        form.addEventListener('input', saveFormData);
        form.addEventListener('submit', handleSubmit);
    }

    const updateFooter = () => {
        const currentYear = document.getElementById('currentyear');
        if (currentYear) {
            currentYear.textContent = new Date().getFullYear();
        }
        
        const lastModified = document.getElementById('lastModified');
        if (lastModified) {
            lastModified.textContent = `Last Modified: ${document.lastModified}`;
        }
    };

    updateFooter();
});