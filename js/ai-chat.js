document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const newChatBtn = document.getElementById('newChatBtn');
    
    // API配置
    const API_KEY = '5d03cc3399f63242cf45a7829af00d38.4UhKmP3xn3Qt9MB1';
    const API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

    // 保存聊天历史
    let messageHistory = [{
        role: "assistant",
        content: "你好！我是小堇，很高兴为你服务。请问有什么我可以帮你的吗？"
    }];

    // 自动调整输入框高度
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // 发送消息
    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        // 添加用户消息到聊天界面和历史记录
        addMessage(message, 'user');
        messageHistory.push({
            role: "user",
            content: message
        });

        userInput.value = '';
        userInput.style.height = 'auto';

        try {
            // 显示加载状态
            const loadingMessage = addMessage('正在思考...', 'assistant');
            
            // 调用API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                    'Access-Control-Allow-Origin': '*'
                },
                mode: 'cors',
                body: JSON.stringify({
                    model: "glm-4",
                    messages: messageHistory,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // 移除加载消息
            loadingMessage.remove();
            
            // 使用渐进式显示AI响应
            if (data.choices && data.choices[0].message) {
                const aiMessage = data.choices[0].message.content;
                await typeMessage(aiMessage, 'assistant');
                messageHistory.push({
                    role: "assistant",
                    content: aiMessage
                });
                saveHistory();
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('抱歉，发生了一些错误，请稍后再试。', 'assistant');
        }
    }

    // 生成请求ID
    function generateRequestId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // 保存聊天历史到本地存储
    function saveHistory() {
        localStorage.setItem('chatHistory', JSON.stringify(messageHistory));
    }

    // 加载聊天历史
    function loadHistory() {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            messageHistory = JSON.parse(savedHistory);
            messageHistory.forEach(msg => {
                addMessage(msg.content, msg.role);
            });
        }
    }

    // 添加消息到聊天界面
    function addMessage(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // 处理代码块和HTML标签
        if (content.includes('```')) {
            const formattedContent = content.replace(/```(\w+:?[\w\/.-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
                // 处理语言标识和文件路径
                const [language, filePath] = lang.split(':').map(s => s.trim());
                const fileInfo = filePath ? `<div class="code-file-path">${filePath}</div>` : '';
                // 转义HTML标签
                const escapedCode = code.trim()
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                return `${fileInfo}<pre class="code-block ${language}"><code>${escapedCode}</code></pre>`;
            });
            messageContent.innerHTML = formattedContent.replace(/\n/g, '<br>');
        } else {
            // 转义普通文本中的HTML标签
            messageContent.innerHTML = content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>');
        }
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageDiv;
    }

    // 添加渐进式显示功能
    async function typeMessage(message, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content typing';
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);

        // 如果是代码块，使用不同的显示方式
        if (message.includes('```')) {
            await typeCodeBlock(message, messageContent);
        } else {
            await typeText(message, messageContent);
        }

        messageContent.classList.remove('typing');
        return messageDiv;
    }

    async function typeText(text, element) {
        const chars = text.split('');
        let currentText = '';
        
        for (let char of chars) {
            currentText += char;
            element.innerHTML = currentText
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/\n/g, '<br>');
                
            // 减少延迟时间
            let delay = 15; // 基础速度改为15ms
            if (char === '。' || char === '！' || char === '？' || char === '.' || char === '!' || char === '?') {
                delay = 150; // 句号等停顿改为150ms
            } else if (char === '，' || char === '、' || char === ',' || char === ';') {
                delay = 80; // 逗号等停顿改为80ms
            }
            
            await new Promise(resolve => setTimeout(resolve, delay));
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    async function typeCodeBlock(content, element) {
        const codeBlockRegex = /```(\w+:?[\w\/.-]*)\n([\s\S]*?)```/g;
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(content)) !== null) {
            // 先显示代码块之前的文本
            if (match.index > lastIndex) {
                await typeText(content.slice(lastIndex, match.index), element);
            }

            // 显示代码块
            const [, lang, code] = match;
            const [language, filePath] = lang.split(':').map(s => s.trim());
            
            if (filePath) {
                await typeText(`文件：${filePath}\n`, element);
            }
            
            const preElement = document.createElement('pre');
            preElement.className = `code-block ${language}`;
            const codeElement = document.createElement('code');
            preElement.appendChild(codeElement);
            element.appendChild(preElement);

            // 逐字符显示代码
            const codeChars = code.trim().split('');
            let currentCode = '';
            
            for (let char of codeChars) {
                currentCode += char;
                codeElement.innerHTML = currentCode
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
                    
                // 代码显示速度改为8ms
                await new Promise(resolve => setTimeout(resolve, 8));
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }

            lastIndex = match.index + match[0].length;
        }

        // 显示剩余文本
        if (lastIndex < content.length) {
            await typeText(content.slice(lastIndex), element);
        }
    }

    // 发送按钮点击事件
    sendButton.addEventListener('click', sendMessage);

    // 回车发送消息,Shift+Enter换行
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 添加输入状态提示
    userInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    userInput.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });

    // 禁用发送按钮当输入为空时
    userInput.addEventListener('input', function() {
        sendButton.disabled = !this.value.trim();
    });

    // 初始化时加载历史记录
    loadHistory();

    // 新对话功��
    function startNewChat() {
        // 清空聊天历史
        messageHistory = [{
            role: "assistant",
            content: "你好！我是小堇，很高兴为你服务。请问有什么我可以帮你的吗？"
        }];
        
        // 清空聊天界面
        chatMessages.innerHTML = '';
        
        // 添加初始消息
        addMessage(messageHistory[0].content, 'assistant');
        
        // 保存新的历史记录
        saveHistory();
        
        // 滚动到顶部
        chatMessages.scrollTop = 0;
    }

    // 添加新对话按钮点击事件
    newChatBtn.addEventListener('click', startNewChat);
}); 