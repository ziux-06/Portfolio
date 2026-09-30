
/* =========================================================
   AI ENGINEER PORTFOLIO - JAVASCRIPT
   Piyush Sharma
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION MENU
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            // Change hamburger icon
            if (navMenu.classList.contains("active")) {
                menuBtn.innerHTML = "✕";
                menuBtn.setAttribute("aria-label", "Close navigation");
            } else {
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-label", "Open navigation");
            }
        });

        // Close mobile menu after clicking a navigation link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");

                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-label", "Open navigation");
            });
        });
    }


    /* =====================================================
       2. NAVBAR SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* =====================================================
       3. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       4. SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       5. CONTACT FORM
       ===================================================== */

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            if (!name || !email || !message) {
                return;
            }

            const nameValue = name.value.trim();
            const emailValue = email.value.trim();
            const messageValue = message.value.trim();

            /* Validation */

            if (nameValue === "") {
                alert("Please enter your name.");
                name.focus();
                return;
            }

            if (emailValue === "") {
                alert("Please enter your email address.");
                email.focus();
                return;
            }

            // Basic email validation
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(emailValue)) {
                alert("Please enter a valid email address.");
                email.focus();
                return;
            }

            if (messageValue === "") {
                alert("Please enter your message.");
                message.focus();
                return;
            }


            /* =================================================
               CREATE EMAIL
               ================================================= */

            const recipient = "piyush664128sharma@mail.com";

            const subject =
                `Portfolio Contact Message from ${nameValue}`;

            const body =
                `Hello Piyush,

You have received a new message from your portfolio website.

Name:
${nameValue}

Email:
${emailValue}

Message:
${messageValue}

--------------------------------
Sent from your AI Engineer Portfolio
`;


            /*
             * Opens the visitor's default email application.
             */

            const mailtoLink =
                `mailto:${recipient}` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoLink;


            /* Clear form */

            contactForm.reset();

        });

    }


    /* =====================================================
       6. EMAIL LINK
       ===================================================== */

    const emailLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    emailLinks.forEach(link => {

        link.addEventListener("click", () => {

            console.log("Opening email application...");

        });

    });


    /* =====================================================
       7. EXTERNAL LINKS
       ===================================================== */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =====================================================
       8. PROJECT LINKS
       ===================================================== */

    const projectLinks = document.querySelectorAll(
        ".project-link"
    );

    projectLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            /*
             * Prevent empty "#" project links from
             * jumping to the top of the page.
             */

            if (!href || href === "#") {

                event.preventDefault();

                alert(
                    "This project link will be available soon."
                );

            }

        });

    });


    /* =====================================================
       9. RESUME BUTTON
       ===================================================== */

    const resumeLink = document.querySelector(
        '.social-links a[aria-label="RESUME"]'
    );

    if (resumeLink) {

        resumeLink.addEventListener("click", function (event) {

            const resumeFile = "resume.pdf";

            /*
             * Change "resume.pdf" to the exact name
             * of your resume file.
             */

            this.href = resumeFile;
            this.target = "_blank";
            this.rel = "noopener noreferrer";

        });

    }


    /* =====================================================
       10. CURRENT YEAR
       ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       11. BACK TO TOP
       ===================================================== */

    const backToTop = document.querySelector(
        'footer a[href="#home"]'
    );

    if (backToTop) {

        backToTop.addEventListener("click", function (event) {

            const homeSection =
                document.getElementById("home");

            if (homeSection) {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        });

    }


    /* =====================================================
       12. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".contact-item, " +
        ".contact-form"
    );


    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =====================================================
       13. ESC KEY CLOSES MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuBtn) {
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            }

        }

    });


    /* =====================================================
       14. CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "AI Engineer Portfolio JavaScript loaded successfully."
    );

});


