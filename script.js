// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Module Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const moduleCards = document.querySelectorAll('.module-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter modules
        moduleCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                const category = card.getAttribute('data-category');
                if (category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telegram: document.getElementById('telegram').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Show success message (you can integrate with your backend here)
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        
        // Reset form
        contactForm.reset();
        
        // Log form data (for development)
        console.log('Form Data:', formData);
    });
}

// Intersection Observer for Animations
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
const animateElements = document.querySelectorAll('.feature-card, .theme-card, .module-card, .pricing-card, .demo-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Pricing Card Hover Effect
const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Slightly scale down other cards
        pricingCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
                otherCard.style.transform = 'scale(0.98)';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        // Reset all cards
        pricingCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
            otherCard.style.transform = 'scale(1)';
        });
    });
});

// Dynamic Platform Items Animation
const platformItems = document.querySelectorAll('.platform-item');

platformItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Code Animation in Bot Section
const codeLines = document.querySelectorAll('.code-line');
let delay = 0;

codeLines.forEach((line, index) => {
    setTimeout(() => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
        line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 50);
    }, delay);
    
    delay += 200;
});

// Stats Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    animateCounter(stat, number, hasPlus);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

function animateCounter(element, target, hasPlus) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, stepTime);
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Theme Card Preview Placeholder
const themePreviews = document.querySelectorAll('.theme-preview');

themePreviews.forEach(preview => {
    // Add some visual elements to theme previews
    const elements = 5;
    
    for (let i = 0; i < elements; i++) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.background = `rgba(67, 107, 157, ${0.1 + (i * 0.1)})`;
        element.style.borderRadius = '8px';
        
        // Random positioning and sizing
        element.style.width = `${40 + (i * 10)}%`;
        element.style.height = `${20 + (i * 5)}px`;
        element.style.top = `${20 + (i * 40)}px`;
        element.style.left = `${10 + (i * 5)}%`;
        element.style.transition = 'all 0.3s ease';
        
        preview.appendChild(element);
    }
    
    // Hover effect
    preview.parentElement.parentElement.addEventListener('mouseenter', function() {
        const previewElements = preview.querySelectorAll('div');
        previewElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transform = 'translateX(5px)';
            }, index * 50);
        });
    });
    
    preview.parentElement.parentElement.addEventListener('mouseleave', function() {
        const previewElements = preview.querySelectorAll('div');
        previewElements.forEach((el) => {
            el.style.transform = 'translateX(0)';
        });
    });
});

// Demo Browser Content Animation
const browserContents = document.querySelectorAll('.browser-content');

browserContents.forEach(content => {
    // Add mock content bars
    const bars = 3;
    
    for (let i = 0; i < bars; i++) {
        const bar = document.createElement('div');
        bar.style.position = 'absolute';
        bar.style.background = 'rgba(255, 255, 255, 0.1)';
        bar.style.borderRadius = '4px';
        bar.style.height = '60px';
        bar.style.width = `${70 + (i * 5)}%`;
        bar.style.top = `${30 + (i * 80)}px`;
        bar.style.left = '20px';
        bar.style.transition = 'all 0.3s ease';
        
        content.appendChild(bar);
    }
});

// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Prevent form spam
let formSubmitted = false;

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        if (formSubmitted) {
            e.preventDefault();
            alert('Lütfen bekleyiniz, formunuz zaten gönderildi.');
            return false;
        }
        formSubmitted = true;
        
        // Reset after 30 seconds
        setTimeout(() => {
            formSubmitted = false;
        }, 30000);
    });
}

// Console Easter Egg
console.log('%c🚀 BePeak Streaming Platform', 'color: #436b9d; font-size: 24px; font-weight: bold;');
console.log('%cTürkiye\'nin en gelişmiş streaming scripti!', 'color: #5a8bc4; font-size: 14px;');
console.log('%c💼 İş birliği için: info@bepeak.net', 'color: #6d9dc5; font-size: 12px;');

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('%c✨ Website loaded successfully!', 'color: #28c840; font-size: 14px; font-weight: bold;');

// HLS Stream Monitor Chart
const streamChart = document.getElementById('streamChart');

if (streamChart) {
    const ctx = streamChart.getContext('2d');
    const width = streamChart.parentElement.offsetWidth;
    const height = 170;
    
    streamChart.width = width;
    streamChart.height = height;
    
    // Generate random data points
    let dataPoints = [];
    const maxPoints = 40;
    
    for (let i = 0; i < maxPoints; i++) {
        dataPoints.push(Math.random() * 60 + 40);
    }
    
    function drawChart() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(67, 107, 157, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < 5; i++) {
            const y = (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw area gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(90, 139, 196, 0.3)');
        gradient.addColorStop(1, 'rgba(90, 139, 196, 0.02)');
        
        // Draw area
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        dataPoints.forEach((point, index) => {
            const x = (width / (maxPoints - 1)) * index;
            const y = height - (point / 100 * height);
            
            if (index === 0) {
                ctx.lineTo(x, y);
            } else {
                const prevX = (width / (maxPoints - 1)) * (index - 1);
                const prevY = height - (dataPoints[index - 1] / 100 * height);
                const cpX = (prevX + x) / 2;
                
                ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
            }
        });
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = '#5a8bc4';
        ctx.lineWidth = 3;
        
        dataPoints.forEach((point, index) => {
            const x = (width / (maxPoints - 1)) * index;
            const y = height - (point / 100 * height);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                const prevX = (width / (maxPoints - 1)) * (index - 1);
                const prevY = height - (dataPoints[index - 1] / 100 * height);
                const cpX = (prevX + x) / 2;
                
                ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        dataPoints.forEach((point, index) => {
            const x = (width / (maxPoints - 1)) * index;
            const y = height - (point / 100 * height);
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#5a8bc4';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(90, 139, 196, 0.3)';
            ctx.lineWidth = 2;
            ctx.stroke();
        });
    }
    
    // Initial draw
    drawChart();
    
    // Animate chart
    setInterval(() => {
        dataPoints.shift();
        dataPoints.push(Math.random() * 60 + 40);
        drawChart();
    }, 2000);
    
    // Redraw on resize
    window.addEventListener('resize', () => {
        const newWidth = streamChart.parentElement.offsetWidth;
        streamChart.width = newWidth;
        drawChart();
    });
}

// HLS Stats Counter Animation
const hlsStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value[data-target]');
            
            statValues.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateHLSCounter(stat, target);
            });
            
            hlsStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const hlsStats = document.querySelector('.hls-stats');
if (hlsStats) {
    hlsStatsObserver.observe(hlsStats);
}

function animateHLSCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// Animate metrics dynamically
function animateMetrics() {
    const activeViewers = document.getElementById('activeViewers');
    const bandwidth = document.getElementById('bandwidth');
    const serverLoad = document.getElementById('serverLoad');
    
    if (!activeViewers) return;
    
    setInterval(() => {
        // Animate active viewers
        const currentViewers = parseFloat(activeViewers.textContent);
        const change = (Math.random() - 0.5) * 0.5;
        const newViewers = Math.max(45, Math.min(52, currentViewers + change));
        activeViewers.textContent = newViewers.toFixed(1) + 'K';
        
        // Animate bandwidth
        const currentBandwidth = parseInt(bandwidth.textContent);
        const bandwidthChange = Math.floor((Math.random() - 0.5) * 4);
        const newBandwidth = Math.max(95, Math.min(100, currentBandwidth + bandwidthChange));
        bandwidth.textContent = newBandwidth + '%';
        
        // Animate server load
        const loads = ['Düşük', 'Normal', 'Düşük'];
        serverLoad.textContent = loads[Math.floor(Math.random() * loads.length)];
        
    }, 3000);
}

animateMetrics();

// Pricing Toggle (Index Page)
const pricingToggleBtns = document.querySelectorAll('.pricing-toggle .toggle-btn');

pricingToggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        pricingToggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const type = this.getAttribute('data-type');
        
        // Add animation effect
        const pricingGrid = document.querySelector('.pricing-grid');
        if (pricingGrid) {
            pricingGrid.style.opacity = '0.5';
            pricingGrid.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                pricingGrid.style.opacity = '1';
                pricingGrid.style.transform = 'scale(1)';
            }, 200);
        }
    });
});

// Open Stream Demo Modal
const openStreamDemoBtn = document.getElementById('openStreamDemo');

if (openStreamDemoBtn) {
    openStreamDemoBtn.addEventListener('click', function() {
        alert('Demo özelliği yakında eklenecek! Şimdilik pricing.html sayfasından paketleri inceleyebilirsiniz.');
        // TODO: Implement demo modal
    });
}

// Add parallax effect to HLS section
const hlsSection = document.querySelector('.hls-stream');

if (hlsSection) {
    window.addEventListener('scroll', () => {
        const rect = hlsSection.getBoundingClientRect();
        const scrollPercent = 1 - (rect.top / window.innerHeight);
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const hlsVisual = hlsSection.querySelector('.hls-visual');
            if (hlsVisual) {
                hlsVisual.style.transform = `translateY(${scrollPercent * -30}px)`;
            }
        }
    });
}

// Enhanced feature cards with tilt
const hlsStatCards = document.querySelectorAll('.hls-stat-card');

hlsStatCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Number formatting with animation
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// Smooth reveal animations for HLS features
const hlsFeatures = document.querySelectorAll('.hls-feature');

const hlsFeaturesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            
            hlsFeaturesObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

hlsFeatures.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-20px)';
    feature.style.transition = 'all 0.5s ease';
    hlsFeaturesObserver.observe(feature);
});

// Live indicator animation
const liveIndicator = document.querySelector('.live-indicator');

if (liveIndicator) {
    setInterval(() => {
        liveIndicator.style.transform = 'scale(1.05)';
        setTimeout(() => {
            liveIndicator.style.transform = 'scale(1)';
        }, 300);
    }, 2000);
}

console.log('%c🎬 HLS Stream Features Loaded!', 'color: #5a8bc4; font-size: 14px; font-weight: bold;');

// Custom Cursor
const cursor = document.getElementById('customCursor');
const cursorDot = document.getElementById('customCursorDot');

if (cursor && cursorDot && window.innerWidth >= 1024) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Instant follow for dot
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Add active class on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorDot.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorDot.classList.remove('active');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.5';
        cursorDot.style.opacity = '1';
    });
}

// Mouse Trail Effect
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (trail.length > trailLength) {
        trail.shift();
    }
});

// Magnetic Buttons
const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px) scale(1.02)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Scroll-triggered text reveal animation
const revealElements = document.querySelectorAll('.section-title, .section-description');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'reveal-text 0.8s ease forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    revealObserver.observe(el);
});

// Add reveal animation
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    @keyframes reveal-text {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(revealStyle);

// Parallax effect for cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .module-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    cards.forEach((card, index) => {
        if (card.matches(':hover')) return;
        
        const speed = (index % 3 + 1) * 2;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Smooth number counter for all stat elements
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add glow effect to logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.filter = 'drop-shadow(0 0 20px rgba(67, 107, 157, 0.8))';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.filter = '';
    });
}

// Add particles effect on hero section
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#5a8bc4';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9998';
    particle.style.opacity = '0.6';
    particle.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`;
        particle.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Create particles on click
let particleInterval;
document.addEventListener('mousedown', (e) => {
    createParticle(e.clientX, e.clientY);
    particleInterval = setInterval(() => {
        createParticle(e.clientX + Math.random() * 20 - 10, e.clientY + Math.random() * 20 - 10);
    }, 50);
});

document.addEventListener('mouseup', () => {
    clearInterval(particleInterval);
});

// Enhanced scroll animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for floating shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('%c✨ Advanced Animations Loaded!', 'color: #10b981; font-size: 14px; font-weight: bold;');
console.log('%c🎨 Glassmorphism, Custom Cursor, Particles Ready!', 'color: #6d9dc5; font-size: 12px;');
