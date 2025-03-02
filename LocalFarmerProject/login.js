document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Clear previous errors

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);

    if (!user) {
        errorMessage.textContent = "Email not found. Please register first.";
        return;
    }

    if (user.password !== hashPassword(password)) {
        errorMessage.textContent = "Incorrect password. Please try again.";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful! Redirecting to home page.");
    window.location.href = "customer_farmer_home_page.html";
});

function hashPassword(password) {
    return btoa(password); // Simple encoding (not secure, for testing only)
}
