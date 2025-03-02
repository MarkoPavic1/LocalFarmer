document.addEventListener("DOMContentLoaded", function () {
    console.log("🔄 Loading Home Page...");

    // Load Navbar and Footer
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");

    const farmersList = document.getElementById("farmersList");
    const productsList = document.getElementById("productsList");

    // Retrieve Farmers Data
    const farmers = JSON.parse(localStorage.getItem("farmersData")) || [];
    console.log("📦 Retrieved Farmers Data:", farmers);

    if (!farmers.length) {
        farmersList.innerHTML = "<p>No farmers available.</p>";
        productsList.innerHTML = "<p>No products available.</p>";
        return;
    }

    // Display Farmers
    farmersList.innerHTML = "";
    farmers.forEach(farmer => {
        const farmerCard = document.createElement("a");
        farmerCard.href = `farmer_profile.html?id=${farmer.id}`;
        farmerCard.classList.add("farmer-card");
        farmerCard.innerHTML = `
            <img src="${farmer.image}" alt="Farmer Profile">
            <p>${farmer.name}</p>
            <span>View profile and products!</span>
        `;
        farmersList.appendChild(farmerCard);
    });

    // Display Products
    productsList.innerHTML = "";
    farmers.forEach(farmer => {
        farmer.products.forEach(product => {
            const productCard = document.createElement("a");
            productCard.href = `product_page.html?id=${product.id}`;  // ✅ Correctly passing product ID
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="Product">
                <p>${product.description}</p>
                <span>Price: ${product.price}</span>
                <span>View</span>
            `;
            productsList.appendChild(productCard);
        });
    });

    console.log("✅ Farmers and Products Loaded Successfully!");
});
