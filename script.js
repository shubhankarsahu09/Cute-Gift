document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles-container');
    const hearts = ['🤍', '✨', '☁️', '🌸', '💖'];
    let showParticles = false;

    function createParticle() {
        if (!showParticles) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        particle.innerText = randomHeart;
        
        const size = Math.random() * 1.5 + 0.5;
        particle.style.fontSize = `${size}rem`;
        
        const startPosX = Math.random() * window.innerWidth;
        particle.style.left = `${startPosX}px`;
        
        const duration = Math.random() * 3 + 3;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    function startParticleEffect() {
        showParticles = true;
        for (let i = 0; i < 15; i++) {
            setTimeout(createParticle, Math.random() * 500);
        }
        
        setInterval(() => {
            if (showParticles) {
                createParticle();
            }
        }, 800);
    }

    // --- POPUP LOGIC ---
    const questionOverlay = document.getElementById('questionOverlay');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const funnyMsg = document.getElementById('funnyMsg');

    let evadeCount = 0;

    const evadeAction = (e) => {
        e.preventDefault();
        evadeCount++;
        
        if (evadeCount === 5) {
            funnyMsg.innerText = "really????";
        } else if (evadeCount === 7) {
            funnyMsg.innerText = "u hate me ??";
        } else if (evadeCount >= 10) {
            funnyMsg.innerText = "there is no escape my lady 😋😏";
            funnyMsg.style.fontSize = "1.5rem";
            btnNo.style.display = "none";
            return;
        }
        
        const maxOffset = 120;
        const xOffset = (Math.random() - 0.5) * maxOffset * 2;
        const yOffset = (Math.random() - 0.5) * maxOffset * 2;
        
        btnNo.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };

    if(btnNo) {
        btnNo.addEventListener('mouseover', evadeAction);
        btnNo.addEventListener('touchstart', evadeAction, { passive: false });
        btnNo.addEventListener('click', evadeAction);
    }

    // --- SCREEN NAVIGATION LOGIC ---
    const mainMenu = document.getElementById('mainMenu');
    const screenLock = document.getElementById('screenLock');
    const screenWrong = document.getElementById('screenWrong');
    const screenSuccess = document.getElementById('screenSuccess');
    const screenJar = document.getElementById('screenJar');
    const screenCert = document.getElementById('screenCert');
    const screenLetter = document.getElementById('screenLetter');

    if(btnYes) {
        btnYes.addEventListener('click', () => {
            questionOverlay.classList.add('hidden');
            screenLock.classList.remove('hidden');
        });
    }

    // --- PASSCODE LOGIC ---
    const TARGET_PASSCODE = "2412";
    let currentPasscode = "";
    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index < currentPasscode.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    }

    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            if (currentPasscode.length < 4) {
                currentPasscode += key.innerText;
                updateDots();
                
                if (currentPasscode.length === 4) {
                    setTimeout(() => {
                        if (currentPasscode === TARGET_PASSCODE) {
                            screenLock.classList.add('hidden');
                            screenSuccess.classList.remove('hidden');
                        } else {
                            screenLock.classList.add('hidden');
                            screenWrong.classList.remove('hidden');
                        }
                    }, 400); // Wait slightly for the heart to appear
                }
            }
        });
    });

    document.getElementById('btnTryAgain').addEventListener('click', () => {
        currentPasscode = "";
        updateDots();
        screenWrong.classList.add('hidden');
        screenLock.classList.remove('hidden');
    });

    document.getElementById('btnSurprise').addEventListener('click', () => {
        screenSuccess.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        startParticleEffect();
    });

    // Items
    document.getElementById('itemJar').addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        screenJar.classList.remove('hidden');
    });
    
    document.getElementById('itemCert').addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        screenCert.classList.remove('hidden');
    });

    document.getElementById('itemLetter').addEventListener('click', () => {
        mainMenu.classList.add('hidden');
        screenLetter.classList.remove('hidden');
    });

    // Back buttons
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const screen = e.target.closest('.detail-screen');
            if(screen) {
                screen.classList.add('hidden');
                mainMenu.classList.remove('hidden');
            }
        });
    });

    // Voice note logic
    const playVoiceBtn = document.getElementById('playVoiceBtn');
    const voiceNoteAudio = document.getElementById('voiceNoteAudio');

    if(playVoiceBtn && voiceNoteAudio) {
        playVoiceBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (voiceNoteAudio.paused) {
                voiceNoteAudio.play();
                playVoiceBtn.innerHTML = '⏸️ Pause Voice Note';
            } else {
                voiceNoteAudio.pause();
                playVoiceBtn.innerHTML = '▶️ Play Voice Note';
            }
        });
        
        voiceNoteAudio.addEventListener('ended', () => {
            playVoiceBtn.innerHTML = '▶️ Play Voice Note';
        });
    }
});
