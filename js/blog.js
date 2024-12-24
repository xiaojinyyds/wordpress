document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // 实现搜索逻辑
            console.log('搜索:', searchTerm);
        }
    });

    // 文章卡片悬停效果
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // 标签云随机颜色
    const tagItems = document.querySelectorAll('.tag-item');
    const colors = ['#4f46e5', '#818cf8', '#6366f1', '#4338ca', '#3730a3'];
    
    tagItems.forEach(tag => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        tag.addEventListener('mouseenter', () => {
            tag.style.background = randomColor;
            tag.style.color = 'white';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.background = '';
            tag.style.color = '';
        });
    });

    // 滚动到顶部按钮
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-top';
    document.body.appendChild(scrollButton);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 