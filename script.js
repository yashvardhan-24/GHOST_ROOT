/**
 * ROOT_ACCESS // ETHICAL_HACKERS Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initMatrix();
    initNavigation();
    initTerminal();
    initThreatDashboard();
    initAcademy();
    initTools();
    initGhostAI();
    initContact();
    initAuth();
    initServiceFlow();
    initHeroButtons();
    
    // Quick Wins
    initBootSequence();
    handleKeyboardSounds();
});

// ===== MATRIX RAIN (ENHANCED) =====
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%' + '?????????????????????????????????????????????';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    let mouseX = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
    });

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = `rgba(0, 255, 65, ${0.5 + mouseX * 0.5})`; 
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            const scrollSpeed = 1 + (window.scrollY / 1000);
            drops[i] += scrollSpeed;
        }
    }

    setInterval(draw, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== NAVIGATION (MULTI-PAGE) =====
function initNavigation() {
    // Nav links are now real <a> tags leading to .html files.
    // We just need to handle active state based on current filename.
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === "" && href === "index.html")) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Special case for logo click
    document.querySelector('.nav-brand')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// ===== HERO BUTTONS =====
function initHeroButtons() {
    document.getElementById('initiate-protocol-btn')?.addEventListener('click', () => {
        terminalRedirect('services.html', 'Initializing SESSION sequence...');
    });

    document.getElementById('view-manifesto-btn')?.addEventListener('click', () => {
        alert("MANIFESTO: In a world of digital cage, the only freedom is code. We break to build, we hide to reveal. The truth is in the log files.");
    });
}

// ===== INTERACTIVE TERMINAL (WITH REDIRECTS) =====
function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalInput) return;

    const commands = {
        'help': 'Available commands: whoami, scan, threats, tools, services, contact, academy, ai, clear, date',
        'whoami': () => terminalRedirect('whoami.html', 'Accessing WHOAMI protocol...'),
        'scan': () => terminalRedirect('threats.html', 'Initializing GLOBAL_SCAN...'),
        'threats': () => terminalRedirect('threats.html', 'Accessing THREAT_DATABASE...'),
        'tools': () => terminalRedirect('tools.html', 'Loading TOOL_KIT...'),
        'services': () => terminalRedirect('services.html', 'Accessing SERVICE_NODES...'),
        'contact': () => terminalRedirect('contact.html', 'Establishing SECURE_CHANNEL...'),
        'academy': () => terminalRedirect('academy.html', 'Accessing ACADEMY_CORE...'),
        'ai': () => terminalRedirect('ai.html', 'Connecting to GHOST_AI...'),
        'date': () => new Date().toLocaleString(),
        'home': () => terminalRedirect('index.html', 'Returning to BASE...'),
        'clear': () => { terminalOutput.innerHTML = ''; return ''; },
    };

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.toLowerCase().trim();
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span class="prompt">guest@ghost_shell:~$</span> ${input}`;
            terminalOutput.appendChild(line);

            const response = document.createElement('div');
            response.className = 'terminal-line secondary';
            
            if (commands[input]) {
                const result = typeof commands[input] === 'function' ? commands[input]() : commands[input];
                if (result) response.textContent = '> ' + result;
            } else if (input !== '') {
                response.textContent = `Command not found: ${input}. Type 'help' for assist.`;
            }

            if (response.textContent) terminalOutput.appendChild(response);
            terminalInput.value = '';
            terminalInput.focus();
            terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
            
            if (input === 'root') {
                document.body.style.filter = 'invert(1)';
                setTimeout(() => document.body.style.filter = 'none', 100);
            }
        }
    });
}

function terminalRedirect(url, message) {
    const output = document.getElementById('terminal-output');
    if (!output) {
        window.location.href = url;
        return "";
    }
    
    const line = document.createElement('div');
    line.className = 'terminal-line highlight';
    line.style.color = 'var(--warn)';
    line.textContent = '> ' + (message || 'REDIRECTING...');
    output.appendChild(line);
    
    setTimeout(() => {
        window.location.href = url;
    }, 1500);
    
    return message;
}

// ===== THREAT DASHBOARD =====
function initThreatDashboard() {
    const feed = document.getElementById('live-attack-feed');
    if (!feed) return;

    const attacks = [
        { type: 'DDOS', from: 'CN', to: 'USA', ip: '221.192.1.4' },
        { type: 'SQLI', from: 'RU', to: 'UA', ip: '93.18.42.12' },
        { type: 'MALWARE', from: 'BR', to: 'FR', ip: '187.5.21.9' },
        { type: 'PHISHING', from: 'UNKNOWN', to: 'UK', ip: '45.12.8.201' }
    ];

    setInterval(() => {
        const attack = attacks[Math.floor(Math.random() * attacks.length)];
        const item = document.createElement('div');
        item.className = 'feed-item' + (Math.random() > 0.7 ? ' alert' : '');
        item.textContent = `${attack.type} // ${attack.from} -> ${attack.to} // [${attack.ip}]`;
        feed.prepend(item);
        if (feed.children.length > 5) feed.lastChild.remove();
        
        const nodes = document.getElementById('stat-nodes');
        if (nodes) {
            const current = parseInt(nodes.textContent.replace(',', ''));
            nodes.textContent = (current + (Math.random() > 0.5 ? 1 : -1)).toLocaleString();
        }
    }, 3000);

    const ctx = document.getElementById('threat-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['12:00', '12:10', '12:20', '12:30', '12:40', '12:50'],
                datasets: [{
                    label: 'Attacks/Min',
                    data: [65, 59, 80, 81, 56, 95],
                    borderColor: '#00ff41',
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { 
                    x: { display: false },
                    y: { grid: { color: '#1a1a1a' }, ticks: { color: '#00ff41' } }
                }
            }
        });
    }
}

// ===== ACADEMY =====
function initAcademy() {
    const container = document.getElementById('lesson-container');
    const academyNav = document.querySelectorAll('.academy-nav li');
    if (!container) return;

    const lessons = {
        beginner: [
            { title: 'Web Security 101', desc: 'Understanding HTML, JS and Basic Injection.', xp: 100 },
            { title: 'Linux Filesystem', desc: 'Navigating the terminal like a pro.', xp: 150 },
            { title: 'OSINT Basics', desc: 'Finding info on the open web.', xp: 100 }
        ],
        intermediate: [
            { title: 'Network Sniffing', desc: 'Capturing packets with Wireshark.', xp: 300 },
            { title: 'Python for Hackers', desc: 'Automating tasks with scripts.', xp: 400 }
        ],
        advanced: [
            { title: 'Binary Exploitation', desc: 'Buffer overflows and return oriented programming.', xp: 800 },
            { title: 'Zero-Day Research', desc: 'Finding vulnerabilities in fresh code.', xp: 1000 }
        ]
    };

    function renderLessons(level) {
        container.innerHTML = '';
        lessons[level].forEach(lesson => {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.innerHTML = `
                <h3>${lesson.title}</h3>
                <p>${lesson.desc}</p>
                <div class="card-footer">XP: ${lesson.xp} <button class="btn-start">START_CHALLENGE</button></div>
            `;
            container.appendChild(card);
        });
        
        gsap.from('.lesson-card', { opacity: 0, y: 20, stagger: 0.1 });
    }

    academyNav.forEach(item => {
        item.addEventListener('click', () => {
            academyNav.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            renderLessons(item.dataset.level);
        });
    });

    renderLessons('beginner');
}

// ===== TOOLS =====
function initTools() {
    const hashBtn = document.getElementById('identify-hash-btn');
    hashBtn?.addEventListener('click', () => {
        const input = document.getElementById('hash-id-input').value;
        const result = document.getElementById('hash-id-result');
        result.textContent = 'Analyzing...';
        setTimeout(() => {
            if (input.length === 32) result.textContent = 'IDENTIFIED: MD5 [99% Match]';
            else if (input.length === 40) result.textContent = 'IDENTIFIED: SHA-1 [98% Match]';
            else if (input.length === 64) result.textContent = 'IDENTIFIED: SHA-256 [100% Match]';
            else result.textContent = 'ANALYSIS_ERROR: Unknown Hash Format';
        }, 800);
    });

    const pwInput = document.getElementById('pw-strength-input');
    const meter = document.querySelector('.meter-bar');
    const pwResult = document.getElementById('pw-strength-result');
    
    pwInput?.addEventListener('input', (e) => {
        const val = e.target.value;
        let score = 0;
        if (val.length > 8) score += 25;
        if (/[A-Z]/.test(val)) score += 25;
        if (/[0-9]/.test(val)) score += 25;
        if (/[!-@#]/.test(val)) score += 25;
        
        if(meter) {
            meter.style.width = score + '%';
            meter.style.backgroundColor = score > 75 ? '#00ff41' : score > 40 ? '#ffcc00' : '#ff3e3e';
        }
        if(pwResult) pwResult.textContent = score > 75 ? 'STATUS: IMPREGNABLE' : 'STATUS: VULNERABLE';
    });
}

// ===== GHOST AI =====
function initGhostAI() {
    const input = document.getElementById('ai-chat-input');
    const send = document.getElementById('send-btn');
    const chat = document.getElementById('ai-chat-messages');

    async function handleChat() {
        const msg = input.value;
        if (!msg) return;

        const userDiv = document.createElement('div');
        userDiv.className = 'message user';
        userDiv.innerHTML = `<span class="sender">USER:</span><span class="text">${msg}</span>`;
        chat.appendChild(userDiv);
        input.value = '';

        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message ai thinking';
        thinkingDiv.innerHTML = `<span class="sender">GHOST_AI:</span><span class="text">Processing...</span>`;
        chat.appendChild(thinkingDiv);
        chat.scrollTop = chat.scrollHeight;

        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });
            const data = await response.json();
            thinkingDiv.querySelector('.text').textContent = data.response || "I am currently analyzing global threat vectors. Please rephrase.";
        } catch (e) {
            thinkingDiv.querySelector('.text').textContent = "Connection to Ghost Core lost. Local security active.";
        }
        chat.scrollTop = chat.scrollHeight;
    }

    send?.addEventListener('click', handleChat);
    input?.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleChat(); });
}

// ===== CONTACT =====
function initContact() {
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const code = document.getElementById('captcha-code').textContent;
        const input = document.getElementById('captcha-input').value;

        if (input !== code) {
            alert('SECURITY_ERROR: CAPTCHA MISMATCH');
            return;
        }

        btn.textContent = 'TRANSMITTING...';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'TRANSMISSION_COMPLETE';
            e.target.reset();
            alert('Message received securely. We will contact you via PGP if necessary.');
        }, 2000);
    });
}

// ===== AUTH =====
function initAuth() {
    const trigger = document.getElementById('login-trigger');
    const modal = document.getElementById('login-modal');
    const close = modal?.querySelector('.close-modal-btn');

    trigger?.addEventListener('click', () => modal.style.display = 'flex');
    close?.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });

    document.getElementById('auth-submit-btn')?.addEventListener('click', () => {
        const uid = document.getElementById('login-uid').value;
        if (uid) {
            trigger.textContent = uid.toUpperCase();
            trigger.style.color = '#fff';
            modal.style.display = 'none';
        }
    });
}

// ===== SERVICE FLOW =====
function initServiceFlow() {
    document.querySelectorAll('.service-flow-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// ===== BOOT SEQUENCE =====
function initBootSequence() {
    const overlay = document.getElementById('boot-overlay');
    const log = document.getElementById('boot-log');
    if (!overlay || !log) return;

    overlay.style.display = 'block';
    
    const lines = [
        'GHOST_OS v4.2.0 starting...',
        'Checking memory... [OK]',
        'Mounting filesystem /dev/sda1... [OK]',
        'Initializing secure protocols... [AES-256]',
        'Verifying core keys... [VALID]',
        'Connecting to global threat nodes... [CONNECTED]',
        'System ready. Accessing ROOT level.'
    ];

    let i = 0;
    const interval = setInterval(() => {
        if (i < lines.length) {
            log.textContent += lines[i] + '\n';
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(overlay, { 
                    opacity: 0, 
                    duration: 1, 
                    onComplete: () => overlay.style.display = 'none' 
                });
            }, 1000);
        }
    }, 200);
}

function handleKeyboardSounds() {
    const audio = document.getElementById('hover-sound');
    document.querySelectorAll('button, .nav-link, .service-flow-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
             if(audio) {
                 audio.currentTime = 0;
                 audio.play().catch(() => {});
             }
        });
    });
}

function addMapDot() {
    const map = document.querySelector('.world-map-container');
    if (!map) return;
    
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.background = Math.random() > 0.7 ? '#ff3e3e' : '#00ff41';
    dot.style.borderRadius = '50%';
    dot.style.left = Math.random() * 90 + '%';
    dot.style.top = Math.random() * 80 + '%';
    dot.style.boxShadow = '0 0 10px ' + dot.style.background;
    dot.style.opacity = '0';
    
    map.appendChild(dot);
    
    gsap.to(dot, { 
        opacity: 1, 
        scale: 1.5, 
        duration: 0.5, 
        yoyo: true, 
        repeat: 3, 
        onComplete: () => dot.remove() 
    });
}

if (document.querySelector('.world-map-container')) {
    setInterval(addMapDot, 2000);
}
