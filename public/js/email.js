console.log("email.js loaded");

emailjs.init("7IkDYH_-MbgnLD3kG");

/* ==========================================================
   STATUS MODAL
========================================================== */

let statusModal;
let statusTitle;
let statusMessage;
let statusCloseBtn;
let continueBtn;

function initialiseStatusModal() {

    statusModal = document.getElementById("formStatusModal");
    statusTitle = document.getElementById("statusTitle");
    statusMessage = document.getElementById("statusMessage");
    statusCloseBtn = document.getElementById("statusCloseBtn");
    continueBtn = document.getElementById("continueBtn");

    if (!statusModal) {
        console.log("Popup not loaded yet");
        return;
    }

    if (statusCloseBtn) {
    statusCloseBtn.onclick = closeStatusModal;
}

if (continueBtn) {
    continueBtn.onclick = closeStatusModal;
}

    statusModal.onclick = function (e) {

        if (e.target === statusModal) {

            closeStatusModal();

        }

    };

}

document.addEventListener("componentLoaded", function (e) {

    if (e.detail.element.id === "popup") {

        console.log("Popup component loaded");

        initialiseStatusModal();

    }

});

function openStatusModal(title, message) {

    if (!statusModal) {

        initialiseStatusModal();

    }

    if (!statusModal) {
    console.log("Popup HTML still missing");
    return;
}

console.log("Status Modal Found");

    statusTitle.innerHTML = title;
    statusMessage.innerHTML = message;

    statusModal.classList.add("active");

}


document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        closeStatusModal();
    }

});

/* ==========================================================
   SEND EMAIL
========================================================== */

function sendEnquiry(form, templateParams, popupOverlay = null) {

    openStatusModal(
        "Sending...",
        "Please wait while we submit your enquiry."
    );

    emailjs.send(
        "service_nxpwhh9",
        "template_sawhvi8",
        templateParams
    )

    .then(function (response) {

        console.log("SUCCESS:", response);

        form.reset();

        if (popupOverlay) {
            popupOverlay.classList.remove("active");
        }

        openStatusModal(

            "Thank You!",

            `
            Thank you for contacting <strong>Hanora EdTech</strong>.<br><br>

            We have successfully received your enquiry.

            Our admission counsellors will connect with you shortly to provide personalized guidance regarding programme selection, eligibility, admissions, and the enrolment process.

            <br><br>

            We look forward to supporting you in achieving your academic and professional goals.
            `
        );

    })

    .catch(function (error) {

        console.error(error);

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

            name: inputs[0]?.value || "",

            email: inputs[1]?.value || "",

            phone: inputs[2]?.value || "",

            experience: inputs[3]?.value || "",

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
                document.getElementById("contactName")?.value || "",

            email:
                document.getElementById("contactEmail")?.value || "",

            phone:
                document.getElementById("contactPhone")?.value || "",

            course:
                document.getElementById("contactCourse")?.value || "",

            experience:
                "N/A",

            source:
                "Contact Page",

            message:
                document.getElementById("contactMessage")?.value || ""

        };

        sendEnquiry(form, templateParams);

    }

});