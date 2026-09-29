/**
 * Tesia Srivastava - Portfolio Web Application Core Logic
 * Handles themes, mobile navigation, active section indicators,
 * project filters, dynamic modal injection, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Theme Toggle (Light / Dark Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage or system configuration
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemThemeDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-moon';
    }

    // Toggle theme on click
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('portfolio-theme', 'light');
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('portfolio-theme', 'dark');
            themeIcon.className = 'fa-solid fa-sun';
        }
    });

    /* ==========================================================================
       2. Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuIcon.className = 'fa-solid fa-bars';
        });
    });

    /* ==========================================================================
       3. Active Section Intersection Observer (Navbar highlight)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    /* Scroll Reveal Observer */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters view
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       4. Projects Data & Detailed Modal Controller
       ========================================================================== */
    const projectsData = {
        'project-1': {
            title: "ProfAlert: Real-Time Professor Campus Locator",
            tags: ["Python", "IoT", "Web App"],
            link: "https://github.com",
            problem: "Students at REVA University often waste time walking between campus offices, classrooms, and labs trying to find professors for guidance or assignment submissions.",
            dataTools: "Python (Flask), HTML5/CSS3/JavaScript, Wi-Fi RSSI Network Signal strength profiling.",
            approach: "1. Built a responsive web dashboard that queries a lightweight database of registered faculty members.\n2. Implemented Wi-Fi RSSI signal strength monitoring to map professor devices to active router zones.\n3. Designed a clean, student-facing UI map indicating the current zone and floor.\n4. Simulated real-time signal telemetry using mock endpoints for live testing.",
            results: "Reduced student search times by 80% during campus test runs, facilitating immediate communication with instructors.",
            lessons: "Gained hands-on experience in network packet headers, signal profiling, asynchronous fetch requests, and building dynamic student utilities."
        },
        'project-2': {
            title: "IoT-Based Smart Noise Level Monitor & Alert System",
            tags: ["C++", "ESP8266", "IoT"],
            link: "https://github.com",
            problem: "Maintaining silence in college libraries, research laboratories, and exam halls is difficult without manual supervisor monitoring and continuous checking.",
            dataTools: "C++ (Arduino IDE), ESP8266 Wi-Fi Module, Analog Sound Decibel Sensor, Adafruit IO API.",
            approach: "1. Wrote an embedded C++ program for the ESP8266 to poll sound levels from the microphone sensor.\n2. Calculated average decibel values and calibrated thresholds for quiet study zones (e.g., 55 dB).\n3. Connected to local campus Wi-Fi and sent readings to the cloud dashboard.\n4. Integrated webhook requests triggering instant email alerts when levels are violated.",
            results: "Successfully monitored and logged sound decibels with 95% accuracy. Alerts were delivered to supervisors within 3 seconds of high noise thresholds.",
            lessons: "Learned memory management in C++, micro-controller setup, Wi-Fi connections, and parsing API payloads."
        },
        'project-3': {
            title: "Smart Facial Recognition Attendance Logger",
            tags: ["Python", "ML", "OpenCV"],
            link: "https://github.com",
            problem: "Manual attendance taking in university classes takes up to 10 minutes per lecture, reducing valuable learning time and allowing manual errors.",
            dataTools: "Python (OpenCV, Face-Recognition library, Pandas, SQLite).",
            approach: "1. Captured face samples of students, structuring an organized image database.\n2. Processed image frames using OpenCV to locate bounding coordinates of faces.\n3. Extracted facial landmarks using pretrained deep learning models, mapping them to registered database profiles.\n4. Wrote logic to insert time-stamped attendance records into local SQLite tables automatically.",
            results: "Achieved a facial recognition accuracy of 92% under standard classroom lighting. Logged attendance in under 5 seconds for a class of 30 students.",
            lessons: "Learned advanced image transformations, thresholding, working with pretrained models, and database queries in Python."
        },
        'project-4': {
            title: "Talent Acquisition Email Outreach Optimizer",
            tags: ["Excel", "VBA", "Communication"],
            link: "https://github.com",
            problem: "Student coordinators and club leads spend hours manually drafting and personalizing sponsorship or HR outreach emails.",
            dataTools: "Microsoft Excel, Visual Basic for Applications (VBA), Microsoft Outlook.",
            approach: "1. Designed a clean contact grid compiling name, company details, email addresses, and personalized notes.\n2. Developed a VBA script to automate Outlook objects directly from Excel cells.\n3. Drafted a modular template containing custom tags for dynamic replacement.\n4. Built email logging states preventing duplicate outreach.",
            results: "Reduced team email drafting time by 60%, automating 100+ personalized emails per campaign run.",
            lessons: "Learned automated workflows in Office systems, variables management, and professional writing styles."
        }
    };

    /* ==========================================================================
       5. Learning Blog Articles Data & Modal Controller
       ========================================================================== */
    const blogData = {
        'blog-1': {
            title: "Getting Started with Data Cleaning in Excel",
            meta: "June 15, 2026 • 3 min read",
            content: `
                <p class="modal-intro">As data science students, we often rush to build machine learning models first. However, in the industry, over 70% of a data analyst's day is spent cleaning raw spreadsheets. Here are my favorite tools to handle datasets in Microsoft Excel:</p>
                
                <div class="modal-body-section">
                    <h4>1. The Power of TRIM & CLEAN</h4>
                    <p>Importing tables from external systems or web pages frequently inserts invisible trailing tabs and leading spaces. Use the <code>=TRIM(text)</code> formula to purge irregular spaces and <code>=CLEAN(text)</code> to clear unprintable characters before attempting lookups.</p>
                </div>
                
                <div class="modal-body-section">
                    <h4>2. Text to Columns Integration</h4>
                    <p>When files are combined into one cell, use the <strong>Text to Columns</strong> wizard under the Data tab. Select delimiter markers (commas, semi-colons, or tabs) to split fields into appropriate sheets instantly.</p>
                </div>
                
                <div class="modal-body-section">
                    <h4>3. Conditional Formatting for Anomalies</h4>
                    <p>Instead of manually looking for incorrect numbers, set up conditional formatting rules. Apply custom shades to highlight cells containing error states (#N/A, #VALUE!) or values that fall outside typical standard deviations.</p>
                </div>
            `
        },
        'blog-2': {
            title: "Why B.Tech AI Students Must Focus on Communication",
            meta: "May 28, 2026 • 5 min read",
            content: `
                <p class="modal-intro">Many engineering students believe that as long as they can code in Python and query databases, they are prepared for the corporate world. However, coding represents only half the challenge. Let's look at why business communication is vital:</p>
                
                <div class="modal-body-section">
                    <h4>1. Translating Complexity</h4>
                    <p>Your future corporate managers, clients, or HR professionals might not understand what a Neural Network or an R-squared score is. As an AI professional, you must translate mathematical coefficients into direct business values: <em>"Our model helps reduce client churn by 12%."</em></p>
                </div>
                
                <div class="modal-body-section">
                    <h4>2. Outreach and Email Etiquette</h4>
                    <p>Getting your first internship requires writing cold emails and LinkedIn messages that get responses. A short, error-free, and well-structured email outlining how your skill set solves their exact business problem will outperform standard template submissions every single time.</p>
                </div>

                <div class="modal-body-section">
                    <h4>3. Writing Clean Documentation</h4>
                    <p>Clean code requires clear READMEs and docstrings. If your team cannot understand how to run your script or what parameters your function takes, the code is effectively useless to the business. Writing is thinking.</p>
                </div>
            `
        }
    };

    /* Modal DOM Elements */
    const detailsModal = document.getElementById('details-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    function openModal(htmlContent) {
        modalBody.innerHTML = htmlContent;
        detailsModal.classList.add('active');
        detailsModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent page scrolling
    }

    function closeModal() {
        detailsModal.classList.remove('active');
        detailsModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore page scrolling
        modalBody.innerHTML = '';
    }

    // Modal close event triggers
    modalClose.addEventListener('click', closeModal);
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) closeModal();
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailsModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Delegate Click handlers for dynamically loaded components
    document.addEventListener('click', (e) => {
        // Project card click
        const projectBtn = e.target.closest('.open-project');
        if (projectBtn) {
            const projectId = projectBtn.getAttribute('data-id');
            const data = projectsData[projectId];
            if (data) {
                const tagsHTML = data.tags.map(t => `<span class="project-card-tag">${t}</span>`).join('');
                const contentHTML = `
                    <div class="modal-project-header">
                        <div class="modal-project-tags">${tagsHTML}</div>
                        <h2 id="modal-title">${data.title}</h2>
                        <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="modal-project-link">
                            <i class="fa-brands fa-github"></i> View Repository <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                    
                    <div class="modal-body-section">
                        <h4>Problem Statement</h4>
                        <p>${data.problem}</p>
                    </div>
                    
                    <div class="modal-body-section">
                        <h4>Data & Tools Used</h4>
                        <p>${data.dataTools}</p>
                    </div>
                    
                    <div class="modal-body-section">
                        <h4>Approach / Methodology</h4>
                        <p style="white-space: pre-line;">${data.approach}</p>
                    </div>
                    
                    <div class="modal-body-section">
                        <h4>Key Results / Deliverables</h4>
                        <p>${data.results}</p>
                    </div>
                    
                    <div class="modal-body-section">
                        <h4>What I Learned</h4>
                        <p>${data.lessons}</p>
                    </div>
                `;
                openModal(contentHTML);
            }
        }

        // Blog article click
        const blogBtn = e.target.closest('.open-blog');
        if (blogBtn) {
            const blogId = blogBtn.getAttribute('data-id');
            const data = blogData[blogId];
            if (data) {
                const contentHTML = `
                    <div class="modal-project-header">
                        <span class="timeline-card-date">${data.meta}</span>
                        <h2 id="modal-title">${data.title}</h2>
                    </div>
                    <div class="modal-blog-body">
                        ${data.content}
                    </div>
                `;
                openModal(contentHTML);
            }
        }
    });

    /* ==========================================================================
       6. Project Grid Filter Logic
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                // Handle matching rules (contains tag value)
                if (filterValue === 'all' || category.toLowerCase().includes(filterValue.toLowerCase())) {
                    card.style.display = 'flex';
                    // Trigger fade in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Hide after animation finishes
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       7. Contact Form Handler & Client-side Validation
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop normal form submit

            const nameInput = document.getElementById('form-name').value.trim();
            const emailInput = document.getElementById('form-email').value.trim();
            const messageInput = document.getElementById('form-message').value.trim();

            // Reset status
            formStatus.className = 'form-status';
            formStatus.style.display = 'none';

            // Simple validation check
            if (!nameInput || !emailInput || !messageInput) {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.classList.add('error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('error');
                return;
            }

            // Simulate form submission success since this is a static site
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Show success feedback message
                formStatus.textContent = `Thank you, ${nameInput}! Your message has been sent successfully.`;
                formStatus.classList.add('success');

                // Clear input values
                contactForm.reset();

                // Fade out success banner after 6 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                        formStatus.style.opacity = '1';
                    }, 500);
                }, 6000);

            }, 1200);
        });
    }
});
