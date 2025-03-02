// Function to load HTML templates dynamically
function loadTemplate(containerId, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            if (callback) callback(); // Execute callback after loading
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Function to dynamically update the navigation bar
function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navButtons = document.querySelector(".nav-buttons");
    if (!navButtons) return;

    navButtons.innerHTML = ""; // Clear existing buttons

    if (!currentUser) {
        // User is not logged in → Show Login & Register
        navButtons.innerHTML = `
            <a href="login.html" class="btn">Log in</a>
            <a href="registrationpage.html" class="btn">Register</a>
        `;
    } else {
        // User is logged in → Show My Profile & Log Out
        const profileButton = document.createElement("button");
        profileButton.textContent = "My Profile";
        profileButton.classList.add("btn");
        profileButton.addEventListener("click", function () {
            window.location.href = currentUser.role === "farmer"
                ? "farmer_own_profile.html"
                : "customer_profile.html";
        });

        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Log out!";
        logoutButton.classList.add("btn");
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });

        navButtons.appendChild(profileButton);
        navButtons.appendChild(logoutButton);
    }
}

// Load common templates and apply dynamic navbar updates
document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");
});
