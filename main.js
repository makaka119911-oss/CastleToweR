// ===== LUXURY EVENT LANDING - MAIN JS =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✨ Замковый Вечер Стиля ✨', 'color: #D4AF37; font-size: 18px; font-weight: bold;');
    console.log('%cЛендинг для эксклюзивного женского мероприятия', 'color: #556B2F; font-size: 14px;');
    
    // Инициализация при загрузке
    initLuxuryLanding();
    
    // Оптимизация производительности для мобильных устройств
    optimizeForMobile();
    
    // Инициализация анимаций при скролле
    initScrollAnimations();
    
    // Инициализация интерактивных элементов
    initInteractiveElements();
});

// ===== ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ =====
function initLuxuryLanding() {
    // Установка года в футере
    setCurrentYear();
    
    // Оптимизация изображений
    lazyLoadImages();
    
    // Плавная прокрутка для навигации
    initSmoothScrolling();
    
    // Параллакс эффект для hero секции
    initParallaxEffect();
    
    // Инициализация анимации элементов при скролле
    initScrollReveal();
}

// ===== ОПТИМИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ =====
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Уменьшаем сложные анимации на мобильных
        reduceAnimations();
        
        // Оптимизируем touch события
        optimizeTouchEvents();
        
        // Предотвращаем стандартное поведение жестов
        preventZoomOnDoubleTap();
    }
    
    // Адаптивная загрузка изображений
    loadAdaptiveImages();
    
    // Оптимизация производительности скролла
    optimizeScrollPerformance();
}

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .timeline-content, .invitation-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ =====
function initInteractiveElements() {
    // Эффекты при наведении на кнопки
    const buttons = document.querySelectorAll('.luxury-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Клик по кнопке
        button.addEventListener('click', function(e) {
            e.preventDefault();
            handleButtonClick(this);
        });
    });
    
    // Эффекты для карточек
    const cards = document.querySelectorAll('.feature-card, .invitation-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Интерактивность для QR кода
    const qrPlaceholder = document.querySelector('.qr-code-placeholder');
    if (qrPlaceholder) {
        qrPlaceholder.addEventListener('click', function() {
            showQRInstructions();
        });
    }
    
    // Социальные иконки
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // В реальном проекте здесь была бы навигация на соцсети
            console.log('Навигация на социальную сеть');
        });
    });
}

// ===== ПЛАВНАЯ ПРОКРУТКА =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ПАРАЛЛАКС ЭФФЕКТ =====
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

// ===== ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== АДАПТИВНАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ =====
function loadAdaptiveImages() {
    const isRetina = window.devicePixelRatio > 1;
    const isMobile = window.innerWidth <= 768;
    
    // В реальном проекте здесь была бы логика загрузки
    // изображений соответствующего размера
    console.log(`Загрузка изображений для: ${isMobile ? 'мобильного' : 'десктоп'} ${isRetina ? 'Retina' : 'стандартного'} экрана`);
}

// ===== УСТАНОВКА ТЕКУЩЕГО ГОДА =====
function setCurrentYear() {
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }
}

// ===== ОБРАБОТЧИК КЛИКА ПО КНОПКЕ =====
function handleButtonClick(button) {
    const buttonText = button.querySelector('.btn-text').textContent;
    
    // Эффект пульсации
    button.classList.add('pulse-effect');
    setTimeout(() => {
        button.classList.remove('pulse-effect');
    }, 600);
    
    // Логика в зависимости от типа кнопки
    if (buttonText.includes('Получить приглашение') || buttonText.includes('Забронировать')) {
        // Показываем модальное окно регистрации
        showRegistrationModal();
        
        // Аналитика (в реальном проекте)
        console.log(`Клик по кнопке: ${buttonText}`);
    }
}

// ===== МОДАЛЬНОЕ ОКНО РЕГИСТРАЦИИ =====
function showRegistrationModal() {
    // Создаем модальное окно
    const modalHTML = `
        <div class="luxury-modal" id="registrationModal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3 class="modal-title">Заявка на участие</h3>
                <p class="modal-description">Оставьте свои контакты, и мы вышлем вам персональное приглашение</p>
                <form class="modal-form" id="registrationForm">
                    <div class="form-group">
                        <input type="text" placeholder="Ваше имя" required>
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Электронная почта" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" placeholder="Телефон" required>
                    </div>
                    <button type="submit" class="luxury-btn modal-submit">Отправить заявку</button>
                </form>
            </div>
        </div>
    `;
    
    // Добавляем модальное окно в body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Стили для модального окна
    const modalStyles = `
        <style>
            .luxury-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(10, 10, 10, 0.9);
                backdrop-filter: blur(10px);
            }
            
            .modal-content {
                position: relative;
                background: linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%);
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 20px;
                padding: 2.5rem;
                max-width: 500px;
                width: 90%;
                z-index: 2;
                animation: modalAppear 0.4s ease;
            }
            
            @keyframes modalAppear {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-close {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                background: none;
                border: none;
                color: #D4AF37;
                font-size: 2rem;
                cursor: pointer;
                line-height: 1;
            }
            
            .modal-title {
                font-size: 2rem;
                margin-bottom: 1rem;
                color: #FFFFFF;
            }
            
            .modal-description {
                margin-bottom: 2rem;
                opacity: 0.8;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group input {
                width: 100%;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                color: #FFFFFF;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .form-group input:focus {
                outline: none;
                border-color: #D4AF37;
                background: rgba(255, 255, 255, 0.08);
            }
            
            .modal-submit {
                width: 100%;
                justify-content: center;
                margin-top: 1rem;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    padding: 2rem 1.5rem;
                    width: 95%;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    
    // Обработчики для модального окна
    const modal = document.getElementById('registrationModal');
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('registrationForm');
    
    // Закрытие по кнопке
    closeBtn.addEventListener('click', closeModal);
    
    // Закрытие по клику на оверлей
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitRegistrationForm(this);
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            // Удаляем стили
            const styleElement = document.querySelector('style[data-modal-styles]');
            if (styleElement) styleElement.remove();
        }, 300);
    }
}

// ===== ОТПРАВКА ФОРМЫ РЕГИСТРАЦИИ =====
function submitRegistrationForm(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // В реальном проекте здесь был бы AJAX запрос
    console.log('Данные формы:', data);
    
    // Показываем сообщение об успехе
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle" style="font-size: 4rem; color: #D4AF37; margin-bottom: 1.5rem;"></i>
            <h3 class="modal-title">Заявка отправлена!</h3>
            <p class="modal-description">Мы свяжемся с вами в течение 24 часов для подтверждения участия.</p>
            <button class="luxury-btn modal-close-btn">Закрыть</button>
        </div>
    `;
    
    // Добавляем обработчик для кнопки закрытия
    document.querySelector('.modal-close-btn').addEventListener('click', function() {
        document.getElementById('registrationModal').remove();
    });
}

// ===== ИНСТРУКЦИИ ПО QR КОДУ =====
function showQRInstructions() {
    alert('Замените этот блок на реальный QR-код 300×300 пикселей\n\nРекомендации:\n1. Сгенерируйте QR-код с ссылкой на детали мероприятия\n2. Сохраните как PNG с прозрачным фоном\n3. Замените блок с классом .qr-code-placeholder на <img src="ваш-qr-код.png" alt="QR код">');
}

// ===== ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ СКРОЛЛА =====
function optimizeScrollPerformance() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Операции, чувствительные к производительности
                updateScrollEffects();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ===== ОБНОВЛЕНИЕ ЭФФЕКТОВ ПРИ СКРОЛЛЕ =====
function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && scrolled < 500) {
        const opacity = 1 - (scrolled / 500);
        heroTitle.style.opacity = opacity;
    }
}

// ===== УМЕНЬШЕНИЕ АНИМАЦИЙ НА МОБИЛЬНЫХ =====
function reduceAnimations() {
    // Отключаем сложные анимации
    document.documentElement.style.setProperty('--transition-smooth', 'all 0.2s ease');
    
    // Уменьшаем тени для производительности
    document.documentElement.style.setProperty('--shadow-medium', '0 4px 15px rgba(0, 0, 0, 0.1)');
}

// ===== ОПТИМИЗАЦИЯ TOCH СОБЫТИЙ =====
function optimizeTouchEvents() {
    // Предотвращаем залипание hover на тач-устройствах
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Улучшаем отзывчивость тапов
    const tapElements = document.querySelectorAll('a, button, .feature-card');
    tapElements.forEach(el => {
        el.style.cursor = 'pointer';
    });
}

// ===== ПРЕДОТВРАЩЕНИЕ ZOOM ПРИ ДВОЙНОМ ТАПЕ =====
function preventZoomOnDoubleTap() {
    let lastTouchEnd = 0;
    
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.feature-card, .timeline-item, .invitation-item, .host-content');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, entry.target.dataset.delay || 0);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach((el, index) => {
        el.dataset.delay = index * 100;
        revealObserver.observe(el);
    });
}

// ===== ОБРАБОТЧИКИ ОШИБОК =====
window.addEventListener('error', function(e) {
    console.error('Произошла ошибка:', e.error);
    // В реальном проекте здесь можно отправить ошибку на сервер
});

// ===== ОПТИМИЗАЦИЯ ПАМЯТИ =====
window.addEventListener('beforeunload', function() {
    // Очистка ресурсов перед уходом со страницы
    const modals = document.querySelectorAll('.luxury-modal');
    modals.forEach(modal => modal.remove());
});

// ===== ПОЛЬЗОВАТЕЛЬСКИЕ СОБЫТИЯ ДЛЯ АНАЛИТИКИ =====
function trackUserInteraction(eventName, details) {
    // В реальном проекте здесь была бы интеграция с аналитикой
    console.log(`User interaction: ${eventName}`, details);
}

// Экспорт функций для глобального доступа (если нужно)
window.LuxuryEventLanding = {
    init: initLuxuryLanding,
    showRegistration: showRegistrationModal,
    trackEvent: trackUserInteraction
};


