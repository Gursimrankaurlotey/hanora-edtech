/* =========================================
   UNIVERSITY DATA
========================================= */

const universityData = {

    amity: {

        name: "Amity University Online",

        fees: "₹1,95,000 onwards",

        placement: "Placement assistance available",

        accreditation: "UGC | NAAC A+",

        lms: "Advanced LMS",

        exams: "Online / Proctored Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    "dy-patil": {

        name: "DY Patil University",

        fees: "₹1,69,000 onwards",

        placement: "Placement assistance available",

        accreditation: "UGC | NAAC A+",

        lms: "Digital Learning Platform",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    jain: {

        name: "Jain University",

        fees: "₹1,80,000 onwards",

        placement: "Career & placement support",

        accreditation: "UGC | NAAC A++",

        lms: "Jain Online LMS",

        exams: "Online / Proctored Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    lpu: {

        name: "Lovely Professional University",

        fees: "₹1,62,800 onwards",

        placement: "Placement assistance available",

        accreditation: "UGC | NAAC A++",

        lms: "LPU Online LMS",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    manipal: {

        name: "Manipal University Jaipur",

        fees: "₹1,75,000 onwards",

        placement: "Career support available",

        accreditation: "UGC | NAAC A+",

        lms: "Manipal LMS",

        exams: "Online / Proctored Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    noida: {

        name: "Noida International University",

        fees: "Contact for latest fees",

        placement: "Placement support available",

        accreditation: "UGC recognised",

        lms: "Online Learning Platform",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    sharda: {

        name: "Sharda University",

        fees: "Contact for latest fees",

        placement: "Placement assistance available",

        accreditation: "UGC recognised",

        lms: "Online LMS",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    shoolini: {

        name: "Shoolini University",

        fees: "Contact for latest fees",

        placement: "Placement support available",

        accreditation: "UGC | NAAC A+",

        lms: "Digital LMS",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    sikkim: {

        name: "Sikkim Manipal University",

        fees: "Contact for latest fees",

        placement: "Career assistance available",

        accreditation: "UGC recognised",

        lms: "SMU Online LMS",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    uttaranchal: {

        name: "Uttaranchal University",

        fees: "Contact for latest fees",

        placement: "Placement support available",

        accreditation: "UGC | NAAC A+",

        lms: "Online LMS",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    vgu: {

        name: "Vivekananda Global University",

        fees: "Contact for latest fees",

        placement: "Placement assistance available",

        accreditation: "UGC | NAAC A+",

        lms: "Online LMS",

        exams: "Online Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    },

    nmims: {

        name: "NMIMS Online",

        fees: "Contact for latest fees",

        placement: "Career support available",

        accreditation: "UGC recognised",

        lms: "NMIMS LMS",

        exams: "Online / Proctored Exams",

        degree: "UGC-recognised degree",

        specializations: "Multiple specializations",

        scholarships: "Scholarships available"

    }

};


/* =========================================
   SELECTION
========================================= */

function handleSelection(checkbox) {

    const checkboxes =
        document.querySelectorAll(".university-checkbox");

    const selected =
        document.querySelectorAll(".university-checkbox:checked");

    if (selected.length > 3) {

        checkbox.checked = false;

        alert("You can compare a maximum of 3 universities.");

        return;

    }

    updateSelection();

}


/* =========================================
   UPDATE SELECTION
========================================= */

function updateSelection() {

    const selected =
        document.querySelectorAll(".university-checkbox:checked");

    const count =
        document.getElementById("selectedCount");

    const compareBtn =
        document.getElementById("compareBtn");

    count.textContent = selected.length;

    compareBtn.disabled =
        selected.length < 2;

}


/* =========================================
   CLEAR SELECTION
========================================= */

function clearSelection() {

    document
        .querySelectorAll(".university-checkbox")
        .forEach(function (checkbox) {

            checkbox.checked = false;

        });

    updateSelection();

    document
        .getElementById("comparisonResult")
        .classList.remove("active");

}


/* =========================================
   COMPARE UNIVERSITIES
========================================= */

function compareUniversities() {

    const selected =
        Array.from(
            document.querySelectorAll(
                ".university-checkbox:checked"
            )
        ).map(function (checkbox) {

            return checkbox.value;

        });


    if (selected.length < 2) {

        alert("Please select at least 2 universities.");

        return;

    }


    /* HEADINGS */

    for (let i = 1; i <= 3; i++) {

        const heading =
            document.getElementById(
                "universityHead" + i
            );

        const university =
            selected[i - 1];


        if (university) {

            heading.textContent =
                universityData[university].name;

            heading.style.display = "";

        } else {

            heading.textContent = "";

            heading.style.display = "none";

        }

    }


    /* DATA */

    const fields = [

        "fees",

        "placement",

        "accreditation",

        "lms",

        "exams",

        "degree",

        "specializations",

        "scholarships"

    ];


    fields.forEach(function (field) {

        for (let i = 1; i <= 3; i++) {

            const cell =
                document.getElementById(
                    field + i
                );

            const university =
                selected[i - 1];


            if (university) {

                cell.textContent =
                    universityData[university][field];

                cell.style.display = "";

            } else {

                cell.textContent = "";

                cell.style.display = "none";

            }

        }

    });


    /* SHOW RESULT */

    const result =
        document.getElementById(
            "comparisonResult"
        );

    result.classList.add("active");


    /* SCROLL */

    setTimeout(function () {

        result.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }, 100);

}