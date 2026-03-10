const form = document.getElementById("contact-form");
const reasonField = document.getElementsByName("reason")[0];
const reasonFeedbackField = document.getElementById("js-delivery-feedback");
const reasonError = document.getElementById("reason-error");
const reasonFeedbackError = document.getElementById("reason-feedback-error");
const name = document.getElementsByName("contact")[0];
const nameError = document.getElementById("name-error");
const email = document.getElementById("track-question-email");
const emailError = document.getElementById("email-error");
const confirmEmail = document.getElementsByName("confirm_email")[0];
const confirmEmailError = document.getElementById("confirm-email-error");
const phone = document.getElementsByName("phone")[0];
const phoneError = document.getElementById("phone-error");
const trackingNumberField = document.getElementsByName("tracking_number")[0];
const trackingNumberError = document.getElementById("tracking-number-error");
const messageField = document.getElementsByName("message")[0];
const messageError = document.getElementById("message-error");
const captchaError = document.getElementById("captcha-error");
const formErrorMessage = document.getElementById("form-error-message");
const formMessage = document.getElementById("form-message");
const notifyMeTrackingNumberLegal = document.getElementById(
  "notifyMeTrackingNumberLegal"
);

/*
Blur Validation Events
*/

// Reason field blur
reasonField.addEventListener("change", validateReason);
reasonField.addEventListener("blur", validateReason);

function validateReason() {
  if (!reasonField.value) {
    reasonError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> A reason is required.';
    reasonError.style.display = "block";
  } else {
    reasonError.style.display = "none";
  }

  // Show or hide the Feedback Type field based on the selected reason
  const selectedReason = reasonField.value;
  const feedbackTypeField = document.getElementById("js-feedback-type");

  if (selectedReason === "FEEDBACK") {
    feedbackTypeField.style.display = "block";
    reasonFeedbackField.required = true;
  } else {
    feedbackTypeField.style.display = "none";
    reasonFeedbackField.required = false;
    reasonFeedbackField.selectedIndex = 0;
    reasonFeedbackError.style.display = "none";
  }
}

// Reason Feedback field blur
reasonFeedbackField.addEventListener("blur", validateReasonFeedback);
reasonFeedbackField.addEventListener("change", validateReasonFeedback);

function validateReasonFeedback() {
  if (reasonField.value === "FEEDBACK" && !reasonFeedbackField.value) {
    reasonFeedbackError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Please select a feedback type.';
    reasonFeedbackError.style.display = "block";
  } else {
    reasonFeedbackError.style.display = "none";
  }
}

// Name field blur
name.addEventListener("change", validateName);
name.addEventListener("blur", validateName);
name.addEventListener("input", validateName);

function validateName() {
  if (name.value.trim() === "") {
    nameError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Name is required.';
    nameError.style.display = "block";
  } else {
    nameError.style.display = "none";
  }
}

// Email blur and input
email.addEventListener("blur", validateEmailOnBlur);
email.addEventListener("input", validateEmail);

// Confirmation email blur and input
confirmEmail.addEventListener("blur", validateEmail);
confirmEmail.addEventListener("input", validateEmail);

function validateEmailOnBlur() {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    emailError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Email address is required.';
    emailError.style.display = "block";
  } else if (!isValidEmail(emailValue)) {
    emailError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Invalid email format.';
    emailError.style.display = "block";
  } else {
    emailError.style.display = "none";
  }
}

function validateEmail() {
  const emailValue = email.value.trim();
  const confirmEmailValue = confirmEmail.value.trim();

  if (emailValue !== confirmEmailValue) {
    confirmEmailError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Email addresses do not match.';
    confirmEmailError.style.display = "block";
  } else {
    confirmEmailError.style.display = "none";
  }
}

// Phone field blur
phone.addEventListener("blur", () => {
  const formattedPhone = formatPhoneNumber(phone.value);
  if (formattedPhone) {
    phone.value = formattedPhone;
    phoneError.style.display = "none";
  } else {
    phoneError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Invalid. Submit (XXX) XXX-XXXX.';
    phoneError.style.display = "block";
  }
});

// Tracking field blur
trackingNumberField.addEventListener("blur", () => {
  if (!trackingNumberField.value) {
    trackingNumberError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Tracking number required.';
    trackingNumberError.style.display = "block";
  } else {
    trackingNumberError.style.display = "none";
  }
});

// Message field blur
messageField.addEventListener("blur", () => {
  if (!messageField.value) {
    messageError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Message is required.';
    messageError.style.display = "block";
  } else if (messageField.value.length < 20) {
    messageError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Message must be at least 20 characters long.';
    messageError.style.display = "block";
  } else {
    messageError.style.display = "none";
  }
});

/*
Validate the form
*/

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Check if captcha is complete
  const token = document.getElementById("recaptcha-token").value;
  if (token === "") {
    captchaError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> reCAPTCHA check required.';
    captchaError.style.display = "block";
    captchaError.style.textAlign = "center";
    return;
  } else {
    captchaError.style.display = "none";
  }

  // Check Reason field
  if (!reasonField.value) {
    reasonError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> A reason is required.';
    reasonError.style.display = "block";
    return;
  } else {
    reasonError.style.display = "none";
  }

  // Check Reason Feedback field if applicable
  if (reasonField.value === "FEEDBACK" && !reasonFeedbackField.value) {
    reasonFeedbackError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Please select a feedback type.';
    reasonFeedbackError.style.display = "block";
    return;
  } else {
    reasonFeedbackError.style.display = "none";
  }

  // Check Name field
  if (name.value.trim() === "") {
    nameError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Name is required.';
    nameError.style.display = "block";
    return;
  } else {
    nameError.style.display = "none";
  }

  // Check Email field
  if (!email.value) {
    emailError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Email address is required.';
    emailError.style.display = "block";
    return;
  } else if (!isValidEmail(email.value)) {
    emailError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Invalid email format.';
    emailError.style.display = "block";
    return;
  } else if (email.value !== confirmEmail.value) {
    confirmEmailError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Email addresses do not match.';
    confirmEmailError.style.display = "block";
    return;
  } else {
    emailError.style.display = "none";
    confirmEmailError.style.display = "none";
  }

  // Check Phone field
  if (!isValidPhone(phone.value)) {
    phoneError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Invalid. Submit (XXX) XXX-XXXX.';
    phoneError.style.display = "block";
    return;
  } else {
    phoneError.style.display = "none";
  }

  // Check Tracking Number field
  if (!trackingNumberField.value) {
    trackingNumberError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Tracking number required.';
    trackingNumberError.style.display = "block";
    return;
  } else {
    trackingNumberError.style.display = "none";
  }

  // Check Message field
  if (!messageField.value) {
    messageError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Message is required.';
    messageError.style.display = "block";
    return;
  } else if (messageField.value.length < 20) {
    messageError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> Message must be at least 20 characters long.';
    messageError.style.display = "block";
    return;
  } else {
    messageError.style.display = "none";
  }

  // Hide any previous error messages
  formErrorMessage.style.display = "none";

  // Modify the form data as required
  const formData = new FormData(form);
  formData.delete("reason_feedback");
  formData.delete("g-recaptcha-response");
  formData.delete("confirm_email");

  if (reasonField.value === "FEEDBACK") {
    formData.set("reason", reasonFeedbackField.value);
  }

  // Show a message while sending
  formMessage.innerHTML =
    '<i class="fa-duotone fa-spinner-third fa-spin"></i> Sending Message to OnTrac...';
  formMessage.style.display = "block";
  formMessage.style.textAlign = "center";

  // Check the tracking number and update the form action URL if necessary
  if (
    trackingNumberField.value.startsWith("B") ||
    trackingNumberField.value.startsWith("C") ||
    trackingNumberField.value.startsWith("D")
  ) {
    form.action =
      "https://shipontrac.net/PublicWebsiteServices/api/ContactUs/v4?redirect_url=https://www.ontrac.com/thank-you";
  } else {
    form.action =
      "https://t.lasership.com/track_contact.php?redirect_url=https://www.ontrac.com/thank-you";
  }

  try {
    // Send the form data to the API
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });

    // Check the response status code and redirect on success
    if (response.status === 200) {
      window.location.href = form.action.split("?")[1].split("=")[1];
    } else {
      // Show a generic error if the response status is not 200
      formErrorMessage.innerHTML =
        '<i class="fa-duotone fa-circle-exclamation"></i> There was an error submitting the form. Try again or call Customer Care at 800.334.5000.';
      formErrorMessage.style.textAlign = "center";
      formErrorMessage.style.display = "block";
    }
  } catch (error) {
    // Show a generic error if there was an exception while submitting the form
    formErrorMessage.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> There was an error submitting the form. Try again or call Customer Care at 800.334.5000.';
    formErrorMessage.style.textAlign = "center";
    formErrorMessage.style.display = "block";
  } finally {
    // Hide the loading message
    formMessage.style.display = "none";
  }
});

function updateCaptchaError() {
  const token = document.getElementById("recaptcha-token").value;
  if (token === "") {
    captchaError.innerHTML =
      '<i class="fa-duotone fa-circle-exclamation"></i> reCAPTCHA check required.';
    captchaError.style.display = "block";
    captchaError.style.textAlign = "center";
  } else {
    captchaError.style.display = "none";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Check if captcha is complete
  updateCaptchaError();

  // ...
});

function setToken(response) {
  const tokenInput = document.getElementById("recaptcha-token");
  tokenInput.value = response;
  tokenInput.dispatchEvent(new Event("input"));
  updateCaptchaError();
}

// Check email
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Check Phone
function isValidPhone(phone) {
  const regex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return regex.test(phone);
}

// Format Phone
function formatPhoneNumber(phone) {
  // Remove non-numeric characters from the input
  const cleaned = phone.replace(/\D/g, "");
  // Test the cleaned phone number against the desired format regex
  const regex = /^(\d{3})(\d{3})(\d{4})$/;
  if (regex.test(cleaned)) {
    // If the cleaned phone number matches the desired format, reformat
    return cleaned.replace(regex, "($1) $2-$3");
  }
  // If the cleaned phone number doesn't match the desired format, return null
  return null;
}

// Put the tracking number in the field
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const trackingNumber = urlParams.get("number");
  if (trackingNumber) {
    trackingNumberField.value = trackingNumber.trim();
    notifyMeTrackingNumberLegal.textContent = trackingNumber.trim();
    trackingNumberField.readOnly = true;
  }
});

// Remaining code...
