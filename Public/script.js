/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("mobile-open");
    });
}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================================= */

document.querySelectorAll(".main-nav a").forEach((link) => {

    link.addEventListener("click", () => {

        if (mainNav) {
            mainNav.classList.remove("mobile-open");
        }

    });

});


/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach((button) => {

    button.addEventListener("click", () => {

        const currentItem =
            button.closest(".faq-item");

        const alreadyOpen =
            currentItem.classList.contains("open");


        /*
         * Close all FAQ items first
         */

        document
            .querySelectorAll(".faq-item")
            .forEach((item) => {

                item.classList.remove("open");

                const icon =
                    item.querySelector(".faq-question span");

                if (icon) {
                    icon.textContent = "+";
                }

            });


        /*
         * Open the clicked item
         */

        if (!alreadyOpen) {

            currentItem.classList.add("open");

            const icon =
                button.querySelector("span");

            if (icon) {
                icon.textContent = "−";
            }

        }

    });

});


/* =========================================================
   TOAST MESSAGE
========================================================= */

const toast =
    document.getElementById("toast");


function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* =========================================================
   ADMISSION FORM
========================================================= */

const admissionForm =
    document.getElementById("admissionForm");


if (admissionForm) {

    admissionForm.addEventListener(
        "submit",
        (event) => {

            /*
             * Prevent page refresh
             */

            event.preventDefault();


            /*
             * Show success message
             */

            showToast(
                "Thank you! Our counsellor will contact you shortly."
            );


            /*
             * Clear form
             */

            admissionForm.reset();

        }
    );

}


/* =========================================================
   EXPERT / COUNSELLING FORM
========================================================= */

const expertForm =
    document.getElementById("expertForm");


if (expertForm) {

    expertForm.addEventListener(
        "submit",
        (event) => {

            /*
             * Prevent page refresh
             */

            event.preventDefault();


            /*
             * Show success message
             */

            showToast(
                "Thank you! Our expert will contact you shortly."
            );


            /*
             * Clear form
             */

            expertForm.reset();

        }
    );

}


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


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                navLinks.forEach((link) => {

                    const linkTarget =
                        link.getAttribute("href");


                    link.classList.toggle(
                        "active",
                        linkTarget ===
                        `#${entry.target.id}`
                    );

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


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
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

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
    document.querySelector(".faculty-track");

const facultyPrev =
    document.querySelector(".faculty-prev");

const facultyNext =
    document.querySelector(".faculty-next");


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
            `translateX(-${currentFacultySlide * slideWidth}%)`;


        /* Disable Previous button on first slide */

        facultyPrev.disabled =
            currentFacultySlide === 0;


        /* Disable Next button on last slide */

        facultyNext.disabled =
            currentFacultySlide ===
            totalFacultySlides - 1;

    }


    /* NEXT */

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


    /* PREVIOUS */

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


    /* Initial state */

    updateFacultySlider();

}