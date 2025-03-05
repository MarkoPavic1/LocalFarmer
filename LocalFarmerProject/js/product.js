document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "../templates/navbar.html", updateNavbar);
    loadTemplate("footer", "../templates/footer.html");

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        alert("Invalid product.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Retrieve product data
    const productData = getProductById(productId);

    if (!productData) {
        alert("Product not found.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Populate product details
    document.getElementById("productName").textContent = productData.name; // Show product name
    document.getElementById("productImage").src = `../images/${productData.image}`;
    document.getElementById("productPrice").textContent = `Price: ${productData.price}`;
    document.getElementById("farmerName").textContent = `Sold by: ${productData.farmer.name}`;
    
    //Show stock availability
    const stockElement = document.createElement("p");
    stockElement.textContent = `Stock: ${productData.stock}`;
    document.querySelector(".product-info").appendChild(stockElement);

    // Set farmer profile button link
    document.getElementById("farmerProfileBtn").href = `farmer_profile.html?id=${productData.farmer.id}`;
});
