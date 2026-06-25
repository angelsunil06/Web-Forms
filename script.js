const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const topicInput = document.getElementById("topic");
const messageInput = document.getElementById("message");
const termsInput = document.getElementById("terms");
const successMessage = document.getElementById("successMessage");

function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  input.classList.add("invalid");
  input.classList.remove("valid");
  error.textContent = message;
}

function showSuccess(input) {
  const error = input.parentElement.querySelector(".error");
  input.classList.remove("invalid");
  input.classList.add("valid");
  error.textContent = "";
}

function validateEmail(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function validateForm() {
  let isValid = true;
  successMessage.textContent = "";

  if (nameInput.value.trim().length < 3) {
    showError(nameInput, "Name must be at least 3 characters.");
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email address.");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  if (!/^\\d{10}$/.test(phoneInput.value.trim())) {
    showError(phoneInput, "Phone number must be exactly 10 digits.");
    isValid = false;
  } else {
    showSuccess(phoneInput);
  }

  if (topicInput.value === "") {
    showError(topicInput, "Please select a feedback topic.");
    isValid = false;
  } else {
    showSuccess(topicInput);
  }

  const selectedRating = document.querySelector('input[name="rating"]:checked');
  const ratingError = document.getElementById("ratingError");
  if (!selectedRating) {
    ratingError.textContent = "Please choose a rating.";
    isValid = false;
  } else {
    ratingError.textContent = "";
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Feedback must be at least 10 characters.");
    isValid = false;
  } else {
    showSuccess(messageInput);
  }

  const termsError = document.getElementById("termsError");
  if (!termsInput.checked) {
    termsError.textContent = "Please confirm before submitting.";
    isValid = false;
  } else {
    termsError.textContent = "";
  }

  return isValid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    successMessage.textContent = "Feedback submitted successfully!";
    form.reset();

    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(field => {
      field.classList.remove("valid", "invalid");
    });
  }
});