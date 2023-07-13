document.getElementById('form').addEventListener('submit', function (event) {
  clearErrors();

  // Get form field values
  var fname = document.getElementById('fname').value.trim();
  var lname = document.getElementById('last').value.trim();
  var email = document.getElementById('email').value.trim();
  var age = parseInt(document.getElementById('age').value.trim());
  var rating = parseInt(document.getElementById('rating').value.trim());
  var country = document.getElementById('country').value.trim();
  var select = document.getElementById("country");
  var otherCountryInput = document.getElementById("otherCountry");

  if (select.value === "Other") {
    select.value = otherCountryInput.value;
  }
  // Validate First Name
  if (!validateName(fname)) {
    showError('fnameError', 'First Name is required and should only contain letters.');
    event.preventDefault();
    return;
  }

  // Validate Last Name
  if (!validateName(lname)) {
    showError('lnameError', 'Last Name is required and should only contain letters.');
    event.preventDefault();
    return;
  }

  // Validate Email
  if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email address.');
    event.preventDefault();
    return;
  }

  // Validate Age
  if (!validateAge(age)) {
    showError('ageError', 'Age should be a number between 1 and 100.');
    event.preventDefault();
    return;
  }

  if(!validateCountry(country)){
    showError('countryError','Enter a valid country')
  }
  // Validate Rating
  if (!validateRating(rating)) {
    showError('ratingError', 'Rating should be a number between 1 and 10.');
    event.preventDefault();
    return;
  }  

  window.location.href = 'http://localhost:8000';
});

function validateName(name) {
  var nameRegex = /^[a-zA-Z]+$/;
  return name !== '' && nameRegex.test(name);
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateAge(age) {
  return !isNaN(age) && age >= 1 && age <= 100;
}
function validateCountry(country) {
    var countryRegex = /^[a-zA-Z\s]+$/;
    return country !== '' && countryRegex.test(country);
}
function validateRating(rating) {
  return !isNaN(rating) && rating >= 1 && rating <= 10;
}
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  var errorElements = document.getElementsByClassName('error');
  for (var i = 0; i < errorElements.length; i++) {
    errorElements[i].textContent = '';
  }
}
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

})

function handleCountryChange(select) {
  var otherCountryContainer = document.getElementById("otherCountryContainer");
  var otherCountryInput = document.getElementById("otherCountry");

  if (select.value === "Other") {
    otherCountryContainer.style.display = "block";
    otherCountryInput.required = true;
  } else {
    otherCountryContainer.style.display = "none";
    otherCountryInput.required = false;
  }
}