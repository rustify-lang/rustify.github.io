// Плавная прокрутка для навигации
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

// Анимация при скролле
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

// Наблюдаем за элементами
document.querySelectorAll('.feature-card, .status-card, .roadmap-quarter, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Анимация терминала
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-20px)';
    line.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
    }, 500 * index);
});

// Анимация прогресса при загрузке
window.addEventListener('load', function() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const finalWidth = progressFill.style.width;
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = finalWidth;
        }, 1000);
    }
    
    // Анимация мини-прогрессов
    const miniProgresses = document.querySelectorAll('.mini-progress');
    miniProgresses.forEach(progress => {
        const finalWidth = progress.style.width;
        progress.style.width = '0%';
        setTimeout(() => {
            progress.style.width = finalWidth;
        }, 1500);
    });
});

// Анимация статистики
const statNumbers = document.querySelectorAll('.stat-number');
statNumbers.forEach(stat => {
    const finalValue = stat.textContent;
    stat.textContent = '0';
    
    let currentValue = 0;
    const targetValue = finalValue.includes('%') ? 
        parseInt(finalValue) : 
        (finalValue.includes('2025') ? 2025 : (finalValue.includes('01.01') ? 1 : parseInt(finalValue)));
    
    const increment = targetValue / 50;
    const duration = 2000;
    const interval = duration / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            clearInterval(timer);
            stat.textContent = finalValue;
        } else {
            if (finalValue.includes('%')) {
                stat.textContent = Math.round(currentValue) + '%';
            } else if (finalValue.includes('2025')) {
                stat.textContent = '2025';
            } else if (finalValue.includes('01.01')) {
                stat.textContent = '01.01.2026';
            } else {
                stat.textContent = Math.round(currentValue);
            }
        }
    }, interval);
});

// Эффекты для кнопок
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(1px)';
    });
});

// Анимация иконок
document.querySelectorAll('.feature-icon, .status-icon, .timeline-marker').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// CTA форма
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const emailInput = document.querySelector('.cta-input');
        const email = emailInput.value.trim();
        
        if (email && email.includes('@')) {
            this.innerHTML = '<i class="fas fa-check"></i> Подписано!';
            this.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-paper-plane"></i> Подписаться';
                this.style.background = 'linear-gradient(45deg, var(--primary-red), var(--gradient-end))';
            }, 3000);
            
            emailInput.value = '';
        } else {
            emailInput.style.borderColor = '#ff0000';
            emailInput.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.3)';
            
            setTimeout(() => {
                emailInput.style.borderColor = 'var(--dark-border)';
                emailInput.style.boxShadow = 'none';
            }, 2000);
        }
    });
}

// Параллакс эффект для фона
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelector('.hero-particles');
    if (particles) {
        const x = (window.innerWidth - e.pageX) / 50;
        const y = (window.innerHeight - e.pageY) / 50;
        particles.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

// Анимация при наведении на карточки
document.querySelectorAll('.feature-card, .status-card, .roadmap-quarter').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 50px rgba(255, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
});

// Добавление частиц в фон
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = i % 3 === 0 ? 'var(--primary-red)' : 'var(--gradient-end)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px ${i % 3 === 0 ? 'var(--primary-red)' : 'var(--gradient-end)'}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        hero.appendChild(particle);
    }
}

// Создаем частицы при загрузке
window.addEventListener('load', createParticles);

// Добавляем CSS для анимации частиц
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0) rotate(0deg); }
        25% { transform: translateY(-20px) translateX(10px) rotate(90deg); }
        50% { transform: translateY(-40px) translateX(0) rotate(180deg); }
        75% { transform: translateY(-20px) translateX(-10px) rotate(270deg); }
        100% { transform: translateY(0) translateX(0) rotate(360deg); }
    }
`;
document.head.appendChild(particleStyle);


