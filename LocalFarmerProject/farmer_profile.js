document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar and Footer
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");

    // Get Farmer ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const farmerId = urlParams.get("id");

    // Retrieve farmers data from localStorage
    const farmers = JSON.parse(localStorage.getItem("farmersData")) || [];

    if (!farmerId || !farmers.length) {
        document.body.innerHTML = "<h1>Farmer Not Found</h1>";
        return;
    }

    // Find the farmer by ID
    const farmer = farmers.find(f => f.id == farmerId);

    if (!farmer) {
        document.body.innerHTML = "<h1>Farmer Not Found</h1>";
        return;
    }

    // Update Farmer Profile Information
    document.querySelector(".profile-container h1").textContent = farmer.name;
    document.querySelector(".profile-image").src = farmer.image || "profile_placeholder.jpg";
    document.querySelector(".contact-info p:nth-child(2)").textContent = `Email: ${farmer.email || "Not Provided"}`;
    document.querySelector(".contact-info p:nth-child(3)").textContent = `Phone: ${farmer.phone || "Not Provided"}`;
    document.querySelector(".location p").textContent = farmer.location || "No location provided";
    document.querySelector(".description p").textContent = farmer.description || "No description available";

    // Load Farmer's Products
    loadFarmerProducts(farmer);
});

// Function to Load Farmer's Products
function loadFarmerProducts(farmer) {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = ""; // Clear previous content

    if (!farmer.products || farmer.products.length === 0) {
        productsList.innerHTML = "<p>No products added yet.</p>";
        return;
    }

    farmer.products.forEach(product => {
        const productCard = document.createElement("a");
        productCard.href = `product_page.html?id=${product.id}`; // Ensure product has a unique ID
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="Product">
            <p>${product.description}</p>
            <span>Price: ${product.price}</span>
            <span>Quantity: ${product.quantity}</span>
            <span>View</span>
        `;
        productsList.appendChild(productCard);
    });
}

// Function to Update Navbar
function updateNavbar() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navButtons = document.querySelector(".nav-buttons");

    if (!navButtons) return;
    navButtons.innerHTML = ""; // Clear existing buttons

    if (currentUser) {
        // Create "My Profile" Button
        const profileButton = document.createElement("button");
        profileButton.textContent = "My Profile";
        profileButton.classList.add("btn");
        profileButton.addEventListener("click", function () {
            window.location.href = currentUser.role === "farmer"
                ? "farmer_own_profile.html"
                : "customer_profile.html";
        });

        // Create "Log out" Button
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Log out!";
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
