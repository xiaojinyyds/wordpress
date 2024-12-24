document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // 添加调试日志
    console.log('导航元素:', {
        toggle: navToggle,
        menu: navMenu,
        navbar: navbar
    });

    // 创建背景遮罩
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    // 切换菜单
    function toggleMenu(show) {
        console.log('切换菜单:', show); // 调试日志
        navMenu.classList.toggle('active', show);
        navToggle.classList.toggle('active', show);
        backdrop.classList.toggle('active', show);
        document.body.classList.toggle('menu-open', show);
        
        const icon = navToggle.querySelector('i');
        if (show) {
            icon.classList.replace('fa-bars', 'fa-times');
            navMenu.style.animation = 'slideIn 0.3s forwards';
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            navMenu.style.animation = 'slideOut 0.3s forwards';
        }
    }

    // 点击切换按钮
    navToggle.addEventListener('click', (e) => {
        console.log('按钮被点击'); // 调试日志
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('active');
        toggleMenu(!isOpen);
    });

    // 点击菜单项
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // 点击背景遮罩关闭菜单
    backdrop.addEventListener('click', () => {
        toggleMenu(false);
    });

    // 处理滚动
    let lastScrollTop = 0;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                    toggleMenu(false);
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // 处理窗口大小改变
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        }, 250);
    });
}); 