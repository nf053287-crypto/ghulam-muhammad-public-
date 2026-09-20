/* ==========================================================================
   INTERACTIVE ENGINE
   Ghulam Muhammad Public School
   ========================================================================== */

// EmailJS Initialize
// Guarded: the EmailJS SDK is only loaded on pages that use the contact form
// (contact.html / admissions.html). Without this check, calling emailjs.init()
// on other pages throws a ReferenceError that halts the entire script — which
// stops the scroll-reveal observer and leaves reveal-sections invisible.
if (typeof emailjs !== "undefined") {
    emailjs.init("B4pCq9mrMKuhfEASC");
}

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================================
       1. SMART NAVIGATION & BACK-TO-TOP BUTTON VISIBILITY
       ====================================================================== */
    const navbar = document.getElementById("mainNavbar");
    const backToTop = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        // Sticky contraction transition triggered dynamically
        if (window.scrollY > 100) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }

        // Floating Back-to-Top trigger logic
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ======================================================================
       2. SCROLL REVEAL TIMED TRIGGERS (IntersectionObserver Optimization)
       ====================================================================== */
    const sectionsToReveal = document.querySelectorAll(".reveal-section");

    const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active-reveal");
                observer.unobserve(entry.target); // Triggers once for optimal rendering
            }
        });
    }, {
        threshold: 0.12, // Activates when 12% of the element is in view
        rootMargin: "0px 0px -20px 0px"
    });

    sectionsToReveal.forEach(section => {
        revealOnScrollObserver.observe(section);
    });

    /* ======================================================================
       3. VELOCITY COUNT ANIMATION SYSTEM
       ====================================================================== */
    const statNumbers = document.querySelectorAll(".stat-number");

    const startCounter = (element) => {
        // Read the goal from data-target, falling back to the digits already in
        // the markup. Without this fallback a missing/!numeric attribute made
        // parseInt() return NaN, which was then painted over the real figure —
        // the stat cards rendered a literal "NaN".
        const raw = element.getAttribute("data-target") || element.textContent;
        const target = parseInt(String(raw).replace(/[^0-9]/g, ""), 10);

        // Nothing sensible to count to: leave the static markup untouched.
        if (!Number.isFinite(target) || target <= 0) return;

        // "+" and similar are kept out of the maths and re-appended each tick.
        const suffix = element.getAttribute("data-suffix") ?? "";

        let count = 0;
        const speed = Math.max(1, Math.ceil(target / 40)); // ticks duration proportionally

        const updateCount = () => {
            count += speed;
            if (count >= target) {
                element.textContent = target + suffix;
            } else {
                element.textContent = count + suffix;
                requestAnimationFrame(updateCount);
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => {
        counterObserver.observe(num);
    });

    /* ======================================================================
       4. ADMISSIONS ACCORDION (Enhanced Icon & Panel Transitions)
       ====================================================================== */
    const accordionHeaders = document.querySelectorAll(".adm-accordion-header");

    accordionHeaders.forEach((header) => {
        header.addEventListener("click", () => {
            const parentItem = header.parentElement;
            const accordionBody = header.nextElementSibling;
            
            // Checks status to safely toggle displays
            if (accordionBody.style.display === "block") {
                accordionBody.style.display = "none";
                parentItem.classList.remove("active-item");
            } else {
                accordionBody.style.display = "block";
                parentItem.classList.add("active-item");
            }
        });
    });

    /* ======================================================================
       5. STANDARD INTERFACES / DECOUPLED FORMS
       ====================================================================== */
    const contactForm = document.getElementById("contactForm");


    const idxAboutBtn = document.getElementById("idxAboutBtn");
    

    const downloadSyllabusBtn = document.getElementById("downloadSyllabusBtn");
    if (downloadSyllabusBtn) {
        downloadSyllabusBtn.addEventListener("click", () => {
            alert("Syllabus download will be available soon.");
        });
    }

    const stemLearnBtn = document.getElementById("stemLearnBtn");
    if (stemLearnBtn) {
        stemLearnBtn.addEventListener("click", () => {
            alert("More STEM Education information will be available soon.");
        });
    }

    const scienceExploreBtn = document.getElementById("scienceExploreBtn");
    if (scienceExploreBtn) {
        scienceExploreBtn.addEventListener("click", () => {
            alert("Science program details will be available soon.");
        });
    }
});




    /* ======================================================================
       ----------------------------------MAIN STYLING---------------------
       ====================================================================== */

// AUTOMATIC & MANUAL NOTICE BOARD SLIDER LOGIC
const notices = document.querySelectorAll('.idx-notice-ticker p');
const prevBtn = document.getElementById('prevNoticeBtn');
const nextBtn = document.getElementById('nextNoticeBtn');
let currentNoticeIndex = 0;
let noticeInterval;

function showNotice(index) {
    // Purani active notice se class hatao
    notices[currentNoticeIndex].classList.remove('active-notice');
    
    // Index boundaries check karo
    if (index >= notices.length) {
        currentNoticeIndex = 0;
    } else if (index < 0) {
        currentNoticeIndex = notices.length - 1;
    } else {
        currentNoticeIndex = index;
    }
    
    // Nayi notice par class lagao
    notices[currentNoticeIndex].classList.add('active-notice');
}

function startNoticeTimer() {
    noticeInterval = setInterval(() => {
        showNotice(currentNoticeIndex + 1);
    }, 5000); // Har 5 seconds baad change hogi
}

// Button click events
if (nextBtn && prevBtn && notices.length > 0) {
    nextBtn.addEventListener('click', () => {
        clearInterval(noticeInterval); // User click par timer reset
        showNotice(currentNoticeIndex + 1);
        startNoticeTimer();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(noticeInterval);
        showNotice(currentNoticeIndex - 1);
        startNoticeTimer();
    });

    // Pehli dafa chalane k liye trigger
    startNoticeTimer();
}

// DONATION MODAL POP-UP LOGIC
const donateModal = document.getElementById('donationModal');
const headerDonateBtn = document.getElementById('headerDonateBtn'); // Navbar button
const idxAboutBtn = document.getElementById('idxAboutBtn'); // About section button (if you want)
const closeDonateModal = document.getElementById('closeDonateModal');

// Function to open modal
function openModal() {
    if (donateModal) {
        donateModal.style.display = 'flex';
    }
}

// Function to close modal
function closeModal() {
    if (donateModal) {
        donateModal.style.display = 'none';
    }
}

// Click Listeners
if (headerDonateBtn) {
    headerDonateBtn.addEventListener('click', openModal);
}

// Agar About Us ke sath wale ya kisi aur button par bhi chalana ho
const secondaryDonateBtn = document.getElementById('stemLearnBtn'); // Temporary or duplicate test
if (secondaryDonateBtn) {
    secondaryDonateBtn.addEventListener('click', openModal);
}

if (closeDonateModal) {
    closeDonateModal.addEventListener('click', closeModal);
}

// Agar user pop-up se bahar kaali screen par click kare to bhi band ho jaye
window.addEventListener('click', (e) => {
    if (e.target === donateModal) {
        closeModal();
    }
});


// DYNAMIC TABS SWITCHING FUNCTION
function switchDonateTab(evt, tabId) {
    // Tamam contents ko hide karo
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Tamam tab buttons se active class hatao
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Current targeted tab aur button active karo
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// INTERACTIVE TEXT COPIER FUNCTION
function copyText(textToCopy, buttonElement) {
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Button text dynamic tabdeel ho kar feedback dega
        const originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fas fa-check"></i> Copied!';
        buttonElement.style.backgroundColor = '#28a745';
        buttonElement.style.color = '#fff';

        // 2 seconds baad button wapas pehle jaisa ho jaye ga
        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.style.backgroundColor = '';
            buttonElement.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}


// PHOTO POPUP INTERACTIVE LOGIC
const jobModal = document.getElementById('jobPosterModal');
const viewJobsBtn = document.getElementById('viewJobsBtn');
const closeJobModal = document.getElementById('closeJobModal');

if (viewJobsBtn && jobModal && closeJobModal) {
    viewJobsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        jobModal.style.display = 'flex';
    });

    closeJobModal.addEventListener('click', function() {
        jobModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === jobModal) {
            jobModal.style.display = 'none';
        }
    });
}
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// Contact Form EmailJS

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_6orvdcl",
            "template_3xd5jxu",
            this
        )
        .then(() => {

            alert("Your message has been sent successfully!");
            contactForm.reset();

        })
        .catch((error) => {

            console.log(error);
            alert("Message send nahi hua. Please try again.");

        });

    });

}
// Admission Form

const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {

    admissionForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_6orvdcl",
             "template_0bq7p9p",
            this
        )
        .then(function () {

            alert("Admission Form Submitted Successfully!");
            admissionForm.reset();

        })
        .catch(function (error) {

            console.error("EmailJS Error:", error);
            alert("Failed to submit Admission Form.");

        });

    });

}
/* =========================================
   APPLE GALLERY - PART 4
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const columns = document.querySelectorAll(".gallery-column");

    columns.forEach(column => {

        // Duplicate images
        column.innerHTML += column.innerHTML;

    });

});
/* =========================================
   GMPS DONATION FORM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const oneTimeBtn = document.getElementById("oneTimeBtn");
    const uraanBtn = document.getElementById("uraanBtn");

    const oneTimeOptions = document.getElementById("oneTimeOptions");
    const uraanOptions = document.getElementById("gmpsUraanOptions");

    const amountButtons = document.querySelectorAll(".gmps-amount-btn");
    const customAmount = document.getElementById("customAmount");

    const monthlyPlan = document.getElementById("monthlyPlan");
    const annualPlan = document.getElementById("annualPlan");

    const monthlyNote = document.getElementById("monthlyNote");
    const annualNote = document.getElementById("annualNote");


    /* ==============================
       DONATION TYPE
    ============================== */

  /* ==============================
   DONATION TYPE
============================== */

const donationSection = document.getElementById("donation-form");

if (donationSection) {

    const oneTimeBtn = donationSection.querySelector("#oneTimeBtn");
    const uraanBtn = donationSection.querySelector("#uraanBtn");

    const oneTimeOptions = donationSection.querySelector("#oneTimeOptions");
    const uraanOptions = donationSection.querySelector("#gmpsUraanOptions");


    if (
        oneTimeBtn &&
        uraanBtn &&
        oneTimeOptions &&
        uraanOptions
    ) {

        oneTimeBtn.addEventListener("click", function (e) {

            e.preventDefault();

            oneTimeBtn.classList.add("active");
            uraanBtn.classList.remove("active");

            oneTimeOptions.style.display = "block";
            uraanOptions.style.display = "none";

        });


        uraanBtn.addEventListener("click", function (e) {

            e.preventDefault();

            uraanBtn.classList.add("active");
            oneTimeBtn.classList.remove("active");

            oneTimeOptions.style.display = "none";
            uraanOptions.style.display = "block";

        });

    }

}

    /* ==============================
       DONATION AMOUNT
    ============================== */

    amountButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Remove active from all buttons
            amountButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Select clicked button
            button.classList.add("active");

            // Put selected amount in input
            if (customAmount) {
                customAmount.value = button.dataset.amount;
            }

        });

    });


    /* ==============================
       CUSTOM AMOUNT
    ============================== */

    if (customAmount) {

        customAmount.addEventListener("input", () => {

            // Remove button selection
            amountButtons.forEach(button => {
                button.classList.remove("active");
            });

        });

    }


    /* ==============================
       SPONSORSHIP PLAN
    ============================== */

    if (monthlyPlan && annualPlan) {

        monthlyPlan.addEventListener("click", () => {

            monthlyPlan.classList.add("active");
            annualPlan.classList.remove("active");

            if (monthlyNote) monthlyNote.style.display = "block";
            if (annualNote) annualNote.style.display = "none";

        });


        annualPlan.addEventListener("click", () => {

            annualPlan.classList.add("active");
            monthlyPlan.classList.remove("active");

            if (monthlyNote) monthlyNote.style.display = "none";
            if (annualNote) annualNote.style.display = "block";

        });

    }

});