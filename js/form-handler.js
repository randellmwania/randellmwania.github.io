/**
 * Form Handler for HungryBirds Website
 * Handles form validation, submission, and feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all forms with the class 'needs-validation'
    const forms = document.querySelectorAll('.needs-validation');
    
    // Add validation to each form
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Reset previous states
            resetFormFeedback(form);
            
            if (form.checkValidity()) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission (replace with actual fetch/AJAX call)
                setTimeout(() => {
                    // Show success message
                    showFormMessage(form, 'success', 'Your message has been sent successfully!');
                    // Reset form
                    form.reset();
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }, 1500);
            } else {
                // Show validation errors
                form.classList.add('was-validated');
            }
        }, false);
    });
    
    // Add real-time validation
    const formInputs = document.querySelectorAll('.needs-validation input, .needs-validation textarea, .needs-validation select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
});

/**
 * Reset all form feedback
 * @param {HTMLElement} form - The form element
 */
function resetFormFeedback(form) {
    // Remove all validation classes
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
    
    // Remove any existing messages
    const existingMessages = form.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Remove was-validated class to reset Bootstrap validation
    form.classList.remove('was-validated');
}

/**
 * Show a message on the form
 * @param {HTMLElement} form - The form element
 * @param {string} type - The type of message (success, error, warning, info)
 * @param {string} message - The message to display
 */
function showFormMessage(form, type, message) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message alert alert-${type} mt-3`;
    messageDiv.role = 'alert';
    messageDiv.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="${getMessageIcon(type)} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add close button for non-success messages
    if (type !== 'success') {
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'alert');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.addEventListener('click', () => messageDiv.remove());
        messageDiv.querySelector('.d-flex').appendChild(closeButton);
    }
    
    // Insert message after the form
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.5s';
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }
}

/**
 * Get the appropriate icon for the message type
 * @param {string} type - The message type
 * @returns {string} The icon class
 */
function getMessageIcon(type) {
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };
    return icons[type] || 'fas fa-info-circle';
}

/**
 * Initialize phone number formatting
 */
function initPhoneNumberFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let phoneNumber = this.value.replace(/\D/g, '');
            
            // Format the phone number (e.g., 0712 345 678)
            if (phoneNumber.length > 0) {
                phoneNumber = phoneNumber.match(/(\d{0,4})(\d{0,3})(\d{0,4})/);
                phoneNumber = !phoneNumber[2] ? phoneNumber[1] : 
                             phoneNumber[1] + ' ' + phoneNumber[2] + (phoneNumber[3] ? ' ' + phoneNumber[3] : '');
            }
            
            this.value = phoneNumber;
        });
    });
}

// Initialize phone number formatting when the DOM is loaded
document.addEventListener('DOMContentLoaded', initPhoneNumberFormatting);
