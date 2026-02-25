/* js/validation.js */

(function() {
  'use strict';

  const form = document.getElementById('contact-form');
  
  if (!form) {
    console.error('Validation: Contact form not found');
    return;
  }

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn = form.querySelector('button[type="submit"]');
  const successMessage = document.getElementById('form-success');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function clearErrors() {
    const inputs = form.querySelectorAll('input, textarea');
    const errorMessages = form.querySelectorAll('.error-message');
    
    inputs.forEach(input => input.classList.remove('error'));
    errorMessages.forEach(msg => {
      msg.textContent = '';
      msg.style.display = 'none';
    });
    
    if (successMessage) {
      successMessage.style.display = 'none';
    }
  }

  function setLoadingState(loading) {
    if (loading) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.classList.add('loading');
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      submitBtn.classList.remove('loading');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, 'Please enter your name');
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, 'Please enter your email address');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showError(messageInput, 'Please enter your message');
      isValid = false;
    }

    if (!isValid) return;

    setLoadingState(true);

    setTimeout(function() {
      setLoadingState(false);
      
      if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.textContent = 'Your message has been sent successfully. Our concierge team will respond within 24 hours.';
      }
      
      form.reset();
      
      setTimeout(function() {
        if (successMessage) {
          successMessage.style.display = 'none';
        }
      }, 5000);
    }, 1500);
  }

  form.addEventListener('submit', handleSubmit);

  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', function() {
        this.classList.remove('error');
        const formGroup = this.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
          errorElement.textContent = '';
          errorElement.style.display = 'none';
        }
      });
    }
  });
})();