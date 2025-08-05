// 甲南高校同窓会サイト 共通JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニュー
    initHamburgerMenu();
    
    // ヒーロースライダー
    initHeroSlider();
    
    // カウントダウンタイマー
    initCountdown();
    
    // 進捗バー
    initProgressBar();
    
    // スムーススクロール
    initSmoothScroll();
    
    // ヘッドライン位置調整
    initHeadlinePosition();
});

// ハンバーガーメニュー機能
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // メニュー項目クリック時にメニューを閉じる
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// ヒーロースライダー機能
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒間隔
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // 最初のスライドを表示
    showSlide(0);
    
    // 自動スライド
    setInterval(nextSlide, slideInterval);
}

// カウントダウンタイマー機能
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // 120周年記念日（2026年9月22日）
    const targetDate = new Date('2026-09-22T00:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeDifference = targetDate - now;
        
        if (timeDifference <= 0) {
            countdownElement.innerHTML = '<span class="countdown-number">0</span><span class="countdown-label">日</span>';
            return;
        }
        
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <span class="countdown-number">${days}</span>
            <span class="countdown-label">日</span>
        `;
    }
    
    // 初期表示
    updateCountdown();
    
    // 1秒ごとに更新
    setInterval(updateCountdown, 1000);
}

// 進捗バー機能
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (!progressFill || !progressText) return;
    
    // 寄附目標金額と現在の寄附金額（例）
    const targetAmount = 10000000; // 1000万円
    const currentAmount = 6500000; // 650万円（例）
    const progressPercentage = (currentAmount / targetAmount) * 100;
    
    // 進捗バーをアニメーション表示
    let currentProgress = 0;
    const animationDuration = 2000; // 2秒
    const animationSteps = 60;
    const stepDuration = animationDuration / animationSteps;
    const stepIncrement = progressPercentage / animationSteps;
    
    const progressAnimation = setInterval(() => {
        currentProgress += stepIncrement;
        if (currentProgress >= progressPercentage) {
            currentProgress = progressPercentage;
            clearInterval(progressAnimation);
        }
        
        progressFill.style.width = currentProgress + '%';
        progressText.textContent = `目標: ${(targetAmount / 10000).toLocaleString()}万円 / 現在: ${(currentAmount / 10000).toLocaleString()}万円 (${Math.round(currentProgress)}%)`;
    }, stepDuration);
}

// スムーススクロール機能
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ヘッドライン流しテキスト機能
function initHeadlineTicker() {
    const tickerContent = document.querySelector('.ticker-content');
    if (!tickerContent) return;
    
    // テキストが短い場合はアニメーションを無効化
    const tickerWidth = tickerContent.scrollWidth;
    const containerWidth = tickerContent.parentElement.offsetWidth;
    
    if (tickerWidth <= containerWidth) {
        tickerContent.style.animation = 'none';
    }
}

// 画像の遅延読み込み
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// フォームバリデーション
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('必須項目を入力してください。');
            }
        });
    });
}

// ページトップに戻るボタン
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// アクセシビリティ機能
function initAccessibility() {
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // フォーカス表示
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-color)';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// パフォーマンス最適化
function initPerformanceOptimizations() {
    // 画像の遅延読み込み
    initLazyLoading();
    
    // 不要なリソースの遅延読み込み
    const deferredScripts = document.querySelectorAll('script[data-defer]');
    deferredScripts.forEach(script => {
        script.src = script.dataset.src;
    });
}

// ヘッドライン位置調整
function initHeadlinePosition() {
    const header = document.querySelector('.fixed-header');
    const headlineTicker = document.querySelector('.headline-ticker');
    
    if (header && headlineTicker) {
        function adjustHeadlinePosition() {
            const headerHeight = header.offsetHeight;
            const extraMargin = 10; // 追加の余白
            headlineTicker.style.marginTop = (headerHeight + extraMargin) + 'px';
        }
        
        // 初期調整
        adjustHeadlinePosition();
        
        // ウィンドウリサイズ時に再調整
        window.addEventListener('resize', adjustHeadlinePosition);
        
        // フォント読み込み完了後に再調整（line-heightの影響を考慮）
        if (document.fonts) {
            document.fonts.ready.then(adjustHeadlinePosition);
        }
    }
}

// 初期化関数の実行
document.addEventListener('DOMContentLoaded', function() {
    initHeadlineTicker();
    initFormValidation();
    initBackToTop();
    initAccessibility();
    initPerformanceOptimizations();
}); 