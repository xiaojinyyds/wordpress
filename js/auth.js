document.addEventListener('DOMContentLoaded', function() {
    // 密码显示切换
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });

    // 表单提交动画
    const authForm = document.querySelector('.auth-form');
    const authButton = document.querySelector('.auth-button');

    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        authButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        authButton.disabled = true;

        // 模拟提交延迟
        setTimeout(() => {
            authButton.innerHTML = '登录成功！';
            authButton.style.backgroundColor = '#10B981';
            
            // 模拟重定向
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }, 2000);
    });

    // 添加输入框焦点效果
    const inputGroups = document.querySelectorAll('.input-group');
    inputGroups.forEach(group => {
        const input = group.querySelector('input');
        input.addEventListener('focus', () => {
            group.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                group.classList.remove('focused');
            }
        });
    });
}); 