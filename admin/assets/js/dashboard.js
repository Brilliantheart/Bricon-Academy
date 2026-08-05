/*************************************************
 * BRIHCON Certificate Management System
 * dashboard.js
 *************************************************/


/**
 * ==========================================
 * Refresh Dashboard
 * ==========================================
 */
async function refreshDashboard() {

    try {

        const result = await getDashboardStats();

        if (!result.success) {

            showMessage(
                result.message || "Unable to load dashboard.",
                "danger"
            );

            return;

        }

        updateDashboardCards(result);

    }

    catch (error) {

        console.error(error);

        showMessage(error.message, "danger");

    }

}


/**
 * ==========================================
 * Update Dashboard Cards
 * ==========================================
 */
function updateDashboardCards(stats) {

    setValue("totalStudents", stats.totalStudents);

    setValue("eligibleStudents", stats.eligibleStudents);

    setValue("certificatesIssued", stats.certificatesIssued);

    setValue("pendingCertificates", stats.pendingCertificates);

}


/**
 * ==========================================
 * Update Element
 * ==========================================
 */
function setValue(id, value) {

    const element = document.getElementById(id);

    if (element) {

        element.textContent = value ?? 0;

    }

}


/**
 * ==========================================
 * Auto Refresh Dashboard
 * ==========================================
 */
document.addEventListener("DOMContentLoaded", () => {

    refreshDashboard();

});


/**
 * ==========================================
 * Manual Refresh
 * ==========================================
 */
function reloadDashboard() {

    refreshDashboard();

}