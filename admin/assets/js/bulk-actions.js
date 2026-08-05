/*************************************************
 * BRIHCON Certificate Management System
 * bulk-actions.js
 *************************************************/

function getSelectedStudents() {

    return Array.from(
        document.querySelectorAll(".student-check:checked")
    ).map(cb => cb.value);

}

document.addEventListener("change", e => {

    if (e.target.id === "selectAllStudents") {

        document.querySelectorAll(".student-check")
            .forEach(cb => cb.checked = e.target.checked);

    }

});

// ==========================================
// Generate Selected Certificates
// ==========================================

async function generateSelectedCertificates() {

    const ids = getSelectedStudents();

    if (ids.length === 0) {

        return showMessage(
            "Please select at least one student.",
            "warning"
        );

    }

    if (!confirm(`Generate ${ids.length} certificate(s)?`)) return;

    let success = 0;

    for (const id of ids) {

        const student = await getStudent(id);

        if (student.success) {

            const result = await generateCertificate(student.student.email);

            if (result.success) success++;

        }

    }

    showMessage(
        `${success} certificate(s) generated.`,
        "success"
    );

    loadStudents();
    refreshDashboard();

}

// ==========================================
// Email Selected
// ==========================================

async function emailSelectedCertificates() {

    const ids = getSelectedStudents();

    if (ids.length === 0) {

        return showMessage(
            "Please select at least one student.",
            "warning"
        );

    }

    let success = 0;

    for (const id of ids) {

        const result = await sendCertificateEmail(id);

        if (result.success) success++;

    }

    showMessage(
        `${success} email(s) sent.`,
        "success"
    );

}

// ==========================================
// Delete Selected
// ==========================================

async function deleteSelectedStudents() {

    const ids = getSelectedStudents();

    if (ids.length === 0) {

        return showMessage(
            "Please select at least one student.",
            "warning"
        );

    }

    if (!confirm(`Delete ${ids.length} student(s)?`)) return;

    for (const id of ids) {

        await deleteStudentAPI(id);

    }

    showMessage(
        "Students deleted successfully.",
        "success"
    );

    loadStudents();
    refreshDashboard();

}

// ==========================================
// Export Excel
// ==========================================

function exportStudentsExcel() {

    const table = document.querySelector("table");

    const workbook = XLSX.utils.table_to_book(table);

    XLSX.writeFile(
        workbook,
        "BRIHCON_Students.xlsx"
    );

}