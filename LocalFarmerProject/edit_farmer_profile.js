document.addEventListener("DOMContentLoaded", function () {
    loadTemplate("navbar", "templates/navbar.html");
    loadTemplate("footer", "templates/footer.html");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser || currentUser.role !== "farmer") {
        document.body.innerHTML = "<h1>Access Denied</h1>";
        return;
    }

    // Pre-fill form fields with existing data
    document.getElementById("farmer-name").value = currentUser.name || "";
    document.getElementById("farmer-email").value = currentUser.email || "";
    document.getElementById("farmer-phone").value = currentUser.phone || "";
    document.getElementById("farmer-description").value = currentUser.description || "";
    document.getElementById("farmer-location").value = currentUser.location || "";

    // Handle form submission
    document.getElementById("editFarmerForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Update currentUser object with new values
        currentUser.name = document.getElementById("farmer-name").value;
        currentUser.phone = document.getElementById("farmer-phone").value;
        currentUser.description = document.getElementById("farmer-description").value;
        currentUser.location = document.getElementById("farmer-location").value;

        // Save updated data to localStorage
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        alert("Profile updated successfully!");
        window.location.href = "farmer_own_profile.html";
    });
});
