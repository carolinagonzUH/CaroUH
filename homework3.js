/*
 * Name: Carolina Gonzalez
 * File: homework3.js
 * Date Created: 2025-02-03
 * Date Updated: 2025-04-13
 * Purpose: JavaScript for MIS 3371 HW3 - Patient Registration Form with validation
 */

// Initialize the page when it loads
window.onload = function() {
    // Set today's date
    const today = new Date();
    document.getElementById("today").textContent = today.toLocaleDateString();
    
    // Set up event listeners for form controls
    setupFormEventListeners();
    
    // Set up slider value display
    const slider = document.getElementById("healthRating");
    const ratingValue = document.getElementById("ratingValue");
    
    // Update rating value display as the slider moves
    slider.addEventListener("input", function() {
        ratingValue.textContent = this.value;
    });
    
    // Form validation on submit
    document.getElementById("patientForm").addEventListener("submit", function(event) {
        // Prevent form submission until we validate
        event.preventDefault();
        
        // Validate form and submit if valid
        if (validateEntireForm()) {
            alert("Form submitted successfully!");
            this.submit();
        }
    });
    
    // Add review button functionality
    document.getElementById("reviewButton").addEventListener("click", reviewFormData);
    
    // Add edit button functionality (return to form)
    document.getElementById("editButton").addEventListener("click", function() {
        document.getElementById("reviewSection").style.display = "none";
        document.getElementById("patientForm").style.display = "block";
    });
    
    // Add confirm & submit button functionality
    document.getElementById("confirmSubmit").addEventListener("click", function() {
        document.getElementById("patientForm").submit();
    });
};

// Set up validation event listeners for form elements
function setupFormEventListeners() {
    // Personal Information validation
    document.getElementById("firstName").addEventListener("blur", validateFirstName);
    document.getElementById("lastName").addEventListener("blur", validateLastName);
    document.getElementById("middleInitial").addEventListener("blur", validateMiddleInitial);
    document.getElementById("dob").addEventListener("change", validateDOB);
    document.getElementById("ssn").addEventListener("blur", validateSSN);
    
    // Contact Information validation
    document.getElementById("address1").addEventListener("blur", validateAddress1);
    document.getElementById("city").addEventListener("blur", validateCity);
    document.getElementById("state").addEventListener("change", validateState);
    document.getElementById("zipCode").addEventListener("blur", validateZipCode);
    document.getElementById("phone").addEventListener("blur", validatePhone);
    document.getElementById("email").addEventListener("blur", validateEmail);
    
    // User Account validation
    document.getElementById("userId").addEventListener("blur", validateUserId);
    document.getElementById("password").addEventListener("blur", validatePassword);
    document.getElementById("confirmPassword").addEventListener("blur", validateConfirmPassword);
}

// Validate the entire form - called on submit
function validateEntireForm() {
    let isValid = true;
    
    // Personal Information
    isValid = validateFirstName() && isValid;
    isValid = validateLastName() && isValid;
    isValid = validateMiddleInitial() && isValid;
    isValid = validateDOB() && isValid;
    isValid = validateSSN() && isValid;
    isValid = validateGender() && isValid;
    
    // Contact Information
    isValid = validateAddress1() && isValid;
    isValid = validateCity() && isValid;
    isValid = validateState() && isValid;
    isValid = validateZipCode() && isValid;
    isValid = validatePhone() && isValid;
    isValid = validateEmail() && isValid;
    
    // Insurance Information
    isValid = validateInsurance() && isValid;
    isValid = validateVaccinated() && isValid;
    
    // User Account
    isValid = validateUserId() && isValid;
    isValid = validatePassword() && isValid;
    isValid = validateConfirmPassword() && isValid;
    
    return isValid;
}

// Validation for individual fields

// First Name Validation
function validateFirstName() {
    const firstName = document.getElementById("firstName");
    const errorSpan = document.getElementById("firstNameError");
    
    if (!firstName.value.trim()) {
        errorSpan.textContent = "First name is required";
        return false;
    } else if (!/^[A-Za-z\-']{1,30}$/.test(firstName.value)) {
        errorSpan.textContent = "First name can only contain letters, hyphens, and apostrophes";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Last Name Validation
function validateLastName() {
    const lastName = document.getElementById("lastName");
    const errorSpan = document.getElementById("lastNameError");
    
    if (!lastName.value.trim()) {
        errorSpan.textContent = "Last name is required";
        return false;
    } else if (!/^[A-Za-z0-9\-']{1,30}$/.test(lastName.value)) {
        errorSpan.textContent = "Last name can only contain letters, numbers, hyphens, and apostrophes";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Middle Initial Validation
function validateMiddleInitial() {
    const middleInitial = document.getElementById("middleInitial");
    const errorSpan = document.getElementById("middleInitialError");
    
    if (middleInitial.value && !/^[A-Za-z]$/.test(middleInitial.value)) {
        errorSpan.textContent = "Middle initial must be a single letter";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Date of Birth Validation
function validateDOB() {
    const dob = document.getElementById("dob");
    const errorSpan = document.getElementById("dobError");
    
    if (!dob.value) {
        errorSpan.textContent = "Date of birth is required";
        return false;
    }
    
    const dobDate = new Date(dob.value);
    const today = new Date();
    const oneHundredTwentyYearsAgo = new Date();
    oneHundredTwentyYearsAgo.setFullYear(today.getFullYear() - 120);
    
    if (dobDate > today) {
        errorSpan.textContent = "Date of birth cannot be in the future";
        return false;
    } else if (dobDate < oneHundredTwentyYearsAgo) {
        errorSpan.textContent = "Date of birth cannot be more than 120 years ago";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// SSN Validation
function validateSSN() {
    const ssn = document.getElementById("ssn");
    const errorSpan = document.getElementById("ssnError");
    
    if (!ssn.value) {
        errorSpan.textContent = "Social Security Number is required";
        return false;
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn.value)) {
        errorSpan.textContent = "SSN must be in format XXX-XX-XXXX";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Gender Validation
function validateGender() {
    const genderButtons = document.getElementsByName("gender");
    const errorSpan = document.getElementById("genderError");
    let selected = false;
    
    for (const radio of genderButtons) {
        if (radio.checked) {
            selected = true;
            break;
        }
    }
    
    if (!selected) {
        errorSpan.textContent = "Please select a gender";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Address Line 1 Validation
function validateAddress1() {
    const address1 = document.getElementById("address1");
    const errorSpan = document.getElementById("address1Error");
    
    if (!address1.value.trim()) {
        errorSpan.textContent = "Address is required";
        return false;
    } else if (address1.value.length < 2) {
        errorSpan.textContent = "Address must be at least 2 characters";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// City Validation
function validateCity() {
    const city = document.getElementById("city");
    const errorSpan = document.getElementById("cityError");
    
    if (!city.value.trim()) {
        errorSpan.textContent = "City is required";
        return false;
    } else if (city.value.length < 2) {
        errorSpan.textContent = "City must be at least 2 characters";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// State Validation
function validateState() {
    const state = document.getElementById("state");
    const errorSpan = document.getElementById("stateError");
    
    if (!state.value) {
        errorSpan.textContent = "Please select a state";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Zip Code Validation
function validateZipCode() {
    const zipCode = document.getElementById("zipCode");
    const errorSpan = document.getElementById("zipCodeError");
    
    if (!zipCode.value) {
        errorSpan.textContent = "Zip Code is required";
        return false;
    } else if (!/^\d{5}(-\d{4})?$/.test(zipCode.value)) {
        errorSpan.textContent = "Zip Code must be 5 digits or 5+4 format";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Phone Validation
function validatePhone() {
    const phone = document.getElementById("phone");
    const errorSpan = document.getElementById("phoneError");
    
    if (!phone.value) {
        errorSpan.textContent = "Phone number is required";
        return false;
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone.value)) {
        errorSpan.textContent = "Phone must be in format (XXX) XXX-XXXX";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Email Validation
function validateEmail() {
    const email = document.getElementById("email");
    const errorSpan = document.getElementById("emailError");
    
    if (!email.value) {
        errorSpan.textContent = "Email is required";
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errorSpan.textContent = "Please enter a valid email address";
        return false;
    } else {
        // Force email to lowercase
        email.value = email.value.toLowerCase();
        errorSpan.textContent = "";
        return true;
    }
}

// Insurance Validation
function validateInsurance() {
    const insuranceButtons = document.getElementsByName("insurance");
    const errorSpan = document.getElementById("insuranceError");
    let selected = false;
    
    for (const radio of insuranceButtons) {
        if (radio.checked) {
            selected = true;
            break;
        }
    }
    
    if (!selected) {
        errorSpan.textContent = "Please select an insurance option";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Vaccination Validation
function validateVaccinated() {
    const vaccinatedButtons = document.getElementsByName("vaccinated");
    const errorSpan = document.getElementById("vaccinatedError");
    let selected = false;
    
    for (const radio of vaccinatedButtons) {
        if (radio.checked) {
            selected = true;
            break;
        }
    }
    
    if (!selected) {
        errorSpan.textContent = "Please select a vaccination option";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// User ID Validation
function validateUserId() {
    const userId = document.getElementById("userId");
    const errorSpan = document.getElementById("userIdError");
    
    if (!userId.value) {
        errorSpan.textContent = "User ID is required";
        return false;
    } else if (!/^[a-zA-Z]/.test(userId.value)) {
        errorSpan.textContent = "User ID must start with a letter";
        return false;
    } else if (userId.value.length < 5) {
        errorSpan.textContent = "User ID must be at least 5 characters";
        return false;
    } else if (userId.value.length > 20) {
        errorSpan.textContent = "User ID cannot exceed 20 characters";
        return false;
    } else if (!/^[a-zA-Z0-9_-]+$/.test(userId.value)) {
        errorSpan.textContent = "User ID can only contain letters, numbers, underscore and dash";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Password Validation
function validatePassword() {
    const password = document.getElementById("password");
    const errorSpan = document.getElementById("passwordError");
    
    if (!password.value) {
        errorSpan.textContent = "Password is required";
        return false;
    } else if (password.value.length < 8) {
        errorSpan.textContent = "Password must be at least 8 characters";
        return false;
    } else if (!/[A-Z]/.test(password.value)) {
        errorSpan.textContent = "Password must contain at least one uppercase letter";
        return false;
    } else if (!/[a-z]/.test(password.value)) {
        errorSpan.textContent = "Password must contain at least one lowercase letter";
        return false;
    } else if (!/\d/.test(password.value)) {
        errorSpan.textContent = "Password must contain at least one number";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Confirm Password Validation
function validateConfirmPassword() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const errorSpan = document.getElementById("confirmPasswordError");
    
    if (!confirmPassword.value) {
        errorSpan.textContent = "Please confirm your password";
        return false;
    } else if (confirmPassword.value !== password.value) {
        errorSpan.textContent = "Passwords do not match";
        return false;
    } else {
        errorSpan.textContent = "";
        return true;
    }
}

// Function to format phone number as user types
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 0) {
            if (input.length <= 3) {
                e.target.value = '(' + input;
            } else if (input.length <= 6) {
                e.target.value = '(' + input.substring(0, 3) + ') ' + input.substring(3);
            } else {
                e.target.value = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + '-' + input.substring(6, 10);
            }
        }
    });
    
    // Format SSN as user types
    const ssnInput = document.getElementById('ssn');
    
    ssnInput.addEventListener('input', function(e) {
        let input = e.target.value.replace(/\D/g, '');
        if (input.length > 0) {
            if (input.length <= 3) {
                e.target.value = input;
            } else if (input.length <= 5) {
                e.target.value = input.substring(0, 3) + '-' + input.substring(3);
            } else {
                e.target.value = input.substring(0, 3) + '-' + input.substring(3, 5) + '-' + input.substring(5, 9);
            }
        }
    });
});

// Review Form Data
function reviewFormData() {
    // Validate the form first
    if (!validateEntireForm()) {
        alert("Please correct the errors in the form before reviewing.");
        return;
    }
    
    // Get form and review section
    const form = document.getElementById("patientForm");
    const reviewSection = document.getElementById("reviewSection");
    const reviewContent = document.getElementById("reviewContent");
    
    // Create HTML table for review
    let reviewHTML = "<table class='review-table'>";
    reviewHTML += "<tr><th colspan='2'>Personal Information</th></tr>";
    
    // Personal Information
    reviewHTML += `<tr><td>Name:</td><td>${document.getElementById("firstName").value} ${document.getElementById("middleInitial").value} ${document.getElementById("lastName").value}</td></tr>`;
    reviewHTML += `<tr><td>Date of Birth:</td><td>${document.getElementById("dob").value}</td></tr>`;
    reviewHTML += `<tr><td>Social Security:</td><td>XXX-XX-${document.getElementById("ssn").value.slice(-4)}</td></tr>`;
    
    // Gender
    const genderRadios = document.getElementsByName("gender");
    let selectedGender = "";
    for (const radio of genderRadios) {
        if (radio.checked) {
            selectedGender = radio.value;
            break;
        }
    }
    reviewHTML += `<tr><td>Gender:</td><td>${selectedGender}</td></tr>`;
    
    // Contact Information
    reviewHTML += "<tr><th colspan='2'>Contact Information</th></tr>";
    reviewHTML += `<tr><td>Address:</td><td>${document.getElementById("address1").value}</td></tr>`;
    
    if (document.getElementById("address2").value) {
        reviewHTML += `<tr><td>Address Line 2:</td><td>${document.getElementById("address2").value}</td></tr>`;
    }
    
    reviewHTML += `<tr><td>City, State, Zip:</td><td>${document.getElementById("city").value}, ${document.getElementById("state").value} ${document.getElementById("zipCode").value}</td></tr>`;
    reviewHTML += `<tr><td>Phone:</td><td>${document.getElementById("phone").value}</td></tr>`;
    reviewHTML += `<tr><td>Email:</td><td>${document.getElementById("email").value}</td></tr>`;
    
    // Medical History
    reviewHTML += "<tr><th colspan='2'>Medical History</th></tr>";
    
    const checkboxes = document.querySelectorAll('input[name="medicalHistory"]:checked');
    let conditions = [];
    checkboxes.forEach(checkbox => {
        conditions.push(checkbox.value);
    });
    
    reviewHTML += `<tr><td>Conditions:</td><td>${conditions.length > 0 ? conditions.join(", ") : "None selected"}</td></tr>`;
    
    // Insurance
    reviewHTML += "<tr><th colspan='2'>Insurance Information</th></tr>";
    
    const insuranceRadios = document.getElementsByName("insurance");
    let hasInsurance = "";
    for (const radio of insuranceRadios) {
        if (radio.checked) {
            hasInsurance = radio.value;
            break;
        }
    }
    
