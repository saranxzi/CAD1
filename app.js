// Portfolio Interactions for Atharv Sharma (Tech-Noir Theme)

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Terminal Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            // Toggle terminal icon between menu and close terminal window
            const icon = menuIcon.querySelector('i');
            if (icon.classList.contains('bx-terminal')) {
                icon.className = 'bx bx-window-close';
                icon.style.color = '#f43f5e'; // Highlight close button in crimson
            } else {
                icon.className = 'bx bx-terminal';
                icon.style.color = '';
            }
        });

        // Close menu when clicking on any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuIcon.querySelector('i');
                if (icon) {
                    icon.className = 'bx bx-terminal';
                    icon.style.color = '';
                }
            });
        });
    }

    // 2. Sticky Header & Active Navigation Tracker
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header blurring
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }

        // Active Nav Tracker
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Match section ID to link href
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Command Terminal Typewriter Animation
    const typewriterElement = document.getElementById('typewriter');
    const statusCodes = [
        "SYSTEMS_ENGINEER",
        "FULL_STACK_DEVELOPER",
        "ALGORITHM_DESIGNER",
        "VIT_CHENNAI_SECTOR_24"
    ];
    let codeIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeTerminal() {
        if (!typewriterElement) return;

        const currentCode = statusCodes[codeIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentCode.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // speed up backspace
        } else {
            typewriterElement.textContent = currentCode.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80; // standard console typewriter speed
        }

        // Cycle logic
        if (!isDeleting && charIndex === currentCode.length) {
            typingSpeed = 2500; // hold code status visible for 2.5 seconds
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            codeIndex = (codeIndex + 1) % statusCodes.length; // cycle
            typingSpeed = 400; // short pause before typing next code
        }

        setTimeout(typeTerminal, typingSpeed);
    }

    if (typewriterElement) {
        setTimeout(typeTerminal, 1000);
    }

    // 4. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // 5. Contact Form Transmission Simulator (Console Success Logs)
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.querySelector('span').textContent;

            // Log submission packet action
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
            submitBtn.querySelector('span').textContent = '>> TRANSMITTING_LOGS...';

            setTimeout(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.querySelector('span').textContent = originalBtnText;

                // Reset form input values
                contactForm.reset();

                // Trigger Console Toast succes notification
                if (toast) {
                    toast.classList.add('show');

                    // Close toast notification after 4 seconds
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 4000);
                }

            }, 1800);
        });
    }
});
