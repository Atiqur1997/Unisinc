// Initialize EmailJS
(function() {
    emailjs.init("WY9ps_6fMZvMEXmak");
})();

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Get form elements
        const submitButton = this.querySelector('button[type="submit"]');
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageInput = this.querySelector('textarea');

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Prepare email data
        const templateParams = {
            to_name: "Admin",
            from_name: nameInput.value,
            from_email: emailInput.value,
            message: messageInput.value,
            reply_to: emailInput.value
        };

        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_4aqxlzg', 
                'template_aqwjpzj', 
                templateParams, 
                'WY9ps_6fMZvMEXmak'
            );
            
            if (response.status === 200) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('FAILED...', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });

    // Real-time validation
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                if (input.type === 'email') {
                    if (isValidEmail(input.value)) {
                        markValid(input);
                    }
                } else if (input.value.trim()) {
                    markValid(input);
                }
            }
        });
    });
}

// Form Input Validation
function validateForm() {
    const inputs = contactForm.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            markInvalid(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            markInvalid(input, 'Please enter a valid email address');
            isValid = false;
        } else {
            markValid(input);
        }
    });

    return isValid;
}

// Email Validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form Field Validation UI
function markInvalid(input, message) {
    input.classList.add('error');
    const errorMessage = input.parentElement.querySelector('.error-message') || 
                        createErrorMessage();
    errorMessage.textContent = message;
    input.parentElement.appendChild(errorMessage);
}

function markValid(input) {
    input.classList.remove('error');
    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function createErrorMessage() {
    const span = document.createElement('span');
    span.className = 'error-message';
    return span;
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}