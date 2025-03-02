document.addEventListener("DOMContentLoaded", function () {
    console.log("🔄 Loading Product Page...");

    // Load Navbar and Footer
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");

    // Parse Product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    console.log(`🆔 Product ID from URL: ${productId}`);

    if (!productId) {
        document.body.innerHTML = "<h1>❌ Product Not Found</h1>";
        return;
    }

    // Retrieve Farmers Data
    const farmers = JSON.parse(localStorage.getItem("farmersData")) || [];
    console.log("📦 Retrieved Farmers Data:", farmers);

    let foundProduct = null;
    let foundFarmer = null;

    // Search for the product inside farmers' product lists
    for (const farmer of farmers) {
        foundProduct = farmer.products.find(product => product.id == productId);
        if (foundProduct) {
            foundFarmer = farmer;
            break;
        }
    }

    console.log("✅ Found Product:", foundProduct);
    console.log("👨‍🌾 Associated Farmer:", foundFarmer);

    // Handle product not found
    if (!foundProduct) {
        document.body.innerHTML = "<h1>❌ Product Not Found</h1>";
        return;
    }

    // Update Page with Product Details
    document.getElementById("productName").textContent = foundProduct.description;
    document.getElementById("productImage").src = foundProduct.image || "product_placeholder.jpg";
    document.getElementById("productPrice").textContent = `Price: ${foundProduct.price}`;
    document.getElementById("productQuantity").textContent = `Quantity: ${foundProduct.quantity}`;

    // Update Farmer Name and Contact Button
    if (foundFarmer) {
        document.getElementById("farmerName").textContent = foundFarmer.name;
        document.getElementById("contactFarmer").href = `farmer_profile.html?id=${foundFarmer.id}`;
    } else {
        document.getElementById("farmerName").textContent = "Unknown Farmer";
        document.getElementById("contactFarmer").removeAttribute("href"); // Remove broken link
    }

    console.log("✅ Product Page Updated Successfully!");
});
