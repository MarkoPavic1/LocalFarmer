document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "../templates/navbar.html", updateNavbar);
    loadTemplate("footer", "../templates/footer.html");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || !currentUser.id.startsWith("customer")) {
        alert("Access Denied. Redirecting to home page.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Retrieve customers data from local storage
    let customers = JSON.parse(localStorage.getItem("customersData")) || [];
    let customer = customers.find(c => c.id === currentUser.id);

    if (!customer) {
        alert("Customer profile not found.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Pre-fill form with existing customer data
    document.getElementById("customer-phone").value = customer.phone || "";
    document.getElementById("profile-image").src = customer.image ? `../images/${customer.image}` : "../images/profile_placeholder.jpg";

    // Load favorite farmers
    const favoriteFarmersContainer = document.getElementById("favoriteFarmersContainer");
    const farmersData = JSON.parse(localStorage.getItem("farmersData")) || [];

    if (customer.favoriteFarmers.length === 0) {
        favoriteFarmersContainer.innerHTML = "<p>No favorite farmers yet.</p>";
    } else {
        favoriteFarmersContainer.innerHTML = customer.favoriteFarmers.map(farmerId => {
            let farmer = farmersData.find(f => f.id === farmerId);
            return farmer
                ? `<div class="favorite-item">
                     <a href="farmer_profile.html?id=${farmer.id}">${farmer.name} ${farmer.surname}</a>
                     <button class="remove-favorite" data-id="${farmer.id}">Remove</button>
                   </div>`
                : "";
        }).join("");
    }

    // Handle removing favorite farmers
    document.querySelectorAll(".remove-favorite").forEach(button => {
        button.addEventListener("click", function () {
            const farmerId = this.getAttribute("data-id");
            customer.favoriteFarmers = customer.favoriteFarmers.filter(id => id !== farmerId);

            // Update local storage
            customers = customers.map(c => (c.id === customer.id ? customer : c));
            localStorage.setItem("customersData", JSON.stringify(customers));

            alert("Favorite farmer removed.");
            location.reload();
        });
    });

    // Handle form submission
    document.getElementById("editProfileForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get updated data
        const newPhone = document.getElementById("customer-phone").value.trim();
        const newImage = document.getElementById("profile-image").files[0];

        // Update customer data
        customer.phone = newPhone;
        if (newImage) {
            customer.image = newImage.name; // Store image filename
        }

        // Save updated data to local storage
        localStorage.setItem("customersData", JSON.stringify(customers));

        alert("Profile updated successfully!");
        window.location.href = "customer_profile.html";
    });
});
