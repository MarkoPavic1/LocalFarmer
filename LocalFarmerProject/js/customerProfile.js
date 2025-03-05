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
    // Populate customer profile details
    document.getElementById("customerName").textContent = customer.name;
    document.getElementById("customerSurname").textContent = customer.surname;
    document.getElementById("customerEmail").textContent = customer.email;
    document.getElementById("customerPhone").textContent = customer.phone || "Not Provided";
    document.getElementById("profileImage").src = customer.image ? `../images/${customer.image}` : "../images/profile_placeholder.jpg";

    // Load favorite farmers
    const favoriteFarmersList = document.getElementById("favoriteFarmersList");
    if (customer.favoriteFarmers.length === 0) {
        favoriteFarmersList.innerHTML = "<p>No favorite farmers yet.</p>";
    } else {
        let farmersData = JSON.parse(localStorage.getItem("farmersData")) || [];
        favoriteFarmersList.innerHTML = customer.favoriteFarmers.map(farmerId => {
            let farmer = farmersData.find(f => f.id === farmerId);
            return farmer
                ? `<a href="farmer_profile.html?id=${farmer.id}" class="favorite-item">${farmer.name} ${farmer.surname}</a>`
                : "";
        }).join("");
    }
});
