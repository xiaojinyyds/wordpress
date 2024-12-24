document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // 切换表单
    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'flex';
        loginForm.style.display = 'none';
    });

    // 登录表单提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.username.value;
        const password = this.password.value;
        const remember = this.remember.checked;

        // 这里添加登录验证逻辑
        if (checkLogin(username, password)) {
            localStorage.setItem('isLoggedIn', 'true');
            if (remember) {
                localStorage.setItem('username', username);
            }
            window.location.href = 'index.html';
        } else {
            alert('用户名或密码错误！');
        }
    });

    // 注册表单提交
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.username.value;
        const email = this.email.value;
        const password = this.password.value;
        const confirmPassword = this.confirm_password.value;

        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }

        // 这里添加注册逻辑
        if (registerUser(username, email, password)) {
            alert('注册成功！请登录');
            loginTab.click();
        } else {
            alert('注册失败，用户名可能已存在');
        }
    });
});

// 检查登录状态
function checkLogin(username, password) {
    // 这里应该是后端验证，现在用模拟数据
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.username === username && user.password === password);
}

// 注册用户
function registerUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some(user => user.username === username)) {
        return false;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
} 