/*************************************************
 * BRIHCON Certificate Management System
 * student-form.js
 *************************************************/

let studentModal;


/* ===========================================
   Startup
=========================================== */
document.addEventListener("DOMContentLoaded", () => {

    const modalElement = document.getElementById("studentModal");

    if (modalElement) {
        studentModal = new bootstrap.Modal(modalElement);
    }

});


/* ===========================================
   Open Add Student
=========================================== */
function openAddStudent() {

    document.getElementById("studentModalTitle").textContent =
        "Add Student";

    clearStudentForm();

    studentModal.show();

}


/* ===========================================
   Open Edit Student
=========================================== */
async function openEditStudent(certificateID) {

    const result = await getStudent(certificateID);

    if (!result.success) {

        showMessage(result.message, "danger");
        return;

    }

    const s = result.student;

    document.getElementById("studentModalTitle").textContent =
        "Edit Student";

    document.getElementById("studentID").value =
        s.studentID;

    document.getElementById("studentName").value =
        s.name || "";

    document.getElementById("studentEmail").value =
        s.email || "";

    document.getElementById("studentPhone").value =
        s.phone || "";

    document.getElementById("studentCourse").value =
        s.course || "";

    document.getElementById("studentCohort").value =
        s.cohort || "";

    document.getElementById("studentAttendance").value =
        s.attendance || 0;

    document.getElementById("studentScore").value =
        s.score || 0;

    document.getElementById("studentEligible").value =
        s.eligible ? "true" : "false";

    document.getElementById("studentStatus").value =
        s.status || "Pending";

    document.getElementById("certificateID").value =
        s.certificateID || "";

    document.getElementById("issueDate").value =
        s.issueDate || "";

    document.getElementById("certificateLink").value =
        s.certificateLink || "";

    studentModal.show();

}


/* ===========================================
   Save Student
=========================================== */
async function saveStudent() {

    const student = {

        studentID:
            document.getElementById("studentID").value,

        name:
            document.getElementById("studentName").value.trim(),

        email:
            document.getElementById("studentEmail").value.trim(),

        phone:
            document.getElementById("studentPhone").value.trim(),

        attendance:
            Number(document.getElementById("studentAttendance").value),

        score:
            Number(document.getElementById("studentScore").value),

        course:
            document.getElementById("studentCourse").value,

        cohort:
            document.getElementById("studentCohort").value,

        eligible:
            document.getElementById("studentEligible").value === "true",

        status:
            document.getElementById("studentStatus").value

    };

    let result;

    if (student.studentID === "") {

        result = await saveStudentAPI(student);

    } else {

        result = await updateStudentAPI(student);

    }

    showMessage(
        result.message,
        result.success ? "success" : "danger"
    );

    if (!result.success) return;

    studentModal.hide();

    loadStudents();

    refreshDashboard();

}


/* ===========================================
   Delete Student
=========================================== */
async function deleteStudent(certificateID) {

    if (!confirm("Delete this student?")) return;

    const result =
        await deleteStudentAPI(certificateID);

    showMessage(
        result.message,
        result.success ? "success" : "danger"
    );

    if (result.success) {

        loadStudents();

        refreshDashboard();

    }

}


/* ===========================================
   Clear Form
=========================================== */
function clearStudentForm() {

    document.getElementById("studentForm").reset();

    document.getElementById("studentID").value = "";

    document.getElementById("certificateID").value = "";

    document.getElementById("issueDate").value = "";

    document.getElementById("certificateLink").value = "";

    document.getElementById("studentPhotoPreview").src =
        "https://placehold.co/200x200?text=Student";

}


/* ===========================================
   Preview Student Photo
=========================================== */
document.getElementById("studentPhoto")?.addEventListener(
    "change",
    function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById(
                "studentPhotoPreview"
            ).src = e.target.result;

        };

        reader.readAsDataURL(file);

    }
);