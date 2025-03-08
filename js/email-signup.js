/**
 * Email Signup Form Handling
 * Manages form submission and validation for the Swing Trading Guide website
 */

document.addEventListener('DOMContentLoaded', function() {
    const emailForm = document.getElementById('ebook-form');
    
    if (emailForm) {
      emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const experienceField = document.getElementById('experience');
        
        // Basic validation
        if (!validateForm(nameField, emailField)) {
          return false;
        }
        
        // Collect form data
        const formData = {
          name: nameField.value.trim(),
          email: emailField.value.trim(),
          experience: experienceField ? experienceField.value : 'beginner'
        };
        
        // Show loading state
        const submitButton = emailForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Processing...';
        submitButton.disabled = true;
        
        // In a real implementation, you would send this data to your server or email service
        // For this demo, we'll simulate a successful submission after a short delay
        setTimeout(function() {
          // Reset form
          emailForm.reset();
          
          // Show success message
          showMessage('success', 'Success! Your ebook is on its way to your inbox.');
          
          // Reset button state
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
          
          // In a real implementation, you would redirect to the ebook download or thank you page
          // window.location.href = 'resources/swing-trading-ebook.pdf';
        }, 1500);
      });
    }
    
    /**
     * Validates the form inputs
     * @param {HTMLElement} nameField - The name input field
     * @param {HTMLElement} emailField - The email input field
     * @return {boolean} - Whether the form is valid
     */
    function validateForm(nameField, emailField) {
      let isValid = true;
      
      // Clear previous error messages
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(el => el.remove());
      
      // Validate name
      if (!nameField.value.trim()) {
        showInputError(nameField, 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      if (!emailField.value.trim()) {
        showInputError(emailField, 'Please enter your email address');
        isValid = false;
      } else if (!isValidEmail(emailField.value.trim())) {
        showInputError(emailField, 'Please enter a valid email address');
        isValid = false;
      }
      
      return isValid;
    }
    
    /**
     * Shows an error message for an input field
     * @param {HTMLElement} inputElement - The input field with an error
     * @param {string} message - The error message to display
     */
    function showInputError(inputElement, message) {
      // Create error message element
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      errorElement.style.color = 'var(--color-danger)';
      errorElement.style.fontSize = '0.875rem';
      errorElement.style.marginTop = '0.25rem';
      
      // Add error styling to input
      inputElement.style.borderColor = 'var(--color-danger)';
      
      // Insert error message after input
      inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
      
      // Focus the first input with an error
      if (document.querySelectorAll('.error-message').length === 1) {
        inputElement.focus();
      }
      
      // Remove error styling when user starts typing
      inputElement.addEventListener('input', function() {
        inputElement.style.borderColor = '';
        if (errorElement.parentNode) {
          errorElement.parentNode.removeChild(errorElement);
        }
      }, { once: true });
    }
    
    /**
     * Shows a form-wide success or error message
     * @param {string} type - The message type ('success' or 'error')
     * @param {string} message - The message to display
     */
    function showMessage(type, message) {
      // Remove any existing messages
      const existingMessages = document.querySelectorAll('.form-message');
      existingMessages.forEach(el => el.remove());
      
      // Create message element
      const messageElement = document.createElement('div');
      messageElement.className = `form-message ${type}-message`;
      messageElement.textContent = message;
      
      // Style based on message type
      if (type === 'success') {
        messageElement.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
        messageElement.style.color = 'var(--color-accent)';
        messageElement.style.border = '1px solid var(--color-accent)';
      } else {
        messageElement.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        messageElement.style.color = 'var(--color-danger)';
        messageElement.style.border = '1px solid var(--color-danger)';
      }
      
      // Common styling
      messageElement.style.padding = '0.75rem 1rem';
      messageElement.style.borderRadius = 'var(--border-radius-sm)';
      messageElement.style.marginTop = '1rem';
      
      // Insert at the top of the form
      if (emailForm.firstChild) {
        emailForm.insertBefore(messageElement, emailForm.firstChild);
      } else {
        emailForm.appendChild(messageElement);
      }
      
      // Auto-remove success messages after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
          }
        }, 5000);
      }
    }
    
    /**
     * Validates an email address format
     * @param {string} email - The email address to validate
     * @return {boolean} - Whether the email format is valid
     */
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });