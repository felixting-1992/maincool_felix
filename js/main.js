/* =========================================================
   Recipe Secrets Restaurant — shared script
   Handles: mobile nav toggle, footer year, specials data,
   reservation form validation, contact form validation.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  setFooterYear();
  renderSpecials();
  initReservationForm();
  initContactForm();
});

/* ---------- Mobile hamburger menu ---------- */
function initMobileNav() {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  var backdrop = document.querySelector(".nav-backdrop");
  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.classList.remove("is-visible");
  }

  function openNav() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    if (backdrop) backdrop.classList.add("is-visible");
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("is-open");
    isOpen ? closeNav() : openNav();
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeNav);
  }

  // Close menu when a nav link is clicked (useful on mobile)
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  // Close on Escape for keyboard users
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
}

/* ---------- Footer copyright year ---------- */
function setFooterYear() {
  var yearEl = document.getElementById("copyright-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Weekly specials data ----------
   Edit this array each week to update the Specials page.
   Fields: name, description, price (string incl. currency symbol),
   tags (array of short dietary tags: "V", "GF", "Spicy", etc.)
--------------------------------------------- */
var weeklySpecials = [
  {
    name: "Seared Duck Breast",
    description: "Pan-seared duck breast with a cherry-port reduction, roasted root vegetables, and crispy sage.",
    price: "$28",
    tags: ["GF"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Wild Mushroom Risotto",
    description: "Creamy arborio rice slow-cooked with wild mushrooms, truffle oil, and aged parmesan.",
    price: "$22",
    tags: ["V", "GF"],
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Charred Harissa Cauliflower",
    description: "Whole roasted cauliflower with harissa glaze, herbed yogurt, and pomegranate seeds.",
    price: "$19",
    tags: ["V", "Spicy"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pan-Roasted Sea Bass",
    description: "Crispy-skin sea bass with saffron beurre blanc, charred leeks, and fingerling potatoes.",
    price: "$31",
    tags: ["GF"],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  },
];

function renderSpecials() {
  var grid = document.getElementById("specials-grid");
  if (!grid) return;

  grid.innerHTML = weeklySpecials
    .map(function (dish) {
      var tagsHtml = dish.tags
        .map(function (tag) {
          return '<span class="tag">' + tag + "</span>";
        })
        .join("");

      return (
        '<article class="card">' +
        '<img src="' +
        dish.image +
        '" alt="' +
        dish.name +
        ' plated at Recipe Secrets Restaurant" loading="lazy">' +
        '<div class="card-body">' +
        "<h3>" +
        dish.name +
        "</h3>" +
        "<p>" +
        dish.description +
        "</p>" +
        '<div class="tags">' +
        tagsHtml +
        "</div>" +
        '<p class="card-price">' +
        dish.price +
        "</p>" +
        "</div>" +
        "</article>"
      );
    })
    .join("");
}

/* ---------- Shared form helpers ---------- */
function showFieldError(field, message) {
  var wrapper = field.closest(".form-field");
  var errorEl = wrapper ? wrapper.querySelector(".error-message") : null;
  if (wrapper) wrapper.classList.add("has-error");
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(field) {
  var wrapper = field.closest(".form-field");
  var errorEl = wrapper ? wrapper.querySelector(".error-message") : null;
  if (wrapper) wrapper.classList.remove("has-error");
  if (errorEl) errorEl.textContent = "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/* Submits the form data to Formspree via fetch so the page can show
   a success message without a full-page reload / backend of our own. */
function submitToFormspree(form, onSuccess, onError) {
  var endpoint = form.getAttribute("action");
  fetch(endpoint, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  })
    .then(function (response) {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(function () {
      onError();
    });
}

/* ---------- Reservation form ---------- */
function initReservationForm() {
  var form = document.getElementById("reservation-form");
  if (!form) return;

  var successMessage = document.getElementById("reservation-success");
  var dateField = form.querySelector("#res-date");

  // Prevent picking a past date in supporting browsers
  if (dateField) {
    var today = new Date().toISOString().split("T")[0];
    dateField.setAttribute("min", today);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;

    var name = form.querySelector("#res-name");
    var email = form.querySelector("#res-email");
    var phone = form.querySelector("#res-phone");
    var date = form.querySelector("#res-date");
    var time = form.querySelector("#res-time");
    var partySize = form.querySelector("#res-party-size");

    [name, email, phone, date, time, partySize].forEach(clearFieldError);

    if (!name.value.trim()) {
      showFieldError(name, "Please enter your name.");
      valid = false;
    }

    if (!email.value.trim()) {
      showFieldError(email, "Please enter your email.");
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showFieldError(email, "Please enter a valid email address.");
      valid = false;
    }

    if (!phone.value.trim()) {
      showFieldError(phone, "Please enter your phone number.");
      valid = false;
    }

    if (!date.value) {
      showFieldError(date, "Please choose a reservation date.");
      valid = false;
    } else {
      var chosenDate = new Date(date.value + "T00:00:00");
      var todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (chosenDate < todayDate) {
        showFieldError(date, "Please choose today or a future date.");
        valid = false;
      }
    }

    if (!time.value) {
      showFieldError(time, "Please choose a time.");
      valid = false;
    }

    var size = Number(partySize.value);
    if (!partySize.value || size < 1 || size > 12) {
      showFieldError(partySize, "Party size must be between 1 and 12.");
      valid = false;
    }

    if (!valid) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    submitToFormspree(
      form,
      function () {
        form.reset();
        form.hidden = true;
        if (successMessage) successMessage.classList.add("is-visible");
        submitBtn.disabled = false;
        submitBtn.textContent = "Request Reservation";
      },
      function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Request Reservation";
        alert(
          "Sorry, something went wrong submitting your reservation. Please try again, or call us directly."
        );
      }
    );
  });
}

/* ---------- Contact form ---------- */
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var successMessage = document.getElementById("contact-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var valid = true;

    var name = form.querySelector("#contact-name");
    var email = form.querySelector("#contact-email");
    var message = form.querySelector("#contact-message");

    [name, email, message].forEach(clearFieldError);

    if (!name.value.trim()) {
      showFieldError(name, "Please enter your name.");
      valid = false;
    }

    if (!email.value.trim()) {
      showFieldError(email, "Please enter your email.");
      valid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showFieldError(email, "Please enter a valid email address.");
      valid = false;
    }

    if (!message.value.trim()) {
      showFieldError(message, "Please enter a message.");
      valid = false;
    }

    if (!valid) return;

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    submitToFormspree(
      form,
      function () {
        form.reset();
        form.hidden = true;
        if (successMessage) successMessage.classList.add("is-visible");
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      },
      function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        alert("Sorry, something went wrong sending your message. Please try again, or email us directly.");
      }
    );
  });
}
