document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // 初始化粒子效果
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });

    // 技能等级条动画
    const techItems = document.querySelectorAll('.tech-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                const levelBar = entry.target.querySelector('.level-bar');
                levelBar.style.transform = `scaleX(${level / 100})`;
            }
        });
    });

    techItems.forEach(item => observer.observe(item));

    // 圆形进度条动画
    const circles = document.querySelectorAll('.progress-ring-circle');
    circles.forEach(circle => {
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        
        const percent = parseInt(circle.parentElement.nextElementSibling.textContent);
        const offset = circumference - (percent / 100 * circumference);
        circle.style.strokeDashoffset = offset;
    });

    // 学习进度条动画
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scaleX(1)';
            }
        });
    });

    progressBars.forEach(bar => progressObserver.observe(bar));
}); 