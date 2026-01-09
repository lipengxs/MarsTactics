function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.icon');
    
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.innerHTML = '▼';
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.innerHTML = '▲';
    }
}

// 语言重定向逻辑
function redirectToLanguage() {
    // 获取浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    const lang = browserLang.split('-')[0];
    
    // 如果已经在语言特定页面上，不进行重定向
    if (window.location.pathname.match(/\/(ar|fr|ko|ja|de|zh)$/)) {
        return;
    }
    
    // 支持的语言映射
    const supportedLangs = {
        'ja': '/ja'
    };
    
    // 如果浏览器语言在支持列表中且不是英语，进行重定向
    if (supportedLangs[lang] && lang !== 'en') {
        window.location.href = supportedLangs[lang];
    }
}

// 页面加载时执行重定向
//window.addEventListener('load', redirectToLanguage);

// 添加以下函数来设置语言选择器的默认值
function setLanguageSelector() {
    const path = window.location.pathname;
    const languageSelect = document.querySelector('.language-selector select');
    
    if (!languageSelect) return;

    // 根据路径设置选择器的值
    switch (path) {
        case '/ja':
            languageSelect.value = '/ja';
            break;
        default:
            languageSelect.value = '/';
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    setLanguageSelector();
});

// Countdown Timer for Mars Tactics - May 1, 2026
function initCountdown() {
    const countDownDate = new Date("May 1, 2026 00:00:00").getTime();
    
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");
        
        if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerHTML = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdown);
            const countdownContainer = document.querySelector(".countdown");
            if (countdownContainer) {
                countdownContainer.innerHTML = "<div style='font-size: 2rem; color: var(--accent-color); font-weight: bold;'>MARS TACTICS LAUNCHED!</div>";
            }
        }
    }, 1000);
}

// Initialize countdown when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
});

// Mobile Menu Toggle with ARIA support
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    function openMenu() {
        if (mobileMenu && mobileMenuBtn) {
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            if (closeMenu) closeMenu.focus();
        }
    }
    
    function closeMenuFunc() {
        if (mobileMenu && mobileMenuBtn) {
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
            mobileMenuBtn.focus();
        }
    }
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', openMenu);
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', closeMenuFunc);
    }
    
    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', closeMenuFunc);
        });
    }
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenuFunc();
        }
    });
}

// FAQ Accordion with ARIA support
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answerId = question.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
                const q = faqItem.querySelector('.faq-question');
                const aId = q.getAttribute('aria-controls');
                const a = document.getElementById(aId);
                if (q && a) {
                    q.setAttribute('aria-expanded', 'false');
                    a.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                if (question && answer) {
                    question.setAttribute('aria-expanded', 'true');
                    answer.setAttribute('aria-hidden', 'false');
                }
            }
        });
    });
}

// Lightbox functionality with ARIA support
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    
    function openLightbox(imgSrc, imgAlt) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = imgSrc;
            lightboxImg.alt = imgAlt || '';
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            // Focus management for accessibility
            lightboxClose.focus();
        }
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (screenshotItems.length > 0 && lightbox && lightboxImg) {
        screenshotItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.getAttribute('data-src');
                const img = item.querySelector('img');
                if (imgSrc && img) {
                    openLightbox(imgSrc, img.alt);
                }
            });
        });
    }
    
    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Scroll effect for header
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 26, 46, 0.98)';
            } else {
                header.style.background = 'rgba(10, 26, 46, 0.95)';
            }
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation on scroll
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .faq-item, .screenshot-item, .news-item, .media-item, .video-item, .wallpaper-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFAQ();
    initLightbox();
    initHeaderScroll();
    initSmoothScroll();
    initScrollAnimation();
});