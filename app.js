// Portfolio Interactions for Saran Sharma

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Hamburger Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            // Toggle hamburger icon between menu and close X
            const icon = menuIcon.querySelector('i');
            if (icon.classList.contains('bx-menu')) {
                icon.className = 'bx bx-x';
            } else {
                icon.className = 'bx bx-menu';
            }
        });

        // Close menu when clicking on any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                if (icon) icon.className = 'bx bx-menu';
            });
        });
    }

    // 2. Sticky Header and Nav-active Indicator on Scroll
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header effect
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }

        // Navigation Active Links mapping
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // offset to activate slightly early
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Typewriter Animation for Hero Section
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "Computer Science Student",
        "Full Stack Developer",
        "Problem Solver",
        "VIT Chennai Student"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typewriterElement) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // speed up deleting
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // standard typing speed
        }

        // If word is complete, wait and then delete
        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // wait 2 seconds at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // cycle to next word
            typingSpeed = 500; // pause before typing next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typewriter loop
    if (typewriterElement) {
        setTimeout(type, 1000);
    }

    // 4. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animated, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // trigger when 15% of the element is visible
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // 5. Contact Form Submission handling (Simulated)
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-btn');
            const originalBtnContent = submitBtn.innerHTML;

            // Set sending / loading state on submit button
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';

            // Simulate server network latency
            setTimeout(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalBtnContent;

                // Reset form fields
                contactForm.reset();

                // Trigger Toast success notification
                if (toast) {
                    toast.classList.add('show');

                    // Hide toast after 3.5 seconds
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3500);
                }

            }, 1500);
        });
    }
});
