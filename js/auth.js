import { auth } from "./firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const provider = new GoogleAuthProvider();

const loginButtons = document.querySelectorAll(".google-login");

loginButtons.forEach(button => {

    button.addEventListener("click", async (e) => {

        e.preventDefault();

        const redirectUrl = button.dataset.url;

        button.disabled = true;

        try {

            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            // Save user details locally for use on the payment page
            localStorage.setItem("name", user.displayName || "");
            localStorage.setItem("email", user.email || "");
            localStorage.setItem("photo", user.photoURL || "");

            showSuccessPopup(user.displayName, redirectUrl);

        } 
        
        catch (error) {

    console.error("Firebase Error:", error);

    alert(
        "Code: " + error.code + "\n\n" +
        "Message: " + error.message
    );

}

    });

});

function showSuccessPopup(name, redirectUrl) {

    const popup = document.createElement("div");

    popup.innerHTML = `
        <div class="bha-popup-overlay">
            <div class="bha-popup">
                <h3>Brilliant Heart Consult</h3>
                <p>Welcome, <strong>${name}</strong> 🎉</p>
                <p>Your email has been verified successfully.</p>
                <button id="closePopup">Continue</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("closePopup").addEventListener("click", () => {

        popup.remove();

        if (redirectUrl) {
            window.location.href = redirectUrl;
        }

    });

}