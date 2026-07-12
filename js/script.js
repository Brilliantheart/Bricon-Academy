// ===============================
// BRICON Academy Script
// ===============================

// Wait until the page has loaded
window.onload = function () {

    // Show the WhatsApp popup after 3 seconds
    setTimeout(function () {
        const popup = document.getElementById("chatPopup");

        if (popup) {
            popup.style.display = "block";
        }
    }, 3000);

};

// Close the popup
function closeChat() {
    const popup = document.getElementById("chatPopup");

    if (popup) {
        popup.style.display = "none";
    }
}


