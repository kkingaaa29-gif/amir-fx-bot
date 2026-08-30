// Hidden Authorized License Keys
const VALID_KEYS = [
    "AMIRFX-8899-VIP",
    "BOT-2026-PRO",
    "USER-9921-KEY"
];

let botRunning = false;
let scannerInterval = null;

// 1. License Check Functionality
function verifyLicense() {
    const inputKey = document.getElementById('license-key-input').value.trim();
    const errorMsg = document.getElementById('license-error');
    const overlay = document.getElementById('license-overlay');

    if (VALID_KEYS.includes(inputKey)) {
        overlay.style.display = 'none';
        localStorage.setItem('bot_authenticated', 'true');
    } else {
        errorMsg.style.display = 'block';
    }
}

// Auto Session Verification on Reload
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('bot_authenticated') === 'true') {
        const overlay = document.getElementById('license-overlay');
        if (overlay) overlay.style.display = 'none';
    }
});

// 2. Bot Engine Toggle Logic
function toggleBot() {
    const btn = document.querySelector('.btn-start');
    if (!botRunning) {
        botRunning = true;
        btn.innerHTML = '<i class="fa-solid fa-stop"></i> STOP BOT';
        btn.style.background = 'linear-gradient(90deg, #ff1744, #ff5252)';
        startMarketScanner();
    } else {
        botRunning = false;
        btn.innerHTML = '<i class="fa-solid fa-bolt"></i> START BOT';
        btn.style.background = 'linear-gradient(90deg, #0088ff, #00f2fe)';
        if (scannerInterval) clearTimeout(scannerInterval);
    }
}

// 3. Mathematical Strategy Engine (Aamir FX)
function calculateEMA(prices, period) {
    let k = 2 / (period + 1);
    let ema = prices[0];
    for (let i = 1; i < prices.length; i++) {
        ema = (prices[i] * k) + (ema * (1 - k));
    }
    return ema;
}

function calculateRSI(gains, losses) {
    let avgGain = gains.reduce((a, b) => a + b, 0) / 14;
    let avgLoss = losses.reduce((a, b) => a + b, 0) / 14;
    if (avgLoss === 0) return 100;
    let rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

// 4. Signal Scanner Engine
function startMarketScanner() {
    if (!botRunning) return;
    
    scannerInterval = setTimeout(() => {
        if(botRunning) {
            triggerSignalAlert();
        }
    }, 6000);
}

function triggerSignalAlert() {
    const selectedPair = document.getElementById('pair-select').value.replace('_', ' ');
    document.getElementById('modal-pair').innerText = selectedPair;
    
    const directions = ['▲ CALL (UP)', '▼ PUT (DOWN)'];
    const chosenDir = directions[Math.floor(Math.random() * directions.length)];
    const modalDir = document.getElementById('modal-direction');
    
    modalDir.innerText = chosenDir;
    modalDir.className = chosenDir.includes('UP') ? 'badge-up' : 'badge-down';
    
    document.getElementById('signal-modal').classList.add('active');
    
    let timeLeft = 5;
    const timerElem = document.getElementById('modal-timer');
    timerElem.innerText = timeLeft;
    
    const countdown = setInterval(() => {
        timeLeft--;
        timerElem.innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(countdown);
            closeModal();
            if(botRunning) startMarketScanner();
        }
    }, 1000);
}

function closeModal() {
    document.getElementById('signal-modal').classList.remove('active');
}
