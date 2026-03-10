// Set cookie function
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get cookie function
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Show notification bar
function showNotificationBar() {
  var notificationBar = document.createElement("div");
  notificationBar.classList.add("notification-bar");
  notificationBar.innerHTML =
    '<p><i class="fa-duotone fa-circle-exclamation fa-beat" style="--fa-primary-color: #ffffff; --fa-secondary-color: #ffffff;"></i> Our website uses cookies and other tracking technologies, such as pixels, beacons, and other tools to automatically collect information about how you access and use our website. We or third parties may set these tools and use or disclose this information for purposes that may include improving the site, providing a more personalized experience, data analytics, or engaging in marketing activities, or ad retargeting. Some of these technologies may monitor or record your interactions with the website and others may track you across devices, time, and websites.  We encourage you to read our Privacy Policy located at <a href="/privacy/"> https://www.ontrac.com/privacy/ </a> to learn more about how this information is used and disclosed. You can find information on how to manage cookies in your browser settings. BY CONTINUING TO VISIT THIS WEBSITE, YOU CONSENT TO THE USE OF THESE WEB TOOLS AND THE INFORMATION THEY COLLECT AS SET FORTH IN THE PRIVACY POLICY. </p><button class="btn" onclick="hideNotificationBar()">OK</button>';
  document.body.appendChild(notificationBar);
}

// Hide notification bar and set cookie
function hideNotificationBar() {
  setCookie("cookieConsent", "true", 30);
  document.querySelector(".notification-bar").style.display = "none";
}

// Check if cookie is set
function checkCookieConsent() {
  var cookieConsent = getCookie("cookieConsent");
  if (cookieConsent == null) {
    showNotificationBar();
  }
}

// Run checkCookieConsent function on page load
document.addEventListener("DOMContentLoaded", function () {
  checkCookieConsent();
});
