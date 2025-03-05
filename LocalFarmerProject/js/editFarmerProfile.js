document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "../templates/navbar.html", updateNavbar);
    loadTemplate("footer", "../templates/footer.html");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.id.startsWith("farmer")) {
        alert("Access Denied. Only farmers can edit their profile.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Retrieve farmers from local storage
    let farmers = JSON.parse(localStorage.getItem("farmersData")) || [];
    let farmer = farmers.find(f => f.id === currentUser.id);

    if (!farmer) {
        alert("Farmer profile not found.");
        window.location.href = "customer_farmer_home_page.html";
        return;
    }

    // Pre-fill the form with existing farmer data
    document.getElementById("farmer-name").value = farmer.name;
    document.getElementById("farmer-email").value = farmer.email;
    document.getElementById("farmer-phone").value = farmer.phone || "";
    document.getElementById("farmer-description").value = farmer.description || "";
    document.getElementById("farmer-location").value = farmer.location || "";

    // Handle form submission
    document.getElementById("editFarmerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get updated data
        const newPhone = document.getElementById("farmer-phone").value.trim();
        const newDescription = document.getElementById("farmer-description").value.trim();
        const newLocation = document.getElementById("farmer-location").value.trim();
        const newImage = document.getElementById("profile-image").files[0];

        // Update farmer data
        farmer.phone = newPhone;
        farmer.description = newDescription;
        farmer.location = newLocation;
        if (newImage) {
            farmer.image = newImage.name; // Store image filename
        }

        // Save updated data to local storage
        localStorage.setItem("farmersData", JSON.stringify(farmers));

        alert("Profile updated successfully!");
        window.location.href = "farmer_own_profile.html";
    });
});
