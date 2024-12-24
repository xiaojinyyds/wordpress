document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS 动画库
    AOS.init({
        duration: 1000,
        once: true
    });

    // 技能进度条动画
    const progressBars = document.querySelectorAll('.meter-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('style').match(/\d+/)[0];
                entry.target.style.width = `${progress}%`;
            }
        });
    });

    progressBars.forEach(bar => observer.observe(bar));

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 视差滚动效果
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // 添加导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (currentScroll === 0) {
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}); 