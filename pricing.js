// Pricing Page JavaScript

// Ad Toggle Functionality
const adToggle = document.getElementById('adToggle');
const pricingCards = document.querySelectorAll('[data-ad-price]');
const toggleLabels = document.querySelectorAll('.toggle-label');

if (adToggle) {
    adToggle.addEventListener('change', function() {
        const isNoAd = this.checked;
        
        // Update toggle labels
        toggleLabels.forEach(label => {
            if (label.textContent.includes('Reklamlı') && !isNoAd) {
                label.classList.add('active');
            } else if (label.textContent.includes('Reklamsız') && isNoAd) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
        
        // Update prices
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.price-amount[data-price]');
            const subtitleElement = card.querySelector('.plan-subtitle.ad-option');
            const adFeature = card.querySelector('.ad-feature');
            
            if (priceElement) {
                const adPrice = parseInt(card.getAttribute('data-ad-price'));
                const noAdPrice = parseInt(card.getAttribute('data-no-ad-price'));
                
                if (isNoAd) {
                    // Reklamsız selected
                    animatePrice(priceElement, noAdPrice);
                    if (subtitleElement) {
                        subtitleElement.textContent = 'Reklamsız embed seçeneği';
                    }
                    if (adFeature) {
                        adFeature.textContent = 'Reklamsız İçerik';
                    }
                } else {
                    // Reklamlı selected
                    animatePrice(priceElement, adPrice);
                    if (subtitleElement) {
                        subtitleElement.textContent = 'Reklamlı embed + %15 indirim';
                    }
                    if (adFeature) {
                        adFeature.textContent = 'Reklamlı İçerik';
                    }
                }
                
                // Add animation
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// Animate price change
function animatePrice(element, targetPrice) {
    const currentPrice = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 500;
    const steps = 20;
    const stepTime = duration / steps;
    const increment = (targetPrice - currentPrice) / steps;
    
    let current = currentPrice;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current += increment;
        
        if (step >= steps) {
            element.textContent = '$' + targetPrice.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = '$' + Math.round(current).toLocaleString();
        }
    }, stepTime);
}

// Smooth scroll for anchor links
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

// Initialize with animation
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.stream-pricing-card');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
});

// Pricing card hover effect for comparison
const allPricingCards = document.querySelectorAll('.stream-pricing-card');

allPricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        allPricingCards.forEach(otherCard => {
            if (otherCard !== card && !otherCard.classList.contains('popular')) {
                otherCard.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        allPricingCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
        });
    });
});

console.log('%c💰 HLS Stream Pricing Page', 'color: #436b9d; font-size: 20px; font-weight: bold;');
console.log('%cEsnek paketlerle streaming deneyimi!', 'color: #5a8bc4; font-size: 14px;');
