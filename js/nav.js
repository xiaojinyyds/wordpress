document.addEventListener('DOMContentLoaded', function() {
    // 导航栏处理
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // 详细的调试信息
    console.log('=== 导航栏调试信息 ===');
    console.log('导航按钮状态:', {
        element: navToggle,
        exists: !!navToggle,
        display: navToggle ? getComputedStyle(navToggle).display : 'not found'
    });
    console.log('导航菜单状态:', {
        element: navMenu,
        exists: !!navMenu,
        visibility: navMenu ? getComputedStyle(navMenu).visibility : 'not found',
        transform: navMenu ? getComputedStyle(navMenu).transform : 'not found'
    });

    if (!navToggle || !navMenu) {
        console.error('导航栏元素未找到！');
        return;
    }

    // 设置当前页面的活动状态
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelector(`.nav-menu a[href="${currentPage}"]`)?.classList.add('active');

    // 切换菜单
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('导航按钮被点击');
        console.log('点击前菜单状态:', {
            classList: Array.from(navMenu.classList),
            visibility: getComputedStyle(navMenu).visibility,
            transform: getComputedStyle(navMenu).transform
        });

        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        console.log('点击后菜单状态:', {
            classList: Array.from(navMenu.classList),
            visibility: getComputedStyle(navMenu).visibility,
            transform: getComputedStyle(navMenu).transform
        });

        // 切换图标
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            navMenu.style.animation = 'slideIn 0.3s forwards';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            navMenu.style.animation = 'slideOut 0.3s forwards';
        }
    });

    // 点击菜单项时关闭菜单
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            navMenu.style.animation = 'slideOut 0.3s forwards';
        });
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });

    // 滚动时自动隐藏/显示导航栏
    let lastScrollTop = 0;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                    navMenu.classList.remove('active');
                    navToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}); 