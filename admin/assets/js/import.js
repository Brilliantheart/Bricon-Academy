/*************************************************
 * BRIHCON Certificate Management System
 * import.js
 *************************************************/

async function importStudents(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function(e) {

        const workbook = XLSX.read(

            e.target.result,

            {

                type: "binary"

            }

        );

        const sheet = workbook.Sheets[
            workbook.SheetNames[0]
        ];

        const rows = XLSX.utils.sheet_to_json(sheet);

        let imported = 0;

        for (const row of rows) {

            const student = {

                name:
                    row.Name || "",

                email:
                    row.Email || "",

                phone:
                    row.Phone || "",

                attendance:
                    Number(row.Attendance) || 0,

                score:
                    Number(row.Score) || 0,

                course:
                    row.Course || "",

                cohort:
                    row.Cohort || "",

                eligible:
                    String(row.Eligible).toLowerCase() === "true" ||
                    String(row.Eligible).toLowerCase() === "eligible",

                status:
                    row.Status || "Pending"

            };

            const result =
                await saveStudentAPI(student);

            if (result.success) imported++;

        }

        showMessage(

            `${imported} students imported successfully.`,

            "success"

        );

        loadStudents();

        refreshDashboard();

    };

    reader.readAsBinaryString(file);

}