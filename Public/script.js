/* =========================================================
   EMAILJS CONFIGURATION
========================================================= */

const EMAILJS_PUBLIC_KEY = "7IkDYH_-MbgnLD3kG";
const EMAILJS_SERVICE_ID = "service_nxpwhh9";
const EMAILJS_TEMPLATE_ID = "template_r9z8srf";


/* =========================================================
   INITIALIZE EMAILJS
========================================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            mainNav.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================================= */

document
    .querySelectorAll(".main-nav a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                if (mainNav) {

                    mainNav.classList.remove(
                        "mobile-open"
                    );

                }

            }
        );

    });


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const currentItem =
                button.closest(".faq-item");


            if (!currentItem) {
                return;
            }


            const alreadyOpen =
                currentItem.classList.contains(
                    "open"
                );


            document
                .querySelectorAll(".faq-item")
                .forEach((item) => {

                    item.classList.remove(
                        "open"
                    );


                    const icon =
                        item.querySelector(
                            ".faq-question span"
                        );


                    if (icon) {
                        icon.textContent = "+";
                    }

                });


            if (!alreadyOpen) {

                currentItem.classList.add(
                    "open"
                );


                const icon =
                    button.querySelector(
                        "span"
                    );


                if (icon) {
                    icon.textContent = "−";
                }

            }

        }
    );

});


/* =========================================================
   TOAST MESSAGE
========================================================= */

const toast =
    document.getElementById("toast");


let toastTimeout;


function showToast(message) {

    if (!toast) {
        return;
    }


    toast.textContent = message;


    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );

}


/* =========================================================
   THANK YOU POPUP
========================================================= */

function showThankYouPopup() {

    /*
     * Prevent duplicate popup
     */

    const existingPopup =
        document.getElementById(
            "thankYouPopup"
        );


    if (existingPopup) {
        return;
    }


    /*
     * Create overlay
     */

    const overlay =
        document.createElement("div");


    overlay.id =
        "thankYouPopup";


    /*
     * Popup HTML
     */

    overlay.innerHTML = `

        <div class="thank-you-overlay">

            <div class="thank-you-modal">

                <div class="thank-you-icon">
                    ✓
                </div>

                <h2>
                    Thank You!
                </h2>

                <p>
                    Your application has been submitted
                    successfully. We will get in touch with you
                    soon.
                </p>

                <button
                    type="button"
                    id="thankYouOkButton"
                >
                    OK
                </button>

            </div>

        </div>

    `;


    /*
     * Popup CSS
     */

    const style =
        document.createElement("style");


    style.textContent = `

        .thank-you-overlay {

            position: fixed;

            inset: 0;

            width: 100%;

            height: 100%;

            background: rgba(0, 0, 0, 0.65);

            display: flex;

            align-items: center;

            justify-content: center;

            z-index: 999999;

            padding: 20px;

            box-sizing: border-box;

        }


        .thank-you-modal {

            width: 100%;

            max-width: 400px;

            background: #ffffff;

            border-radius: 18px;

            padding: 40px 30px;

            text-align: center;

            box-sizing: border-box;

            box-shadow:
                0 20px 60px rgba(0, 0, 0, 0.25);

            animation:
                thankYouPopupIn 0.25s ease-out;

        }


        .thank-you-icon {

            width: 60px;

            height: 60px;

            margin: 0 auto 22px;

            border-radius: 50%;

            background: #4caf50;

            color: #ffffff;

            display: flex;

            align-items: center;

            justify-content: center;

            font-size: 38px;

            font-weight: 700;

        }


        .thank-you-modal h2 {

            margin: 0 0 14px;

            color: #174384;

            font-size: 27px;

            font-weight: 700;

        }


        .thank-you-modal p {

            margin: 0 auto 26px;

            max-width: 320px;

            color: #666666;

            font-size: 16px;

            line-height: 1.55;

        }


        .thank-you-modal button {

            border: none;

            background: #174384;

            color: #ffffff;

            padding: 13px 32px;

            border-radius: 7px;

            font-size: 16px;

            font-weight: 700;

            cursor: pointer;

        }


        .thank-you-modal button:hover {

            background: #12366d;

        }


        @keyframes thankYouPopupIn {

            from {

                opacity: 0;

                transform: scale(0.92);

            }

            to {

                opacity: 1;

                transform: scale(1);

            }

        }


        @media (max-width: 480px) {

            .thank-you-modal {

                max-width: 340px;

                padding: 32px 22px;

            }


            .thank-you-modal h2 {

                font-size: 24px;

            }


            .thank-you-modal p {

                font-size: 15px;

            }

        }

    `;


    document.head.appendChild(style);


    document.body.appendChild(overlay);


    /*
     * OK button
     */

    const okButton =
        document.getElementById(
            "thankYouOkButton"
        );


    if (okButton) {

        okButton.addEventListener(
            "click",
            () => {

                overlay.remove();

                style.remove();

            }
        );

    }

}


/* =========================================================
   EMAILJS FORM SENDING FUNCTION
========================================================= */

function sendFormWithEmailJS(
    form,
    formType,
    successMessage,
    showPopup = false
) {

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        async (event) => {

            /*
             * Prevent normal page refresh
             */

            event.preventDefault();


            /*
             * Check EmailJS
             */

            if (
                typeof emailjs ===
                "undefined"
            ) {

                showToast(
                    "Email service is not available. Please try again."
                );


                console.error(
                    "EmailJS SDK is not loaded."
                );


                return;

            }


            /*
             * Get form fields
             */

            const nameField =
                form.querySelector(
                    '[name="name"]'
                );


            const emailField =
                form.querySelector(
                    '[name="email"]'
                );


            const phoneField =
                form.querySelector(
                    '[name="phone"]'
                );


            const programField =
                form.querySelector(
                    '[name="program"]'
                );


            const consentField =
                form.querySelector(
                    '[name="consent"]'
                );


            /*
             * Get values
             */

            const name =
                nameField
                    ? nameField.value.trim()
                    : "";


            const email =
                emailField
                    ? emailField.value.trim()
                    : "";


            const phone =
                phoneField
                    ? phoneField.value.trim()
                    : "";


            const program =
                programField
                    ? programField.value.trim()
                    : "";


            /*
             * CONSENT TEXT
             *
             * This exact sentence will be
             * sent to EmailJS.
             */

            const consent =
                consentField &&
                consentField.checked

                    ? "I am interested in receiving admission/course counselling and agree to be contacted regarding my enquiry."

                    : "Not provided";


            /*
             * Additional message
             */

            const message =
                `New ${formType} enquiry received from the Amity University Online website.`;


            /*
             * EmailJS parameters
             */

            const templateParams = {

                name: name,

                email: email,

                phone: phone,

                program: program,

                consent: consent,

                form_type: formType,

                message: message

            };


            /*
             * Submit button
             */

            const submitButton =
                form.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );


            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "";


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.textContent =
                    "Sending...";

            }


            try {

                /*
                 * Send EmailJS
                 */

                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams
                );


                /*
                 * Reset form
                 */

                form.reset();


                /*
                 * Show custom popup
                 * ONLY for admission form
                 */

                if (showPopup) {

                    showThankYouPopup();

                } else {

                    showToast(
                        successMessage
                    );

                }


            } catch (error) {

                console.error(
                    "EmailJS Error:",
                    error
                );


                showToast(
                    "Unable to send your enquiry. Please try again."
                );


            } finally {

                /*
                 * Enable button again
                 */

                if (submitButton) {

                    submitButton.disabled =
                        false;


                    submitButton.textContent =
                        originalButtonText ||
                        "Apply Now";

                }

            }

        }
    );

}


/* =========================================================
   ADMISSION FORM
========================================================= */

const admissionForm =
    document.getElementById(
        "admissionForm"
    );


sendFormWithEmailJS(
    admissionForm,
    "Admission",
    "Thank you! Your admission enquiry has been sent successfully.",
    true
);


/* =========================================================
   EXPERT / COUNSELLING FORM
========================================================= */

const expertForm =
    document.getElementById(
        "expertForm"
    );


sendFormWithEmailJS(
    expertForm,
    "Expert / Counselling",
    "Thank you! Your enquiry has been sent successfully. Our expert will contact you shortly.",
    true
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        navLinks.forEach(
                            (link) => {

                                const linkTarget =
                                    link.getAttribute(
                                        "href"
                                    );


                                link.classList.toggle(
                                    "active",
                                    linkTarget ===
                                    `#${entry.target.id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        (section) => {

            sectionObserver.observe(
                section
            );

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                /*
                 * APPLY NOW
                 *
                 * Keep the admission form
                 * in its normal hero position.
                 */

                if (
                    targetId === "#apply"
                ) {

                    const hero =
                        document.getElementById(
                            "home"
                        );


                    if (hero) {

                        event.preventDefault();


                        hero.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }


                    return;

                }


                /*
                 * Normal anchor scrolling
                 */

                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =========================================================
   FACULTY SLIDER
========================================================= */

const facultyTrack =
    document.querySelector(
        ".faculty-track"
    );


const facultyPrev =
    document.querySelector(
        ".faculty-prev"
    );


const facultyNext =
    document.querySelector(
        ".faculty-next"
    );


if (
    facultyTrack &&
    facultyPrev &&
    facultyNext
) {

    let currentFacultySlide = 0;


    const totalFacultySlides = 3;


    function updateFacultySlider() {

        const slideWidth =
            100 / totalFacultySlides;


        facultyTrack.style.transform =
            `translateX(-${
                currentFacultySlide *
                slideWidth
            }%)`;


        facultyPrev.disabled =
            currentFacultySlide === 0;


        facultyNext.disabled =
            currentFacultySlide ===
            totalFacultySlides - 1;

    }


    /*
     * NEXT
     */

    facultyNext.addEventListener(
        "click",
        () => {

            if (
                currentFacultySlide <
                totalFacultySlides - 1
            ) {

                currentFacultySlide++;


                updateFacultySlider();

            }

        }
    );


    /*
     * PREVIOUS
     */

    facultyPrev.addEventListener(
        "click",
        () => {

            if (
                currentFacultySlide > 0
            ) {

                currentFacultySlide--;


                updateFacultySlider();

            }

        }
    );


    /*
     * Initial state
     */

    updateFacultySlider();

}