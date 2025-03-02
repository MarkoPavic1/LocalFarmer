document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const role = document.querySelector('input[name="role"]:checked');
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Clear previous errors

    if (!role) {
        errorMessage.textContent = "Please select a role (Customer or Farmer).";
        return;
    }

    if (!isValidEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    if (!isValidPassword(password)) {
        errorMessage.textContent = "Password must be at least 8 characters, include a number, an uppercase letter, and a special character.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
        errorMessage.textContent = "This email is already registered.";
        return;
    }

    const userData = {
        role: role.value,
        name: name,
        surname: surname,
        email: email,
        password: hashPassword(password) // Hash password before storing
    };

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(userData));

    alert("Registration successful! Redirecting to login page.");
    window.location.href = "login.html";
});

function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function isValidPassword(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

function hashPassword(password) {
    return btoa(password); // Simple encoding (Not secure, but for testing purposes)
}
