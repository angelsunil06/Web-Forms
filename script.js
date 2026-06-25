const form = document.getElementById("feedbackForm");
const successMessage = document.getElementById("successMessage");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const topicInput = document.getElementById("topic");
const messageInput = document.getElementById("message");
const termsInput = document.getElementById("terms");

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  input.classList.add("invalid");
  input.classList.remove("valid");
  if (error) error.textContent = message;
}

function showSuccess(input) {
  const error = input.parentElement.querySelector(".error");
  input.classList.remove("invalid");
  input.classList.add("valid");
  if (error) error.textContent = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

function validateName() {
  if (nameInput.value.trim().length < 3) {
    showError(nameInput, "Name must be at least 3 characters.");
    return false;
  }
  showSuccess(nameInput);
  return true;
}

function validateEmailField() {
  if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email address.");
    return false;
  }
  showSuccess(emailInput);
  return true;
}

function validatePhoneField() {
  if (!validatePhone(phoneInput.value.trim())) {
    showError(phoneInput, "Phone number must be exactly 10 digits.");
    return false;
  }
  showSuccess(phoneInput);
  return true;
}

function validateTopic() {
  if (topicInput.value === "") {
    showError(topicInput, "Please select a feedback topic.");
    return false;
  }
  showSuccess(topicInput);
  return true;
}

function validateRating() {
  const selectedRating = document.querySelector('input[name="rating"]:checked');
  const ratingError = document.getElementById("ratingError");

  if (!selectedRating) {
    ratingError.textContent = "Please choose a rating.";
    return false;
  }

  ratingError.textContent = "";
  return true;
}

function validateMessage() {
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Feedback must be at least 10 characters.");
    return false;
  }
  showSuccess(messageInput);
  return true;
}

function validateTerms() {
  const termsError = document.getElementById("termsError");

  if (!termsInput.checked) {
    termsError.textContent = "Please confirm before submitting.";
    return false;
  }

  termsError.textContent = "";
  return true;
}

function validateForm() {
  const checks = [
    validateName(),
    validateEmailField(),
    validatePhoneField(),
    validateTopic(),
    validateRating(),
    validateMessage(),
    validateTerms()
  ];

  return checks.every(Boolean);
}

/* Real-time validation */
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmailField);
phoneInput.addEventListener("input", validatePhoneField);
topicInput.addEventListener("change", validateTopic);
messageInput.addEventListener("input", validateMessage);
termsInput.addEventListener("change", validateTerms);

document.querySelectorAll('input[name="rating"]').forEach(radio => {
  radio.addEventListener("change", validateRating);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    successMessage.textContent = "Feedback submitted successfully!";
    form.reset();

    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(field => {
      field.classList.remove("valid", "invalid");
    });

    document.getElementById("ratingError").textContent = "";
    document.getElementById("termsError").textContent = "";
  } else {
    successMessage.textContent = "";
  }
});
