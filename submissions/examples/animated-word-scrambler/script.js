const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
let activeIntervals = [];

function scrambleWord(element, targetText, duration = 500, onComplete = null) {
    const originalText = element.textContent;
    const target = targetText || element.getAttribute('data-text') || originalText;
    const steps = 20;
    const stepDuration = duration / steps;
    let step = 0;
    
    if (activeIntervals[element.id]) {
        clearInterval(activeIntervals[element.id]);
    }
    
    const interval = setInterval(() => {
        if (step >= steps) {
            element.textContent = target;
            clearInterval(interval);
            if (onComplete) onComplete();
            return;
        }
        
        let scrambled = '';
        const progress = step / steps;
        const revealCount = Math.floor(target.length * progress);
        
        for (let i = 0; i < target.length; i++) {
            if (i < revealCount) {
                scrambled += target[i];
            } else {
                scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        
        element.textContent = scrambled;
        step++;
    }, stepDuration);
    
    activeIntervals[element.id] = interval;
}

function scrambleAll(duration) {
    const elements = document.querySelectorAll('.ease-word-scrambler');
    elements.forEach(el => {
        const target = el.getAttribute('data-text');
        scrambleWord(el, target, duration);
    });
}

function resetAll() {
    const elements = document.querySelectorAll('.ease-word-scrambler');
    elements.forEach(el => {
        const target = el.getAttribute('data-text');
        el.textContent = target;
        if (activeIntervals[el.id]) {
            clearInterval(activeIntervals[el.id]);
        }
    });
}

document.querySelectorAll('.ease-word-scrambler').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const target = el.getAttribute('data-text');
        scrambleWord(el, target, 400);
    });
});

document.getElementById('scrambleAll').addEventListener('click', () => {
    scrambleAll(600);
});

document.getElementById('scrambleFast').addEventListener('click', () => {
    scrambleAll(250);
});

document.getElementById('scrambleSlow').addEventListener('click', () => {
    scrambleAll(1000);
});

document.getElementById('resetText').addEventListener('click', () => {
    resetAll();
});