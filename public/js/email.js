console.log("email.js loaded");

emailjs.init("7IkDYH_-MbgnLD3kG");

/* ==========================================================
   STATUS MODAL
========================================================== */

const statusModal = document.getElementById("formStatusModal");
const statusTitle = document.getElementById("statusTitle");
const statusMessage = document.getElementById("statusMessage");
const statusCloseBtn = document.getElementById("statusCloseBtn");
const continueBtn = document.getElementById("continueBtn");

function openStatusModal(title, message) {

    if (!statusModal) {
        console.error("formStatusModal not found.");
        return;
    }

    statusTitle.innerHTML = title;
    statusMessage.innerHTML = message;

    statusModal.classList.add("active");

}

function closeStatusModal() {

    if (!statusModal) return;

    statusModal.classList.remove("active");

}

if (statusCloseBtn) {

    statusCloseBtn.addEventListener("click", closeStatusModal);

}

if (continueBtn) {

    continueBtn.addEventListener("click", closeStatusModal);

}

if (statusModal) {

    statusModal.addEventListener("click", function (e) {

        if (e.target === statusModal) {

            closeStatusModal();

        }

    });

}

document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        closeStatusModal();

    }

});

/* ==========================================================
   SEND EMAIL
========================================================== */

// function sendEnquiry(form, templateParams, popupOverlay = null) {

//     emailjs.send(

//         "service_nxpwhh9",
//         "template_sawhvi8",
//         templateParams

//     )

//     .then(function (response) {

//     console.log("SUCCESS:", response);

//     if (popupOverlay) {

//         popupOverlay.classList.remove("active");

//     }

//     openStatusModal(

//         "Thank You!",

//         `
//         Thank you for contacting <strong>Hanora EdTech</strong>.<br><br>

//         We have successfully received your enquiry.

//         Our admission counsellors will connect with you shortly regarding admissions, eligibility and programme details.

//         <br><br>

//         We look forward to supporting your academic journey.
//         `

//     );

//     form.reset();

// })

//     .catch(function (error) {

//         console.error(error);

//         openStatusModal(

//             "Submission Failed",

//             `
//             We couldn't submit your enquiry at the moment.

//             <br><br>

//             Please try again after a few minutes or contact our admission team directly.
//             `

//         );

//     });

// }

function sendEnquiry(form, templateParams, popupOverlay = null) {

    const submitBtn = form.querySelector("button[type='submit']");

    // Save original button text
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "";

    // Show loading state immediately
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <i class="ri-loader-4-line ri-spin"></i>
            Submitting...
        `;
    }

    emailjs.send(
        "service_nxpwhh9",
        "template_sawhvi8",
        templateParams
    )

    .then(function (response) {

        console.log("SUCCESS:", response);

        // Restore button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }

        form.reset();

        if (popupOverlay) {
            popupOverlay.classList.remove("active");
        }

        // Show popup immediately after success
        openStatusModal(

            "Thank You!",

            `
            Thank you for contacting <strong>Hanora EdTech</strong>.<br><br>

            We have successfully received your enquiry.

            Our admission counsellors will contact you shortly regarding admissions,
            eligibility, programmes and fee details.

            <br><br>

            We look forward to supporting your academic and professional journey.
            `

        );

    })

    .catch(function (error) {

        console.error(error);

        // Restore button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }

        openStatusModal(

            "Submission Failed",

            `
            We couldn't submit your enquiry at the moment.

            <br><br>

            Please try again after a few minutes or contact our admission team directly.
            `

        );

    });

}

/* ==========================================================
   FORM SUBMISSION
========================================================== */

document.addEventListener("submit", function (e) {

    const form = e.target;
        /* =====================================
       POPUP FORM
    ===================================== */

    if (form.closest(".popup-right")) {

        e.preventDefault();

        const inputs = form.querySelectorAll("input");
        const select = form.querySelector("select");

        const templateParams = {

            name: inputs[0]?.value.trim() || "",

            email: inputs[1]?.value.trim() || "",

            phone: inputs[2]?.value.trim() || "",

            experience: inputs[3]?.value.trim() || "",

            course: select?.value || "",

            source: "Popup Form",

            message: "New admission enquiry received."

        };

        sendEnquiry(
            form,
            templateParams,
            document.getElementById("popupOverlay")
        );

        return;

    }

    /* =====================================
       CONTACT FORM
    ===================================== */

    if (form.id === "contactForm") {

        e.preventDefault();

        const templateParams = {

            name:
                document.getElementById("contactName")?.value.trim() || "",

            email:
                document.getElementById("contactEmail")?.value.trim() || "",

            phone:
                document.getElementById("contactPhone")?.value.trim() || "",

            course:
                document.getElementById("contactCourse")?.value || "",

            experience:
                "N/A",

            source:
                "Contact Page",

            message:
                document.getElementById("contactMessage")?.value.trim() || ""

        };

        sendEnquiry(form, templateParams);

        return;

    }

});