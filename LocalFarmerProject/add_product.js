document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar and Footer
    loadTemplate("navbar", "templates/navbar.html", updateNavbar);
    loadTemplate("footer", "templates/footer.html");

    const addProductForm = document.getElementById("addProductForm");

    addProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || currentUser.role !== "farmer") {
            alert("Only farmers can add products!");
            return;
        }

        // Get Product Data
        const productDescription = document.getElementById("product-description").value;
        const productPrice = document.getElementById("product-price").value;
        const productQuantity = document.getElementById("product-quantity").value;
        const productImage = document.getElementById("product-image").files[0];

        if (!productDescription || !productPrice || !productQuantity || !productImage) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        // Convert Image to Base64 for Storage
        const reader = new FileReader();
        reader.readAsDataURL(productImage);
        reader.onload = function () {
            const productData = {
                id: Date.now(),
                description: productDescription,
                price: productPrice,
                quantity: productQuantity,
                image: reader.result,
                farmerId: currentUser.id
            };

            // Retrieve existing products or initialize new array
            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(productData);
            localStorage.setItem("products", JSON.stringify(products));

            alert("Product added successfully!");
            window.location.href = "farmer_own_profile.html";
        };
    });
});
