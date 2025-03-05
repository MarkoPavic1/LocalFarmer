document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "../templates/navbar.html", updateNavbar);
    loadTemplate("footer", "../templates/footer.html");

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        alert("Invalid product. Redirecting to profile.");
        window.location.href = "farmer_own_profile.html";
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.id.startsWith("farmer")) {
        alert("Access Denied. Only farmers can edit products.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Retrieve farmers data
    let farmers = JSON.parse(localStorage.getItem("farmersData")) || [];
    let farmer = farmers.find(f => f.id === currentUser.id);

    if (!farmer) {
        alert("Farmer profile not found.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Find the product
    let product = farmer.products.find(prod => prod.id === productId);
    if (!product) {
        alert("Product not found.");
        window.location.href = "farmer_own_profile.html";
        return;
    }

    // Pre-fill the form with existing product data
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-description").value = product.description;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-quantity").value = product.stock;

    // Handle form submission
    document.getElementById("editProductForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Update product data
        product.name = document.getElementById("product-name").value.trim();
        product.description = document.getElementById("product-description").value.trim();
        product.price = document.getElementById("product-price").value.trim();
        product.stock = document.getElementById("product-quantity").value.trim();

        // Save updated data to local storage
        localStorage.setItem("farmersData", JSON.stringify(farmers));

        alert("Product updated successfully!");
        window.location.href = "farmer_own_profile.html";
    });
});
