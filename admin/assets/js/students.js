/*************************************************
 * BRIHCON Certificate Management System
 * students.js
 *************************************************/

let students = [];

//============================================
// Find Student
//============================================

function findStudentRow(id) {

    return students.find(student =>
        String(student.certificateID).trim() === String(id).trim()
    );

}

//============================================
// Load Students
//============================================

async function loadStudents(keyword = "") {

    try {

        const result = await searchStudents(keyword);

        console.log("Students API Result:", result);

        if (!result.success) {

            throw new Error(result.message);

        }

        students = result.data || [];

        console.log("Students Array:", students);

        renderStudents(students);

    }

    catch (error) {

        console.error(error);

        showMessage(error.message, "danger");

    }

}



//============================================
// Render Students
//============================================

function renderStudents(data) {

    const table = document.getElementById("studentsTable");

    console.log("TABLE FOUND:", table);


    if (!table) {

        console.error("Students table not found.");

        return;

    }


    table.innerHTML = "";


    // No students found

    if (!data || data.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="8" class="text-center py-5">

                    No students found.

                </td>

            </tr>

        `;

        return;

    }



    // Generate rows

    data.forEach(student => {


        const isEligible =
            student.eligible === true ||
            student.eligible === "Eligible";



        const status =
            student.status || "Pending";



        table.innerHTML += `

        <tr>


            <td>

    <input
        type="checkbox"
        class="student-check"
        value="${student.certificateID}">

</td>



            <td>

                ${student.name || "-"}

            </td>



            <td>

                ${student.email || "-"}

            </td>



            <td>

                ${student.attendance ?? 0}%

            </td>



            <td>

                <span class="badge bg-${isEligible ? "success" : "danger"}">

                    ${isEligible ? "Eligible" : "Not Eligible"}

                </span>

            </td>



            <td>

                ${student.certificateID || "-"}

            </td>



            <td>

                <span class="badge bg-${status === "ACTIVE" ? "success" : "warning"}">

                    ${status}

                </span>

            </td>



            <td class="text-nowrap">


                <button
                    class="btn btn-success btn-sm me-1"
                    title="Generate Certificate"
                    onclick="generateStudentCertificate('${student.email}')">

                    <i class="fas fa-award"></i>

                </button>



                <button
                    class="btn btn-primary btn-sm me-1"
                    title="Send Email"
                    onclick="emailCertificate('${student.certificateID}')">

                    <i class="fas fa-envelope"></i>

                </button>


                <button
                    class="btn btn-info btn-sm me-1"
                    title="Download"
                    onclick="downloadCertificate('${student.certificateLink || ""}')">

                    <i class="fas fa-download"></i>

                </button>
                



                <button
    class="btn btn-secondary btn-sm me-1"
    title="Verify Certificate"
    onclick="window.open('../verify.html?id=${student.certificateID}', '_blank')">

    <i class="fas fa-eye"></i>

</button>

                <button
class="btn btn-warning btn-sm me-1"
title="Edit Student"
onclick="openEditStudent('${student.certificateID}')">

<i class="fas fa-edit"></i>

</button>

                

                <button
class="btn btn-danger btn-sm"
title="Delete Student"
onclick="deleteStudent('${student.certificateID}')">

<i class="fas fa-trash"></i>

</button>

<input
type="file"
id="excelFile"
accept=".xlsx,.xls,.csv"
style="display:none"
onchange="importStudents(event)">

<button
class="btn btn-success"
onclick="document.getElementById('excelFile').click()">

<i class="fas fa-file-excel"></i>

Import Excel

</button>



                ${status === "REVOKED" ? `

<button
    class="btn btn-warning btn-sm"
    title="Restore Certificate"
    onclick="restoreStudentCertificate('${student.certificateID}')">

    <i class="fas fa-undo"></i>

</button>

` : `

<button
    class="btn btn-danger btn-sm"
    title="Revoke Certificate"
    onclick="revokeStudentCertificate('${student.certificateID}')">

    <i class="fas fa-ban"></i>

</button>

`}


            </td>


        </tr>

        `;


    });

    
    console.log("Generated Table HTML:", table.innerHTML);

}

//============================================
// Live Search
//============================================

const searchBox = document.getElementById("keyword");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        loadStudents(this.value);

    });

}

//============================================
// Generate
//============================================

async function generateStudentCertificate(email){

if(!confirm("Generate certificate for this student?")) return;

const result = await generateCertificate(email);

showMessage(result.message,result.success?"success":"danger");

loadStudents();

refreshDashboard();

}

//============================================
// Email
//============================================
async function emailCertificate(certificateID) {

    try {

        const result =
            await sendCertificateEmail(certificateID);

        showMessage(
            result.message,
            result.success
                ? "success"
                : "danger"
        );

    }

    catch (error) {

        console.error(
            "Email Certificate Error:",
            error
        );

        showMessage(
            error.message,
            "danger"
        );

    }

}

//============================================
// Download
//============================================

function downloadCertificate(url){

if(!url){

showMessage("Certificate has not been generated yet.","warning");

return;

}

window.open(url,"_blank");

}

//============================================
// Preview
//============================================

function previewCertificate(url){

if(!url){

showMessage("Certificate has not been generated yet.","warning");

return;

}

window.open(url,"_blank");

}

//============================================
// Revoke
//============================================

async function revokeStudentCertificate(certificateID) {

    if (!confirm("Revoke this certificate?")) return;

    const result = await revokeCertificate(certificateID);

    showMessage(result.message, result.success ? "success" : "danger");

    if (result.success) {
        await loadStudents();
        await refreshDashboard();
    }
}

//============================================
// Restore
//============================================

async function restoreStudentCertificate(id){

const result = await restoreCertificate(id);

showMessage(result.message,result.success?"success":"danger");

loadStudents();

refreshDashboard();

}

//============================================
// Startup
//============================================

document.addEventListener("DOMContentLoaded",()=>{

loadStudents();

});