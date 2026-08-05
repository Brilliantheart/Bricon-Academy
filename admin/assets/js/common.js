/*************************************************
 * BRIHCON Certificate Management System
 * common.js
 *
 * Common UI Helper Functions
 *************************************************/


/**
 * =====================================================
 * Show Notification Message
 * =====================================================
 *
 * Usage:
 * showMessage("Student added successfully", "success");
 * showMessage("Something went wrong", "danger");
 *
 */

function showMessage(message, type = "success") {

    // Remove existing notification if present
    const existingAlert = document.querySelector(".system-alert");

    if (existingAlert) {
        existingAlert.remove();
    }


    const alertBox = document.createElement("div");

    alertBox.className = `
        system-alert
        alert
        alert-${type}
        alert-dismissible
        fade
        show
        shadow
        position-fixed
    `;


    alertBox.style.top = "20px";
    alertBox.style.right = "20px";
    alertBox.style.zIndex = "9999";
    alertBox.style.minWidth = "320px";
    alertBox.style.maxWidth = "450px";


    alertBox.innerHTML = `

        <div class="d-flex align-items-center">

            <div class="me-3">
                ${getAlertIcon(type)}
            </div>

            <div class="flex-grow-1">
                ${message}
            </div>


            <button 
                type="button"
                class="btn-close ms-3"
                aria-label="Close">
            </button>

        </div>

    `;


    document.body.appendChild(alertBox);



    // Close button action
    const closeButton = alertBox.querySelector(".btn-close");

    closeButton.addEventListener("click", () => {
        alertBox.remove();
    });



    // Auto remove after 4 seconds
    setTimeout(() => {

        if (alertBox) {
            alertBox.classList.remove("show");

            setTimeout(() => {
                alertBox.remove();
            }, 300);
        }

    }, 4000);

}



/**
 * =====================================================
 * Notification Icons
 * =====================================================
 */

function getAlertIcon(type) {

    switch(type) {

        case "success":
            return `<i class="fas fa-circle-check"></i>`;

        case "danger":
            return `<i class="fas fa-circle-xmark"></i>`;

        case "warning":
            return `<i class="fas fa-triangle-exclamation"></i>`;

        case "info":
            return `<i class="fas fa-circle-info"></i>`;

        default:
            return `<i class="fas fa-bell"></i>`;
    }

}