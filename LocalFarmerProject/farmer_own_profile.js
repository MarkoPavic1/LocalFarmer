document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar and Footer
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || currentUser.role !== "farmer") {
        document.body.innerHTML = "<h1>Access Denied</h1>";
        return;
    }

    // Update Profile Information
    document.getElementById("farmerName").textContent = currentUser.name;
    document.getElementById("farmerEmail").textContent = currentUser.email;
    document.getElementById("farmerPhone").textContent = currentUser.phone || "Not provided";
    document.getElementById("farmerDescription").textContent = currentUser.description || "No description available";
    document.getElementById("farmerLocation").textContent = currentUser.location || "No location provided";

    // Load Farmer's Products
    loadFarmerProducts(currentUser.id);
});

function loadFarmerProducts(farmerId) {
    const productsList = document.getElementById("productsList");
    productsList.innerHTML = ""; // Clear previous content

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const farmerProducts = products.filter(product => product.farmerId === farmerId);

    if (farmerProducts.length === 0) {
        productsList.innerHTML = "<p>No products added yet.</p>";
        return;
    }

    farmerProducts.forEach(product => {
        const productCard = document.createElement("a");
        productCard.href = `product_page.html?id=${product.id}`; // Correctly pass product ID
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="Product Image">
            <p>${product.description}</p>
            <span>Price: ${product.price}</span>
            <span>Quantity: ${product.quantity}</span>
            <span>View</span>
        `;
        productsList.appendChild(productCard);
    });
}
