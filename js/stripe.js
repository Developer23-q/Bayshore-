/* js/stripe.js */

(function() {
  'use strict';

  const buyButton = document.getElementById('buy-now-btn');
  
  if (!buyButton) {
    console.error('Stripe: Buy now button not found');
    return;
  }

  const originalText = buyButton.innerHTML;
  const PROCESSING_TEXT = 'Processing...';
  const CHECKOUT_URL = 'https://checkout.stripe.com/c/pay/cs_test_a1b2c3d4e5f6g7h8i9j0';
  const SIMULATED_LATENCY = 1500;

  function setLoadingState() {
    buyButton.classList.add('loading');
    buyButton.classList.add('disabled');
    buyButton.setAttribute('disabled', 'true');
    buyButton.setAttribute('aria-busy', 'true');
    buyButton.innerHTML = PROCESSING_TEXT;
  }

  function resetButtonState() {
    buyButton.classList.remove('loading');
    buyButton.classList.remove('disabled');
    buyButton.removeAttribute('disabled');
    buyButton.removeAttribute('aria-busy');
    buyButton.innerHTML = originalText;
  }

  function initiateCheckout() {
    setLoadingState();

    setTimeout(function() {
      try {
        window.location.href = CHECKOUT_URL;
      } catch (error) {
        console.error('Stripe: Redirect failed', error);
        resetButtonState();
        alert('Payment initialization failed. Please try again.');
      }
    }, SIMULATED_LATENCY);
  }

  function handleClick(event) {
    event.preventDefault();
    
    if (buyButton.classList.contains('loading') || buyButton.disabled) {
      return;
    }

    initiateCheckout();
  }

  function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  }

  buyButton.addEventListener('click', handleClick);
  buyButton.addEventListener('keydown', handleKeydown);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Stripe: Payment module initialized');
    });
  } else {
    console.log('Stripe: Payment module initialized');
  }
})();