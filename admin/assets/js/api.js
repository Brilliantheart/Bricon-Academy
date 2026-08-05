/*************************************************
 * BRIHCON Certificate Management System
 * api.js
 *************************************************/

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbxDbPwXXDzWbyAxyiQN57hT2HyJUrzVJd_TEQZaiDzU9Y-G57OfMNeTEmmJqgPz_q3czg/exec";


/*************************************************
 * Generic GET
 *************************************************/
async function apiGet(params={}){

    try{

        const url =
            WEB_APP_URL +
            "?" +
            new URLSearchParams(params);

        const response=await fetch(url);

        return await response.json();

    }

    catch(error){

        console.error(error);

        return{

            success:false,

            message:error.message

        };

    }

}


/*************************************************
 * Generic POST
 *************************************************/
async function apiPost(data={}){

    try{

        const response=await fetch(

            WEB_APP_URL,

            {

                method:"POST",

                headers:{

                    "Content-Type":"text/plain"

                },

                body:JSON.stringify(data)

            }

        );

        return await response.json();

    }

    catch(error){

        console.error(error);

        return{

            success:false,

            message:error.message

        };

    }

}


/*************************************************
 * Dashboard
 *************************************************/

const getDashboardStats=()=>apiGet({

    action:"dashboard"

});


/*************************************************
 * Students
 *************************************************/

const searchStudents=(keyword="")=>apiGet({

    action:"search",

    keyword

});

const getStudent=(studentID)=>apiGet({

    action:"getStudent",

    studentID

});

const saveStudentAPI=(student)=>apiPost({

    action:"saveStudent",

    student

});

const updateStudentAPI=(student)=>apiPost({

    action:"updateStudent",

    student

});

const deleteStudentAPI = (studentID) => apiPost({

    action: "deleteStudent",

    studentID

});


/*************************************************
 * Certificates
 *************************************************/

const generateCertificate=(email)=>apiGet({

    action:"generate",

    email

});

const sendCertificateEmail = (certificateID) => apiPost({

    action: "email",

    certificateID

});

const revokeCertificate=(certificateID)=>apiPost({

    action:"revoke",

    certificateID

});

const restoreCertificate=(certificateID)=>apiPost({

    action:"restore",

    certificateID

});


/*************************************************
 * Verification
 *************************************************/

const verifyCertificate=(id)=>apiGet({

    id

});


/*************************************************
 * Health
 *************************************************/

const pingAPI=()=>apiGet({

    action:"ping"

});