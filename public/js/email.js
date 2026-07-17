console.log("email.js loaded");

emailjs.init("7IkDYH_-MbgnLD3kG");

/* =========================================
   FORM SUBMIT HANDLER
========================================= */

document.addEventListener("submit", function (e) {

    const form = e.target;

    /* =====================================
       POPUP FORM
    ===================================== */

    if (form.closest(".popup-right")) {

        e.preventDefault();

        const inputs =
            form.querySelectorAll("input");

        const select =
            form.querySelector("select");

        const templateParams = {

            name:
                inputs[0]?.value || "",

            email:
                inputs[1]?.value || "",

            phone:
                inputs[2]?.value || "",

            experience:
                inputs[3]?.value || "",

            course:
                select?.value || "",

            source:
                "Popup Form",

            message:
                "New admission enquiry received."

        };

        console.log("Popup Data:", templateParams);

        emailjs.send(
            "service_nxpwhh9",
            "template_sawhvi8",
            templateParams
        )
        .then(function (response) {

            console.log("SUCCESS:", response);

            form.reset();

            const popupOverlay =
                document.getElementById("popupOverlay");

            if (popupOverlay) {
                popupOverlay.classList.remove("active");
            }


        })
        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

        });

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

        console.log("Contact Data:", templateParams);

        emailjs.send(
            "service_nxpwhh9",
            "template_sawhvi8",
            templateParams
        )
        .then(function (response) {

            console.log("SUCCESS:", response);

            form.reset();

        })
        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

        });

    }

});