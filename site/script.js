(function () {
  'use strict';

  const form = document.querySelector('.signup-form');
  const emailInput = document.getElementById('email');
  const errorEl = document.getElementById('email-error');
  const thanksEl = document.querySelector('.thanks');
  const submitBtn = form.querySelector('.submit');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isValidEmail(value) {
    return EMAIL_RE.test(value.trim());
  }

  function showError(message) {
    errorEl.textContent = message;
  }

  function clearError() {
    errorEl.textContent = '';
  }

  function showThanks() {
    form.hidden = true;
    thanksEl.hidden = false;
  }

  function encodeFormData(data) {
    return Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
      })
      .join('&');
  }

  emailInput.addEventListener('input', clearError);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
      showError('Please enter your email.');
      emailInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    clearError();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const payload = {
      'form-name': 'awards-signup',
      email: email,
      'bot-field': ''
    };

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(payload)
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        showThanks();
      })
      .catch(function () {
        showError('Something went wrong. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join the list';
      });
  });
})();
