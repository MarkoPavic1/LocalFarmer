document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");

    const urlParams = new URLSearchParams(window.location.search);
    const farmerId = urlParams.get("id");

    if (!farmerId) {
        alert("Invalid farmer profile.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Retrieve farmer data
    const farmers = getFarmersData();
    const farmer = farmers.find(f => f.id === farmerId);

    if (!farmer) {
        alert("Farmer not found.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Populate farmer profile details
    document.getElementById("farmerName").textContent = farmer.name;
    document.getElementById("farmerImage").src = farmer.image 
        ? `images/${farmer.image}`
        : "images/profile_placeholder.jpg";
    document.getElementById("farmerEmail").textContent = `Email: ${farmer.email}`;
    document.getElementById("farmerPhone").textContent = `Phone number: ${farmer.phone}`;
    document.getElementById("farmerDescription").textContent = farmer.description || "No description available.";
    document.getElementById("farmerLocation").textContent = farmer.location || "No location provided.";

    //Ensure Farmer's Products Are Displayed
    const productsList = document.getElementById("productsList");

    if (!farmer.products || farmer.products.length === 0) {
        productsList.innerHTML = "<p>This farmer has no products listed.</p>";
    } else {
        productsList.innerHTML = farmer.products.map(product => `
            <a href="product.html?id=${product.id}" class="card">
                <img src="images/${product.image}" alt="Product">
                <p><strong>${product.name}</strong></p>
                <p>${product.description}</p>
                <span><strong>Price:</strong> ${product.price}</span>
                <span><strong>Stock:</strong> ${product.stock}</span> 
            </a>
        `).join("");
    }
});
