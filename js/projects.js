document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // 项目筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 故障艺术文字效果
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.animation = 'none';
            void glitchText.offsetWidth;
            glitchText.style.animation = 'glitch 725ms infinite';
        }, 2000);
    }

    // 模态框功能
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// 项目详情展示函数
function showProjectDetails(projectId) {
    const modal = document.getElementById('projectModal');
    const projectData = getProjectData(projectId);

    // 更新模态框内容
    const modalContent = modal.querySelector('.modal-content');
    modalContent.querySelector('h2').textContent = projectData.title;
    modalContent.querySelector('.project-date').textContent = projectData.date;
    modalContent.querySelector('.project-client').textContent = projectData.client;
    modalContent.querySelector('.project-description').textContent = projectData.description;

    // 更新特性列表
    const featuresList = modalContent.querySelector('.project-features ul');
    featuresList.innerHTML = projectData.features.map(feature => `<li>${feature}</li>`).join('');

    // 更新技术标签
    const techTags = modalContent.querySelector('.tech-tags');
    techTags.innerHTML = projectData.technologies.map(tech => `<span>${tech}</span>`).join('');

    // 显示模态框
    modal.style.display = 'block';
}

// 获取项目数据
function getProjectData(projectId) {
    const projectsData = {
        1: {
            title: '智能家居控制系统',
            date: '2024年1月',
            client: '某科技公司',
            description: '这是一个现代化的智能家居控制系统，支持多设备管理和场景联动。系统采用React开发前端界面，通过WebSocket实现实时数据更新，后端使用Node.js构建RESTful API，数据存储采用MongoDB。',
            features: [
                '实时设备状态监控',
                '自定义场景设置',
                '语音控制支持',
                '数据统计分析',
                '移动端适配',
                '多用户权限管理'
            ],
            technologies: ['React', 'Node.js', 'WebSocket', 'MongoDB', 'Redux', 'Material-UI']
        },
        2: {
            title: '健康追踪App',
            date: '2023年12月',
            client: '健康科技公司',
            description: '一款专注于个人健康管理的移动应用，使用Flutter开发，支持iOS和Android平台。集成多种健康数据追踪功能，并提供个性化的健康建议。',
            features: [
                '运动数据记录',
                '饮食计划管理',
                '睡眠质量分析',
                '心率监测',
                '营养摄入计算',
                '个性化建议生成'
            ],
            technologies: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit', 'SQLite', 'Provider']
        },
        3: {
            title: '现代化UI设计系统',
            date: '2023年10月',
            client: '企业服务公司',
            description: '为企业级应用定制的UI设计系统，包含完整的组件库和设计规范。采用Figma进行设计和原型制作，并提供完整的设计文档。',
            features: [
                '组件库设计',
                '色彩系统',
                '排版规范',
                '交互规则',
                '响应式布局',
                '无障碍设计'
            ],
            technologies: ['Figma', 'Design System', 'UI/UX', 'Prototype', 'Documentation']
        }
    };

    return projectsData[projectId];
} 