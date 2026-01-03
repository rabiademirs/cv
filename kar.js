// Baloncuk tarzı, mavi tonlarda ve en arka planda kar efekti
window.addEventListener('DOMContentLoaded', function snowEffect() {
    //console.log('kar.js loaded - snow effect should start');
    const snowCount = 40;
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    snowContainer.style.position = 'fixed';
    snowContainer.style.top = '0';
    snowContainer.style.left = '0';
    snowContainer.style.width = '100vw';
    snowContainer.style.height = '100vh';
    snowContainer.style.zIndex = '0';
    snowContainer.style.pointerEvents = 'none';
    snowContainer.style.overflow = 'visible';
    document.body.appendChild(snowContainer);
    for (let i = 0; i < snowCount; i++) {
        const snow = document.createElement('div');
        snow.className = 'snow';
        snow.style.left = Math.random() * 100 + 'vw';
        snow.style.top = '0px'; // Tam üst kenar
        snow.style.transform = 'translateY(0)';
        const size = 4 + Math.random() * 8;
        snow.style.width = snow.style.height = size + 'px';
        const blueTones = [
            'rgba(67,107,157,0.18)',
            'rgba(90,139,196,0.22)',
            'rgba(109,157,197,0.15)',
            'rgba(126,169,209,0.18)'
        ];
        snow.style.background = blueTones[Math.floor(Math.random()*blueTones.length)];
        snow.style.borderRadius = '50%';
        snow.style.position = 'absolute';
        snow.style.pointerEvents = 'none';
        snow.style.boxShadow = '0 0 8px 1px #22334a33';
        snow.style.animation = `bubble-snow-fall ${(7 + Math.random() * 7).toFixed(1)}s linear infinite`;
        snowContainer.appendChild(snow);
    }
});
