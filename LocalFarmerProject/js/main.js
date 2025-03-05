document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");
});

// Function to dynamically load HTML templates
function loadTemplate(containerId, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
                if (callback) callback(); // Execute callback after loading
            } else {
                console.error(`Element with ID '${containerId}' not found.`);
            }
        })
        .catch(error => console.error(`Error loading ${filePath}:`, error));
}

// Function to update navbar dynamically based on login state
function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navButtons = document.querySelector(".nav-buttons");

    if (!navButtons) return;
    navButtons.innerHTML = ""; // Clear previous buttons

    if (!currentUser) {
        // If no user is logged in, show Log In and Register buttons
        navButtons.innerHTML = `
            <a href="login.html" class="btn">Log in</a>
            <a href="registrationpage.html" class="btn">Register</a>
        `;
    } else {
        // Create My Profile button (redirects based on role)
        const profileButton = document.createElement("a");
        profileButton.textContent = "My Profile";
        profileButton.classList.add("btn");

        if (currentUser.id.startsWith("farmer")) {
            profileButton.href = "farmer_own_profile.html"; // Redirect for farmers
        } else {
            profileButton.href = "customer_profile.html"; // Redirect for customers
        }

        // Create Log Out button
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Log out";
        logoutButton.classList.add("btn");
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });

        // Append buttons to navbar
        navButtons.appendChild(profileButton);
        navButtons.appendChild(logoutButton);
    }
}

