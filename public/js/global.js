/* =========================================
   COMPONENT TARGETS
========================================= */

const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");
const popup = document.getElementById("popup");

/* =========================================
   DETECT PAGE DEPTH
========================================= */

const path = window.location.pathname;

const ROOT =
    path.includes("/courses/") ||
    path.includes("/universities/")
        ? "../"
        : "";

/* =========================================
   LOAD COMPONENT FUNCTION
========================================= */

// function loadComponent(element, filePath) {

//     if (!element) return;

//     fetch(filePath)
//         .then(response => {

//             if (!response.ok) {
//                 throw new Error(`Failed to load: ${filePath}`);
//             }

//             return response.text();

//         })
//         .then(data => {

//             data = data.replaceAll("{{ROOT}}", ROOT);

//             element.innerHTML = data;

//         })
//         .catch(error => {

//             console.error(
//                 "Component load error:",
//                 error
//             );

//         });

// }

function loadComponent(element, filePath) {

    if (!element) return;

    fetch(filePath)
        .then(response => {

            if (!response.ok) {
                throw new Error(`Failed to load: ${filePath}`);
            }

            return response.text();

        })
        .then(data => {

            data = data.replaceAll("{{ROOT}}", ROOT);

            element.innerHTML = data;

            /* =====================================
               COMPONENT LOADED EVENT
            ===================================== */

            const event = new CustomEvent("componentLoaded", {

                detail: {

                    element,
                    filePath

                }

            });

            document.dispatchEvent(event);

        })
        .catch(error => {

            console.error(
                "Component load error:",
                error
            );

        });

}

/* =========================================
   LOAD GLOBAL COMPONENTS
========================================= */

loadComponent(
    navbar,
    `${ROOT}components/navbar.html`
);

loadComponent(
    footer,
    `${ROOT}components/footer.html`
);

loadComponent(
    popup,
    `${ROOT}components/popup.html`
);

/* =========================================
   GLOBAL POPUP EVENTS
========================================= */

document.addEventListener("click", (e) => {

    const popupOverlay =
        document.getElementById("popupOverlay");

    if (!popupOverlay) return;

    if (e.target.closest("#openPopupBtn")) {

        popupOverlay.classList.add("active");

    }

    if (e.target.closest("#popupClose")) {

        popupOverlay.classList.remove("active");

    }

    if (e.target === popupOverlay) {

        popupOverlay.classList.remove("active");

    }

});

/* =========================================
   MOBILE MENU
========================================= */

document.addEventListener("click", (e) => {

    const menuBtn =
        e.target.closest("#menuToggle");

    const navRight =
        document.querySelector(".nav-right");

    const dropdown =
        e.target.closest(".dropdown-link");

    if (menuBtn && navRight) {

        navRight.classList.toggle("active");

    }

    if (dropdown && window.innerWidth <= 992) {

        e.preventDefault();

        dropdown.parentElement.classList.toggle(
            "active"
        );

    }

});

/* =========================================
   STICKY NAVBAR
========================================= */

window.addEventListener("scroll", () => {

    const nav =
        document.querySelector(".navbar");

    if (!nav) return;

    if (window.scrollY > 50) {

        nav.classList.add("scrolled");

    } else {

        nav.classList.remove("scrolled");

    }

});
