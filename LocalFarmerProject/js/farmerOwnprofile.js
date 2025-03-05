document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "../templates/navbar.html", updateNavbar);
    loadTemplate("footer", "../templates/footer.html");

    // Retrieve the logged-in user
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Ensure the user is logged in and is a farmer
    if (!currentUser || !currentUser.id.startsWith("farmer")) {
        alert("Access Denied. Redirecting to home page.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Retrieve farmers from local storage
    const farmers = JSON.parse(localStorage.getItem("farmersData")) || [];
    const farmer = farmers.find(f => f.id === currentUser.id);

    if (!farmer) {
        alert("Farmer profile not found.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Populate farmer profile details
    document.getElementById("farmerName").textContent = farmer.name + " " + farmer.surname;
    document.getElementById("farmerImage").src = `../images/${farmer.image || "placeholder.jpg"}`;
    document.getElementById("farmerEmail").textContent = farmer.email;
    document.getElementById("farmerPhone").textContent = farmer.phone || "Not provided";
    document.getElementById("farmerDescription").textContent = farmer.description || "No description available";
    document.getElementById("farmerLocation").textContent = farmer.location || "No location provided";

    // Display farmer's products
    const productsList = document.getElementById("productsList");
    if (!farmer.products || farmer.products.length === 0) {
        productsList.innerHTML = "<p>You have no products listed.</p>";
    } else {
        productsList.innerHTML = farmer.products.map(product => `
            <div class="card product-card">
                <img src="../images/${product.image}" alt="Product">
                <p>${product.name}</p>
                <span>Price: ${product.price}</span>
                <span>Stock: ${product.stock}</span>
                <button class="edit-btn" data-id="${product.id}">Edit</button>
                <button class="delete-btn" data-id="${product.id}">Remove</button>
            </div>
        `).join("");
    }

    // Add event listeners for edit and remove buttons
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            window.location.href = `edit_product.html?id=${productId}`;
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            removeProduct(farmer, productId);
        });
    });
});

// Function to remove a product from the farmer's list
function removeProduct(farmer, productId) {
    const confirmation = confirm("Are you sure you want to delete this product?");
    if (!confirmation) return;

    farmer.products = farmer.products.filter(product => product.id !== productId);

    // Update farmers data in local storage
    let farmers = JSON.parse(localStorage.getItem("farmersData")) || [];
    farmers = farmers.map(f => (f.id === farmer.id ? farmer : f));
    localStorage.setItem("farmersData", JSON.stringify(farmers));

    alert("Product removed successfully.");
    location.reload();
}
