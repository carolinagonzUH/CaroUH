/*
 * Name: Carolina Gonzalez
 * File: homework4.js
 * Date Created: 2025-02-03
 * Date Updated: 2025-04-14
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
        
        // Handle Remember Me cookie
        const firstName = document.getElementById("firstName").value;
        const rememberMe = document.getElementById("rememberMe");
        
        if (rememberMe && rememberMe.checked && firstName) {
            setCookie("firstName", firstName, 2); // 48 hours
        } else {
            eraseCookie("firstName");
        }
       
        // Validate form and submit if valid
        if (validateEntireForm()) {
            alert("Form submitted successfully!");
            // Redirect to thank you page instead of direct submission
            window.location.href = "thankyou.html";
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
        // Redirect to thank you page instead of direct submission
        window.location.href = "thankyou.html";
    });
    
    // Process cookie welcome message
    handleCookieWelcome();
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
