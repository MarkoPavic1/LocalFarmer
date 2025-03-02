document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        document.body.innerHTML = "<h1>User Not Found</h1>";
        return;
    }

    // ✅ Update Phone Number Field
    document.getElementById("customer-phone").value = currentUser.phone || "";

    // ✅ Load Favorite Farmers
    const favoriteFarmersContainer = document.getElementById("favoriteFarmersContainer");
    favoriteFarmersContainer.innerHTML = ""; // Clear previous content

    if (currentUser.favorites && currentUser.favorites.length > 0) {
        currentUser.favorites.forEach(farmer => {
            const farmerCard = document.createElement("div");
            farmerCard.classList.add("farmer-card");
            farmerCard.innerHTML = `
                <img src="${farmer.image}" alt="Farmer">
                <p>${farmer.name}</p>
                <a href="farmer_profile.html?id=${farmer.id}" class="view-profile">View Profile and Products</a>
                <button class="remove-favorite" data-id="${farmer.id}">Remove</button>
            `;
            favoriteFarmersContainer.appendChild(farmerCard);
        });
    } else {
        favoriteFarmersContainer.innerHTML = "<p>No favorite farmers added.</p>";
    }

    // ✅ Handle Remove Favorite Action
    document.querySelectorAll(".remove-favorite").forEach(button => {
        button.addEventListener("click", function () {
            const farmerId = this.getAttribute("data-id");
            currentUser.favorites = currentUser.favorites.filter(farmer => farmer.id !== farmerId);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            location.reload(); // Refresh to update the UI
        });
    });

    // ✅ Save Changes Form Handling
    document.getElementById("editProfileForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Update phone number
        currentUser.phone = document.getElementById("customer-phone").value;

        // Update Profile Picture (Fake Implementation for Now)
        const fileInput = document.getElementById("profile-image");
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                currentUser.profileImage = e.target.result; // Store base64 image
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }

        alert("Profile updated successfully!");
    });
});