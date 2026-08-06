// ==================== تهيئة المكتبات والتأكد من تحميل الصفحة ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== تهيئة AOS ====================
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-in-out',
        disable: window.innerWidth < 768 ? true : false
    });
    
    // ==================== تهيئة Particles.js للقسم الرئيسي ====================
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // ==================== Mobile Menu Toggle ====================
    const menuToggle = document.querySelector('.menu-toggle');
    const navWrapper = document.querySelector('.nav-links-wrapper');
    const closeMenu = document.querySelector('.close-menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        navWrapper.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navWrapper.classList.contains('active') ? 'hidden' : 'auto';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }
    overlay.addEventListener('click', toggleMenu);
    
    // ==================== Smooth Scroll for Navigation Links ====================
    document.querySelectorAll('.nav-links a, .footer-links a, .logo, .hero-actions .btn-link, .hero-actions .btn-primary, .more-services .btn-primary, .text-center .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    if (navWrapper.classList.contains('active')) {
                        toggleMenu();
                    }
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            }
        });
    });
    
    // ==================== Activate nav link on scroll ====================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const headerHeight = document.querySelector('.main-header')?.offsetHeight || 80;
    
    function activateNavOnScroll() {
        let current = '';
        const scrollPosition = window.pageYOffset + headerHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', activateNavOnScroll);
    activateNavOnScroll();
    
    // ==================== Dark Mode Toggle ====================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !savedTheme) {
        htmlElement.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark-mode');
            if (htmlElement.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerHTML = '<i class="bi bi-moon-stars"></i>';
            }
        });
    }
    
    // ==================== GSAP Animations for Portfolio Items (Desktop Only) ====================
    if (typeof gsap !== 'undefined' && window.innerWidth > 992) {
        document.querySelectorAll('.portfolio-item-masonry').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (x - centerX) / -20;
                gsap.to(item, {
                    duration: 0.5,
                    rotationX: rotateX,
                    rotationY: rotateY,
                    ease: "power1.out",
                    transformOrigin: "center center",
                    overwrite: true
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    duration: 0.8,
                    rotationX: 0,
                    rotationY: 0,
                    ease: "elastic.out(1, 0.3)",
                    overwrite: true
                });
            });
        });
    }
    
    // ==================== Touch Events for Mobile - ظهور فوري مع استمرار التمرير ====================
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item-masonry');
    
    let activeTimeout = null;
    
    // دالة لإظهار التأثير فوراً
    function activateElement(element, isService = true) {
        if (!element) return;
        
        // إزالة التأثير من جميع العناصر
        if (isService) {
            serviceCards.forEach(c => {
                c.classList.remove('active-touch');
                const overlay = c.querySelector('.item-overlay-masonry');
                if (overlay) overlay.style.opacity = '';
            });
        } else {
            portfolioItems.forEach(i => {
                i.classList.remove('active-touch');
                const overlay = i.querySelector('.item-overlay-masonry');
                if (overlay) overlay.style.opacity = '';
            });
        }
        
        // إضافة التأثير للعنصر الحالي
        element.classList.add('active-touch');
        const overlayDiv = element.querySelector('.item-overlay-masonry');
        if (overlayDiv) {
            overlayDiv.style.opacity = '1';
        }
        
        // إزالة التأثير بعد 1.5 ثانية
        if (activeTimeout) clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => {
            element.classList.remove('active-touch');
            if (overlayDiv) overlayDiv.style.opacity = '';
            activeTimeout = null;
        }, 1500);
    }
    
    // Service Cards - ظهور فوري مع إمكانية التمرير
    serviceCards.forEach(card => {
        let touchStartTime = 0;
        let isLongPress = false;
        let longPressTimeout = null;
        
        card.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            isLongPress = false;
            
            // إظهار التأثير فوراً عند اللمس
            activateElement(card, true);
            
            // تسجيل اللمسة الطويلة (اختياري)
            longPressTimeout = setTimeout(() => {
                isLongPress = true;
            }, 500);
        });
        
        card.addEventListener('touchmove', (e) => {
            // لا تفعل شيء - التمرير يعمل بشكل طبيعي
            // التأثير يبقى ظاهراً حتى أثناء التمرير
        });
        
        card.addEventListener('touchend', (e) => {
            clearTimeout(longPressTimeout);
            
            // إذا كانت لمسة قصيرة جداً (أقل من 100ms) قد تكون تمرير سريع
            const touchDuration = Date.now() - touchStartTime;
            
            // التأثير سيختفي تلقائياً بعد 1.5 ثانية من التفعيل
            // لا نحتاج لإزالته هنا
        });
        
        // منع التنفيذ المزدوج للنقر مع الحفاظ على التمرير
        card.addEventListener('click', (e) => {
            // لا نمنع أي شيء - النقر يعمل بشكل طبيعي
        });
    });
    
    // Portfolio Items - ظهور فوري مع إمكانية التمرير
    portfolioItems.forEach(item => {
        let touchStartTime = 0;
        let longPressTimeout = null;
        
        item.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            
            // إظهار التأثير فوراً عند اللمس
            activateElement(item, false);
            
            longPressTimeout = setTimeout(() => {}, 500);
        });
        
        item.addEventListener('touchmove', (e) => {
            // لا تفعل شيء - التمرير يعمل بشكل طبيعي
        });
        
        item.addEventListener('touchend', (e) => {
            clearTimeout(longPressTimeout);
        });
        
        item.addEventListener('click', (e) => {
            // لا نمنع أي شيء
        });
    });
    
    // إضافة دعم للتمرير المستمر مع بقاء التأثير
    // نمنع إزالة التأثير أثناء التمرير
    let isScrolling = false;
    let scrollTimeout = null;
    
    window.addEventListener('scroll', () => {
        isScrolling = true;
        
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    });
    
    // ==================== Animate Numbers in Stats Section ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const target = stat.getAttribute('data-count') || stat.innerText;
            const targetNumber = parseInt(target);
            if (!isNaN(targetNumber) && !stat.hasAttribute('data-animated')) {
                stat.setAttribute('data-animated', 'true');
                let current = 0;
                const increment = targetNumber / 50;
                const updateNumber = () => {
                    current += increment;
                    if (current < targetNumber) {
                        if (target.includes('+')) {
                            stat.innerText = Math.floor(current) + '+';
                        } else if (target.includes('/')) {
                            stat.innerText = Math.floor(current);
                        } else {
                            stat.innerText = Math.floor(current);
                        }
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateNumber();
            }
        });
    }
    
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(aboutSection);
    }
    
    // ==================== Lazy Loading Images Enhancement ====================
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    } else {
        const lazyLoadScript = document.createElement('script');
        lazyLoadScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyLoadScript);
    }
    
    // ==================== Prevent Scroll During Menu Open ====================
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && navWrapper.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // ==================== Add Animation on Scroll for Service Cards ====================
    const serviceCardsForScroll = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceCardsForScroll.forEach(card => {
        serviceObserver.observe(card);
    });
    
    // ==================== Fix for Hero Section Height on Mobile ====================
    function fixHeroHeight() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.innerWidth < 768) {
            const windowHeight = window.innerHeight;
            heroSection.style.minHeight = `${windowHeight}px`;
        }
    }
    
    fixHeroHeight();
    window.addEventListener('resize', fixHeroHeight);
    
    // ==================== Particles for News Section ====================
    function initLargeParticles() {
        if (typeof particlesJS !== 'undefined' && document.getElementById('large-particles-js')) {
            particlesJS('large-particles-js', {
                "particles": {
                    "number": {
                        "value": 15,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#008cff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": false,
                        "anim": {
                            "enable": false
                        }
                    },
                    "size": {
                        "value": 80,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 5,
                            "size_min": 40,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false
                        },
                        "onclick": {
                            "enable": false
                        },
                        "resize": true
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    // ==================== Grand Mission Interactive Lines ====================
    function initGrandMissionLines() {
        const container = document.getElementById('grand-mission-effect');
        if (container) {
            container.innerHTML = '';
            const numberOfLines = 12;
            for (let i = 0; i < numberOfLines; i++) {
                const line = document.createElement('div');
                line.classList.add('grand-mission-line');
                line.style.left = `${Math.random() * 100}%`;
                const speed = 5 + Math.random() * 5;
                line.style.animationDuration = `${speed}s`;
                const delay = Math.random() * 5;
                line.style.animationDelay = `-${delay}s`;
                container.appendChild(line);
            }
        }
    }
    
    // ==================== Mission Interactive Lines (Alternative) ====================
    function initMissionLines() {
        const container = document.getElementById('mission-interactive-lines');
        if (container) {
            container.innerHTML = '';
            const numberOfLines = 12;
            for (let i = 0; i < numberOfLines; i++) {
                const line = document.createElement('div');
                line.classList.add('mission-interactive-line');
                line.style.left = `${Math.random() * 100}%`;
                const speed = 5 + Math.random() * 5;
                line.style.animationDuration = `${speed}s`;
                const delay = Math.random() * 5;
                line.style.animationDelay = `-${delay}s`;
                container.appendChild(line);
            }
        }
    }
    
    // ==================== تشغيل الدوال الإضافية ====================
    initLargeParticles();
    initGrandMissionLines();
    initMissionLines();
    
    // ==================== Add Ripple Effect to Buttons ====================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            ripple.style.pointerEvents = 'none';
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.style.transform = 'scale(2)';
                ripple.style.opacity = '0';
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });
    
    // ==================== تحسين الأداء: تقليل حركة الجسيمات في الجوال ====================
    if (window.innerWidth < 768) {
        const particleCanvas = document.querySelector('#particles-js canvas');
        if (particleCanvas) {
            particleCanvas.style.opacity = '0.5';
        }
    }
    
    // ==================== تأكد من بدء الصفحة من الأعلى ====================
    if (window.location.hash === '' || window.location.hash === '#') {
        window.scrollTo(0, 0);
    }
    
    // ==================== تحسين سرعة التحميل ====================
    setTimeout(() => {
        if (typeof particlesJS !== 'undefined') {
            if (document.getElementById('particles-js') && !document.getElementById('particles-js').hasChildNodes()) {
                location.reload();
            }
        }
    }, 100);
});

// ==================== Preloader ====================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.querySelectorAll('.animate__animated').forEach(el => {
            el.classList.remove('animate__animated');
        });
    }, 1500);
});

// ==================== إضافة دعم للـ WebP ====================
function checkWebPSupport() {
    const webp = new Image();
    webp.onload = webp.onerror = function() {
        const isSupported = (webp.height === 2);
        if (isSupported) {
            document.body.classList.add('webp-supported');
        }
    };
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
checkWebPSupport();

// ==================== تحديث الروابط النشطة عند تغيير الحجم ====================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (typeof activateNavOnScroll !== 'undefined') {
            activateNavOnScroll();
        }
    }, 250);
});