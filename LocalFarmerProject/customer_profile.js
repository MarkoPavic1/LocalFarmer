document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    if (!currentUser) {
        document.body.innerHTML = "<h1>User Not Found</h1>";
        return;
    }

    // Update profile details dynamically
    document.getElementById("customerName").textContent = currentUser.name;
    document.getElementById("customerSurname").textContent = currentUser.surname;
    document.getElementById("customerEmail").textContent = currentUser.email;

    // Load favorite farmers
    const favoriteFarmersList = document.getElementById("favoriteFarmersList");
    favoriteFarmersList.innerHTML = ""; // Clear previous content
    
    if (currentUser.favorites && currentUser.favorites.length > 0) {
        currentUser.favorites.forEach(farmer => {
            const farmerCard = document.createElement("a");
            farmerCard.href = `farmer_profile.html?id=${farmer.id}`;
            farmerCard.classList.add("farmer-card");
            farmerCard.innerHTML = `
                <img src="${farmer.image}" alt="Farmer Profile">
                <p>${farmer.name}</p>
            `;
            favoriteFarmersList.appendChild(farmerCard);
        });
    } else {
        favoriteFarmersList.innerHTML = "<p>No favorite farmers added.</p>";
    }

    // ✅ Update Navigation Buttons
    const navButtons = document.querySelector(".nav-buttons");
    if (!navButtons) return;

    navButtons.innerHTML = ""; // Clear existing buttons

    if (currentUser) {
        // Create "My Profile" button
        const profileButton = document.createElement("a");
        profileButton.textContent = "My Profile";
        profileButton.href = currentUser.role === "farmer" ? "farmer_own_profile.html" : "customer_profile.html";
        profileButton.classList.add("btn", "nav-btn"); // ✅ Ensure styling matches

        // Create "Log out" button
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Log out!";
        logoutButton.classList.add("btn", "nav-btn"); // ✅ Ensure styling matches
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });

        // Append buttons to navbar
        navButtons.appendChild(profileButton);
        navButtons.appendChild(logoutButton);
    }
});
