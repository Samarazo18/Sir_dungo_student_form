const form = document.getElementById("registrationForm");

// Grab inputs
const firstName = document.getElementById("firstName");
const middleName = document.getElementById("middleName");
const lastName = document.getElementById("lastName");
const course = document.getElementById("course");
const password = document.getElementById("password");
const gender = document.getElementsByName("gender");
const terms = document.getElementById("terms");
const strengthBar = document.getElementById("strengthBar");

// Regex for validation
const nameRegex = /^[A-Za-z]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

// Auto-format names while typing
const nameFields = [firstName, middleName, lastName];
nameFields.forEach(field => {
  field.addEventListener("input", function() {
    let val = field.value;
    val = val.replace(/[^a-zA-Z]/g, ""); // remove numbers/special chars
    if(val.length > 0){
      val = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }
    field.value = val;
  });
});

// Password strength meter
password.addEventListener("input", function() {
  const val = password.value;
  let strength = 0; // 0 = weak, 1 = medium, 2 = strong

  // Calculate strength
  if (val.length >= 8) {
    if (/[A-Z]/.test(val) && /\d/.test(val) && /[@$!%*?&]/.test(val)) {
      strength = 2; // Strong
    } else if (/[A-Z]/.test(val) && /\d/.test(val)) {
      strength = 1; // Medium
    }
  }

  // Update bar
  if (strength === 0) {
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
  } else if (strength === 1) {
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
  } else if (strength === 2) {
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
  }

  if(val.length === 0){
    strengthBar.style.width = "0%";
  }
});

// Form submit validation
form.addEventListener("submit", function(e) {
  e.preventDefault();
  let isValid = true;

  // Clear errors
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  // First Name
  if (!nameRegex.test(firstName.value)) {
    showError(firstName, "Only letters allowed");
    isValid = false;
  }

  // Middle Name (optional)
  if (middleName.value && !nameRegex.test(middleName.value)) {
    showError(middleName, "Only letters allowed");
    isValid = false;
  }

  // Last Name
  if (!nameRegex.test(lastName.value)) {
    showError(lastName, "Only letters allowed");
    isValid = false;
  }

  // Course
  if (course.value === "") {
    showError(course, "Please select a course");
    isValid = false;
  }

  // Password
  if (!passwordRegex.test(password.value)) {
    showError(password, "Min 8 chars, 1 uppercase, 1 number, 1 special char");
    isValid = false;
  }

  // Gender
  let genderSelected = false;
  gender.forEach(g => { if (g.checked) genderSelected = true; });
  if (!genderSelected) {
    showError(gender[0], "Select gender");
    isValid = false;
  }

  // Terms
  if (!terms.checked) {
    showError(terms, "You must accept terms");
    isValid = false;
  }

  // Success
  if (isValid) {
    alert("Registration Successful!");
    form.reset();
    strengthBar.style.width = "0%";
  }
});

// Show error function
function showError(input, message) {
  const formGroup = input.closest(".form-group");
  formGroup.querySelector(".error").textContent = message;
}