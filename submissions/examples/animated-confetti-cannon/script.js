let canvas, ctx;
let particles = [];
let animationId = null;

const colors = [
    '#6c63ff', '#a855f7', '#ec4899', '#f43f5e', '#f97316', 
    '#fbbf24', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'
];

const goldColors = ['#ffd700', '#ffc107', '#ffb300', '#ffa000', '#ff8f00'];
const rainbowColors = ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8b00ff'];

class Confetti {
    constructor(x, y, colorPalette = colors) {
        this.x = x;
        this.y = y;
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        this.size = 5 + Math.random() * 8;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 2) * 6 - 4;
        this.gravity = 0.2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 15;
        this.life = 1;
        this.decay = 0.98 + Math.random() * 0.02;
        this.shape = Math.floor(Math.random() * 3);
    }
    
    update() {
        this.vx *= 0.99;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.life *= this.decay;
        return this.y < window.innerHeight + 100 && this.life > 0.02;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        
        if (this.shape === 0) {
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        } else if (this.shape === 1) {
            ctx.beginPath();
            ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
                const angle = (i * 120 - 90) * Math.PI / 180;
                const x = Math.cos(angle) * this.size;
                const y = Math.sin(angle) * this.size;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }
}

function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.className = 'ease-confetti-canvas';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function fireConfetti(x, y, colorPalette = colors, count = 150) {
    for (let i = 0; i < count; i++) {
        particles.push(new Confetti(x, y, colorPalette));
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.update());
    particles.forEach(p => p.draw(ctx));
    animationId = requestAnimationFrame(animateConfetti);
}

function startConfettiSystem() {
    if (!canvas) initCanvas();
    if (animationId) cancelAnimationFrame(animationId);
    animateConfetti();
}

function clearConfetti() {
    particles = [];
}

const area = document.getElementById('confettiArea');
const rect = area.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

document.getElementById('fireCannon').addEventListener('click', (e) => {
    const rect = area.getBoundingClientRect();
    startConfettiSystem();
    fireConfetti(rect.left + rect.width/2, rect.top + rect.height/2, colors, 150);
});

document.getElementById('fireRainbow').addEventListener('click', (e) => {
    const rect = area.getBoundingClientRect();
    startConfettiSystem();
    fireConfetti(rect.left + rect.width/2, rect.top + rect.height/2, rainbowColors, 200);
});

document.getElementById('fireGold').addEventListener('click', (e) => {
    const rect = area.getBoundingClientRect();
    startConfettiSystem();
    fireConfetti(rect.left + rect.width/2, rect.top + rect.height/2, goldColors, 120);
});

document.getElementById('clearConfetti').addEventListener('click', () => {
    clearConfetti();
});

area.addEventListener('click', (e) => {
    startConfettiSystem();
    fireConfetti(e.clientX, e.clientY, colors, 100);
});