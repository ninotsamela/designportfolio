// ========================================
// AUFMASTER BEWERBUNG - NINO TSAMELASVILI
// Interactive Features
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // CUSTOM CURSOR FOLLOWER
    // ========================================
    
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Smooth following effect
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Enlarge cursor on hover over clickable elements
    const clickableElements = document.querySelectorAll('a, button, [data-lightbox]');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'rgba(0, 102, 255, 0.6)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = '#0066FF';
        });
    });
    
    // ========================================
    // LIGHTBOX FOR IMAGES
    // ========================================
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    
    // Open lightbox
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const img = trigger.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // ========================================
    // SMOOTH SCROLL NAVIGATION
    // ========================================
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // MOBILE NAVIGATION
    // ========================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
    
    // Mobile menu styles
    if (window.innerWidth <= 768) {
        navMenu.style.cssText = `
            position: fixed;
            top: 60px;
            right: -100%;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 40px 24px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            transition: right 0.3s ease;
            z-index: 999;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .nav-menu.active {
                right: 0 !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========================================
    // NAVIGATION SCROLL EFFECT
    // ========================================
    
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        // Hide nav on scroll down (after 300px), show on scroll up
        if (currentScroll > lastScroll && currentScroll > 300) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll(
        '.project-row, .skill-category, .why-item, .contact-card, .video-wrapper'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
    
    // ========================================
    // PARALLAX STARS
    // ========================================
    
    const stars = document.querySelectorAll('.star');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        stars.forEach((star, index) => {
            const speed = 0.3 + (index * 0.1);
            star.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
    
    // ========================================
    // PROJECT HOVER EFFECTS
    // ========================================
    
    const projectRows = document.querySelectorAll('.project-row');
    
    projectRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.zIndex = '10';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.zIndex = '1';
        });
    });
    
    // ========================================
    // EMAIL COPY TO CLIPBOARD
    // ========================================
    
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.textContent.trim();
            
            // Create temporary input
            const tempInput = document.createElement('input');
            tempInput.value = email;
            document.body.appendChild(tempInput);
            tempInput.select();
            
            try {
                document.execCommand('copy');
                
                // Show feedback
                const originalText = link.textContent;
                link.textContent = '✓ Email kopiert!';
                link.style.color = '#10B981';
                
                setTimeout(() => {
                    link.textContent = originalText;
                    link.style.color = '';
                }, 2000);
            } catch (err) {
                console.log('Could not copy email');
            }
            
            document.body.removeChild(tempInput);
        });
    });
    
    // ========================================
    // VIDEO PLACEHOLDER INTERACTION
    // ========================================
    
    const playButton = document.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', () => {
            alert('Video-Platzhalter: Hier wird dein Vorstellungsvideo eingefügt.\n\nAnleitung zum Einfügen:\n1. Video erstellen (max. 90 Sekunden, Hochformat 9:16)\n2. In den /videos/ Ordner speichern\n3. HTML auskommentieren und Pfad anpassen');
        });
    }
    
    // ========================================
    // SKILL PILLS INTERACTION
    // ========================================
    
    const skillPills = document.querySelectorAll('.skill-pill');
    
    skillPills.forEach(pill => {
        pill.addEventListener('mouseenter', () => {
            pill.style.animation = 'pillBounce 0.4s ease';
        });
        
        pill.addEventListener('animationend', () => {
            pill.style.animation = '';
        });
    });
    
    // Add pill bounce animation
    const pillStyle = document.createElement('style');
    pillStyle.textContent = `
        @keyframes pillBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }
    `;
    document.head.appendChild(pillStyle);
    
    // ========================================
    // PAGE LOAD ANIMATION
    // ========================================
    
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // ========================================
    // PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll animations handled above
        }, 10);
    }, { passive: true });
    
    console.log('✨ Portfolio initialized successfully');
    console.log('🎯 Bewerbung für Aufmaster - Werkstudent Marketing Visuals & Brand Design');
    console.log('📧 Email: n.tsXXXXmail.com');
});
