document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "../templates/navbar.html", updateNavbar);
    loadTemplate("footer", "../templates/footer.html");

    const addProductForm = document.getElementById("addProductForm");

    // Ensure only a farmer can access this page
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.id.startsWith("farmer")) {
        alert("Access Denied. Only farmers can add products.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission reload

        const name = document.getElementById("product-name").value.trim();
        const imageInput = document.getElementById("product-image").files[0];
        const description = document.getElementById("product-description").value.trim();
        const price = document.getElementById("product-price").value.trim();
        const quantity = document.getElementById("product-quantity").value.trim();

        // Validate input
        if (!name || !description || !price || !quantity) {
            alert("Please fill in all fields.");
            return;
        }

        // Generate product ID
        const productId = `product-${Date.now()}`;

        // Store image filename or use a placeholder if no image is uploaded
        const imageName = imageInput ? imageInput.name : "default-product.jpg";

        // Create product object
        const newProduct = {
            id: productId,
            name,  // Include product name
            image: imageName,
            description,
            price,
            stock: quantity,
            farmerName: currentUser.name,
            farmerSurname: currentUser.surname
        };

        // Retrieve farmers from local storage
        let farmers = JSON.parse(localStorage.getItem("farmersData")) || [];
        let farmerIndex = farmers.findIndex(f => f.id === currentUser.id);

        if (farmerIndex === -1) {
            alert("Farmer profile not found.");
            return;
        }

        // Add product to the farmer's product list
        farmers[farmerIndex].products.push(newProduct);
        localStorage.setItem("farmersData", JSON.stringify(farmers));

        alert("Product added successfully!");
        window.location.href = "farmer_own_profile.html";
    });
});
