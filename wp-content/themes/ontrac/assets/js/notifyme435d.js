function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('notificationForm');
    const notifyPhone = document.getElementById('notify_phone');
    const phoneError = document.getElementById('phoneError');
    const notifyOptionsCheckboxes = form.querySelectorAll('input[name="notify_options"]');
    const eventsError = document.getElementById('eventsError');
    const notifyTerms = document.getElementById('notify_terms');
    const termsError = document.getElementById('termsError');
    const captchaError = document.getElementById('captchaError');
    const trackingError = document.getElementById('trackingError');
    const successMessage = document.getElementById('successMessage');
    const notifyformMessage = document.getElementById("notify-form-message");

    // Fetch tracking information from the API
    document.querySelector("#notify_tracking_number").value = new URLSearchParams(
      window.location.search
    )
      .get("number")
      .trim();


    // Validate and format phone number on blur
    notifyPhone.addEventListener('blur', function () {
      const formatted = formatPhoneNumber(this.value);
      if (formatted) {
        this.value = formatted;
        phoneError.style.display = 'none';
      } else {
        phoneError.innerHTML = '<i class="fa-duotone fa-circle-exclamation"></i> Invalid. Submit (XXX) XXX-XXXX.';
        phoneError.style.display = 'block';
      }
    });

    // Validate events selection on blur
    for (let checkbox of notifyOptionsCheckboxes) {
      checkbox.addEventListener('change', function () {
        let selected = false;
        for (let cb of notifyOptionsCheckboxes) {
          if (cb.checked) {
            selected = true;
            break;
          }
        }
        if (selected) {
          eventsError.style.display = 'none';
        } else {
          eventsError.innerHTML = '<i class="fa-duotone fa-circle-exclamation"></i> Please select at least one event.';
          eventsError.style.display = 'block';
        }
      });
    }

    // Validate terms acceptance on blur
    notifyTerms.addEventListener('change', function () {
      if (this.checked) {
        termsError.style.display = 'none';
      } else {
        termsError.innerHTML = '<i class="fa-duotone fa-circle-exclamation"></i> Please accept the terms and conditions.';
        termsError.style.display = 'block';
      }
    });

    // if (number) {
    //   const trackingURL = `https://fastrac.ontrac.com/PackageServices/tracking/${number}`;

    //   fetch(trackingURL)
    //     .then(response => response.json())
    //     .then(data => {
    //       const packageInfo = data.Packages[0];
    //       const origin = packageInfo.Origin;
    //       const consignee = packageInfo.Consignee;
    //       const utcOrderPlaced = packageInfo.UtcOrderPlaced;

    //       document.getElementById('notify_tracking_number').value = number;
    //       document.getElementById('origin_city').value = origin.City;
    //       document.getElementById('destination_city').value = consignee.City;
    //       document.getElementById('utcorderplaced').value = utcOrderPlaced;
    //     })
    //     .catch(error => {
    //       trackingError.textContent = 'Error fetching tracking data. Please try again later.';
    //       trackingError.style.display = 'block';
    //       console.error('Error fetching tracking data:', error);
    //     });
    // } else {
    //   trackingError.textContent = 'Tracking number not found in URL parameters.';
    //   trackingError.style.display = 'block';
    //   console.error('Tracking number not found in URL parameters.');
    // }



    // ...

    form.addEventListener('submit', async function submitHandler(event) {
      event.preventDefault();

      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        captchaError.innerHTML = '<i class="fa-duotone fa-circle-exclamation"></i> reCAPTCHA check required.';
        captchaError.style.display = 'block';
        captchaError.style.textAlign = "center";
        return;
      } else {
        captchaError.style.display = "none";
      }

      const formattedPhone = formatPhoneNumber(notifyPhone.value);
      if (!formattedPhone) {
        phoneError.innerHTML = '<i class="fa-duotone fa-circle-exclamation"></i> Invalid phone number format.';
        phoneError.style.display = 'block';
        return;
      }

      let selected = false;
      for (let checkbox of notifyOptionsCheckboxes) {
        if (checkbox.checked) {
          selected = true;
          break;
        }
      }
      if (!selected) {
        eventsError.innerHTML = '<i class="fa-duotone fa-circle-exclamation"></i> Please select at least one event.';
        eventsError.style.display = 'block';
        return;
      }

      if (!notifyTerms.checked) {
        termsError.innerHTML = '<i class="fa-duotone fa-circle-exclamation"></i> Please accept the terms and conditions.';
        termsError.style.display = 'block';
        return;
      }

      const selectedEvents = Array.from(notifyOptionsCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

      const payload = {
        notify_phone: formattedPhone,
        notify_tracking_number: document.querySelector('#notify_tracking_number').value = new URLSearchParams(window.location.search).get('number').trim(),
        origin_city: form.querySelector('#origin_city').value,
        destination_city: form.querySelector('#destination_city').value,
        utcorderplaced: form.querySelector('#utcorderplaced').value,
        notify_terms: form.querySelector('#notify_terms').checked ? 1 : 0,
        recaptchatoken: recaptchaResponse,
        notify_events: selectedEvents
      };

      // Show a message while sending
      notifyformMessage.innerHTML =
        '<i class="fa-duotone fa-spinner-third fa-spin"></i> Sending Message to OnTrac...';
      notifyformMessage.style.display = "block";
      notifyformMessage.style.textAlign = "center";

      // Send an AJAX request
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          notifyformMessage.style.display = "none";
          successMessage.innerHTML = 'All set! You will receive text messages with delivery updates soon.';
          successMessage.style.display = 'block';
        } else {
          throw new Error('Error submitting form.');
        }
      } catch (error) {
        const generalErrorMessage = '<i class="fa-duotone fa-circle-exclamation"></i> There was an error enrolling your phone number. Try again or use the Contact Form below,';
        notifyformMessage.innerHTML = generalErrorMessage;
        notifyformMessage.style.display = 'block';
        notifyformMessage.style.textAlign = "left";
        notifyformMessage.style.margin = "0 auto";
        notifyformMessage.style.color = "#d22730";
      }

      // Reset the reCAPTCHA widget to remove the g-recaptcha-response value
      grecaptcha.reset();
    });
  });
