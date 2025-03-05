document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "../templates/navbar.html", updateNavbar);
    loadTemplate("footer", "../templates/footer.html");

    const roleSelect = document.getElementById("roleSelect");
    const customerForm = document.getElementById("customerForm");
    const farmerForm = document.getElementById("farmerForm");
    const loginForm = document.getElementById("loginForm"); // Get login form

    // Show correct form when a role is selected
    if (roleSelect) {
        roleSelect.addEventListener("change", function () {
            // Hide both forms first
            customerForm.classList.add("hidden");
            customerForm.classList.remove("visible");

            farmerForm.classList.add("hidden");
            farmerForm.classList.remove("visible");

            // Show only the selected form
            if (this.value === "customer") {
                customerForm.classList.remove("hidden");
                customerForm.classList.add("visible");
            } else if (this.value === "farmer") {
                farmerForm.classList.remove("hidden");
                farmerForm.classList.add("visible");
            }
        });
    }

    // Ensure event listeners are properly attached
    if (customerForm) {
        customerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload
            registerUser("customer");
        });
    }

    if (farmerForm) {
        farmerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload
            registerUser("farmer");
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload
            handleLogin();
        });
    }
});

// Function to register users properly
function registerUser(role) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = ""; // Clear previous errors

    let name, surname, image, email, phone, location, description, password, confirmPassword, userData;
    if (role === "customer") {
        name = document.getElementById("customerName").value.trim();
        surname = document.getElementById("customerSurname").value.trim();
        image = document.getElementById("customerImage").files[0]?.name || "default.jpg";
        email = document.getElementById("customerEmail").value.trim();
        phone = document.getElementById("customerPhone").value.trim();
        location = document.getElementById("customerLocation").value.trim();
        password = document.getElementById("customerPassword").value;
        confirmPassword = document.getElementById("customerConfirmPassword").value;
    } else {
        name = document.getElementById("farmerName").value.trim();
        surname = document.getElementById("farmerSurname").value.trim();
        image = document.getElementById("farmerImage").files[0]?.name || "default.jpg";
        email = document.getElementById("farmerEmail").value.trim();
        phone = document.getElementById("farmerPhone").value.trim();
        location = document.getElementById("farmerLocation").value.trim();
        description = document.getElementById("farmerDescription").value.trim();
        password = document.getElementById("farmerPassword").value;
        confirmPassword = document.getElementById("farmerConfirmPassword").value;
    }

    // Validation
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    let usersData = JSON.parse(localStorage.getItem(role === "customer" ? "customersData" : "farmersData")) || [];
    if (usersData.some(user => user.email === email)) {
        errorMessage.textContent = "This email is already registered.";
        return;
    }

    // Create user object
    if (role === "customer") {
        userData = {
            id: generateId("customer"),
            name,
            surname,
            image,
            email,
            phone,
            location,
            password: hashPassword(password),
            favoriteFarmers: []
        };
    } else {
        userData = {
            id: generateId("farmer"),
            name,
            surname,
            image,
            email,
            phone,
            location,
            description,
            password: hashPassword(password),
            products: []
        };
    }

    // Save user in local storage
    usersData.push(userData);
    localStorage.setItem(role === "customer" ? "customersData" : "farmersData", JSON.stringify(usersData));
    localStorage.setItem("currentUser", JSON.stringify(userData));

    alert("Registration successful! Redirecting...");
    window.location.href = "login.html";
}

// Function to handle user login
function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Clear previous errors

    // Retrieve both customers and farmers from local storage
    const customers = JSON.parse(localStorage.getItem("customersData")) || [];
    const farmers = JSON.parse(localStorage.getItem("farmersData")) || [];

    // Search for user in both customer and farmer data
    let user = customers.find(user => user.email === email) || farmers.find(user => user.email === email);

    // Validate user login
    if (!user || user.password !== hashPassword(password)) {
        errorMessage.textContent = "Invalid email or password.";
        return;
    }

    // Store the logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect to home page
    alert("Login successful! Redirecting...");
    window.location.href = "customer_farmer_home_page.html";
}

// Utility function to generate unique IDs
function generateId(prefix) {
    return `${prefix}-${Date.now()}`;
}

// Utility function for simple password hashing
function hashPassword(password) {
    return btoa(password); // Simple encoding (not secure for production)
}
