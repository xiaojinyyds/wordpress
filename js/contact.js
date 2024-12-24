document.addEventListener('DOMContentLoaded', function() {
    // 初始化 AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // 表单提交处理
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 简单的表单验证
        if (!validateForm(data)) {
            return;
        }
        
        // 模拟表单提交
        submitForm(data);
    });

    // 表单验证函数
    function validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (data.name.length < 2) {
            showAlert('请输入有效的姓名');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            showAlert('请输入有效的邮箱地址');
            return false;
        }
        
        if (data.subject.length < 2) {
            showAlert('请输入消息主题');
            return false;
        }
        
        if (data.message.length < 10) {
            showAlert('消息内容至少需要10个字符');
            return false;
        }
        
        return true;
    }

    // 提交表单函数
    function submitForm(data) {
        // 这里可以添加实际的表单提交逻辑
        console.log('表单数据:', data);
        
        // 模拟提交成功
        showSuccess('消息已发送！我会尽快回复您。');
        contactForm.reset();
    }

    // 显示提示信息
    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-error';
        alert.textContent = message;
        
        insertAlert(alert);
    }

    // 显示成功信息
    function showSuccess(message) {
        const success = document.createElement('div');
        success.className = 'alert alert-success';
        success.textContent = message;
        
        insertAlert(success);
    }

    // 插入提示信息
    function insertAlert(alert) {
        const form = document.querySelector('.contact-form');
        form.insertBefore(alert, form.firstChild);
        
        // 3秒后移除提示
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }

    // ��加输入动画效果
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}); 