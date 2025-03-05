document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");

    const farmersList = document.getElementById("farmersList");
    const productsList = document.getElementById("productsList");

    const farmers = getFarmersData();

    if (!farmers.length) {
        farmersList.innerHTML = "<p>No farmers available.</p>";
        productsList.innerHTML = "<p>No products available.</p>";
        return;
    }

    // Display Farmers
    farmersList.innerHTML = farmers.map(farmer => `
        <a href="farmer_profile.html?id=${farmer.id}" class="card">
            <img src="images/${farmer.image}" alt="Farmer">
            <p>${farmer.name}</p>
            <span>View profile and products!</span>
        </a>
    `).join("");

    // Display Products
    productsList.innerHTML = farmers.flatMap(farmer =>
        farmer.products.map(product => `
            <a href="product.html?id=${product.id}" class="card">
                <img src="images/${product.image}" alt="Product">
                <p><strong>${product.name}</strong></p>
                <p>${product.description}</p>
                <span>Price: ${product.price}</span>
                <span><strong>Stock:</strong> ${product.stock}</span>
            </a>
        `)
    ).join("");
});
