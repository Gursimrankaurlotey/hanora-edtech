const tabs = document.querySelectorAll(".program-tab");
const panels = document.querySelectorAll(".program-panel");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        tabs.forEach(btn =>
            btn.classList.remove("active")
        );

        panels.forEach(panel =>
            panel.classList.remove("active")
        );

        tab.classList.add("active");

        document
            .getElementById(target)
            .classList.add("active");

    });

});



        document.querySelectorAll('.faq-question').forEach(question => {

            question.addEventListener('click', () => {

                const faqItem = question.parentElement;

                faqItem.classList.toggle('active');

            });

        });