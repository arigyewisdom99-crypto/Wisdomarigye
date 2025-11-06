// script.js

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScroll();
    initFormValidation();
    initDarkMode();
    initImageModal();
    initScrollToTop();
    initCurrentYear();
});

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form validation for contact form
function initFormValidation() {
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            
            // Clear previous error messages
            clearErrors();
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter a message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.9em';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = 'red';
}

// Clear error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const fields = document.querySelectorAll('input, textarea');
    
    errorMessages.forEach(error => error.remove());
    fields.forEach(field => field.style.borderColor = '');
}

// Show success message
function showSuccessMessage() {
    const form = document.querySelector('form');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.backgroundColor = '#d4edda';
    successDiv.style.color = '#155724';
    successDiv.style.padding = '1rem';
    successDiv.style.margin = '1rem 0';
    successDiv.style.borderRadius = '4px';
    successDiv.style.border = '1px solid #c3e6cb';
    successDiv.textContent = 'Thank you for your message! We will get back to you soon.';
    
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Dark mode toggle
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = '🌙 Dark Mode';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.padding = '10px 15px';
    darkModeToggle.style.backgroundColor = '#2c3e50';
    darkModeToggle.style.color = 'white';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '5px';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.zIndex = '1000';
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
            document.body.style.backgroundColor = '#1a1a1a';
            document.body.style.color = '#ffffff';
            
            // Update section backgrounds
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.backgroundColor = '#2d2d2d';
                section.style.color = '#ffffff';
            });
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.backgroundColor = '';
                section.style.color = '';
            });
        }
    });
}

// Image modal functionality
function initImageModal() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '2000';
            
            // Create modal image
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.objectFit = 'contain';
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
        });
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.textContent = '↑';
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '20px';
    scrollButton.style.right = '20px';
    scrollButton.style.width = '50px';
    scrollButton.style.height = '50px';
    scrollButton.style.backgroundColor = '#3498db';
    scrollButton.style.color = 'white';
    scrollButton.style.border = 'none';
    scrollButton.style.borderRadius = '50%';
    scrollButton.style.fontSize = '1.5em';
    scrollButton.style.cursor = 'pointer';
    scrollButton.style.opacity = '0';
    scrollButton.style.transition = 'opacity 0.3s';
    scrollButton.style.zIndex = '1000';
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
        } else {
            scrollButton.style.opacity = '0';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update copyright year automatically
function initCurrentYear() {
    const copyrightElement = document.querySelector('footer p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace('2023', currentYear);
    }
}

// Add some interactive effects to table rows
document.addEventListener('DOMContentLoaded', function() {
    const tableRows = document.querySelectorAll('tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e8f4fc';
            this.style.transition = 'background-color 0.3s';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});

