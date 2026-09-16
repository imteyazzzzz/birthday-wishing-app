/* ==========================================================================
   BIRTHDAY CELEBRATION WEB APP - INTERACTIVE SCRIPT
   ========================================================================== */

(function () {
  'use strict';

  // --- DEFAULT DATA CONFIG ---
  const DEFAULT_CONFIG = {
    name: 'Rahul',
    nickname: 'The Legend',
    age: '21 🔥',
    tagline: '✨ The Official Legend of the Gang ✨',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
    message: `Happy Birthday mere bhai! 🎉\n\nZindagi mein hamesha aise hi muskurate reh, maze karte reh aur sabse zaroori... treat time pe dete reh! 😂\n\nTere jaisa dost milna mushkil hi nahi, namumkin hai. May this year bring you endless happiness, blockbuster success, good health, and tons of crazy road trips together! 🥂🚀`,
    sender: 'Tere Saare Yaar & Gang ❤️',
    musicPreset: 'festive_synth',
    customAudioData: null
  };

  // Fun Best Friend Roast & Wish Messages for Balloon Pop Game
  const BALLOON_MESSAGES = [
    { emoji: '🍕', title: 'Treat Alert!', msg: 'Bhai birthday ki party kab aur kahan de raha hai? Date fix kar jaldi!' },
    { emoji: '👑', title: 'Born Legend!', msg: 'Aaj ke din ek superstar paida hua tha... aur dusra tu hai! Happy Birthday!' },
    { emoji: '🧠', title: 'Wisdom Check!', msg: 'Umar toh ek saal aur badh gayi, par akal kab aayegi mere bhai? 😂' },
    { emoji: '🚀', title: 'Infinite Success!', msg: 'May all your dreams, startups & crazy plans turn into massive success this year!' },
    { emoji: '❤️', title: 'BFF Forever!', msg: 'Duniya idhar ki udhar ho jaye, par apni dosti hamesha No. 1 rahegi!' },
    { emoji: '🎂', title: 'Cake Alert!', msg: 'Sabse pehla aur sabse bada cake ka piece mere liye reserved hai boss!' }
  ];

  const BALLOON_COLORS = [
    { bg: 'linear-gradient(135deg, #ff2a85, #ff7300)', text: '#fff' },
    { bg: 'linear-gradient(135deg, #00c6ff, #0072ff)', text: '#fff' },
    { bg: 'linear-gradient(135deg, #f7971e, #ffd200)', text: '#111' },
    { bg: 'linear-gradient(135deg, #8e2de2, #4a00e0)', text: '#fff' },
    { bg: 'linear-gradient(135deg, #11998e, #38ef7d)', text: '#111' },
    { bg: 'linear-gradient(135deg, #ff0844, #ffb199)', text: '#fff' }
  ];

  // Sample Polaroid Memories
  const DEFAULT_MEMORIES = [
    {
      img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&auto=format&fit=crop&q=80',
      title: 'Midnight Chaos 🌙',
      date: 'Old Memories • 2:00 AM',
      caption: 'Jab bina plan ke gedi maarne nikalte the!'
    },
    {
      img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80',
      title: 'The Squad Goals 🤙',
      date: 'Chai Tapri Session',
      caption: 'Har musibat mein saath khade rehne wale yaar!'
    },
    {
      img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&auto=format&fit=crop&q=80',
      title: 'Party Mode ON 🕺',
      date: 'Epic Celebration',
      caption: 'Dance moves jo kisi comedy movie se kam nahi the!'
    },
    {
      img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
      title: 'The Birthday Star ✨',
      date: 'Main Character Vibe',
      caption: 'Aaj ka din sirf aur sirf tere naam!'
    }
  ];

  // --- STATE ---
  let appConfig = Object.assign({}, DEFAULT_CONFIG);
  let poppedCount = 0;
  let isCandleBlown = false;
  let isCakeCut = false;
  let isMusicPlaying = false;
  let audioContext = null;
  let synthMusicInterval = null;
  let currentPolaroidIndex = 0;

  // --- DOM ELEMENTS ---
  const headerNickname = document.getElementById('header-nickname');
  const displayName = document.getElementById('display-name');
  const displayTagline = document.getElementById('display-tagline');
  const displayAge = document.getElementById('display-age');
  const displayAvatar = document.getElementById('display-avatar');
  const musicBtn = document.getElementById('music-btn');
  const settingsBtn = document.getElementById('settings-btn');
  const reopenSettingsBtn = document.getElementById('reopen-settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const closeSettingsBtn = document.getElementById('close-settings-btn');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const resetSettingsBtn = document.getElementById('reset-settings-btn');
  const shareWebsiteBtn = document.getElementById('share-website-btn');
  const shareUrlInput = document.getElementById('share-url-input');
  const copyUrlBtn = document.getElementById('copy-url-btn');
  const appToast = document.getElementById('app-toast');

  // Cake Elements
  const candleWrap = document.getElementById('candle-wrap');
  const candleFlame = document.getElementById('candle-flame');
  const cakeKnife = document.getElementById('cake-knife');
  const blowCandleBtn = document.getElementById('blow-candle-btn');
  const cutCakeBtn = document.getElementById('cut-cake-btn');
  const cakeBottomTier = document.getElementById('cake-bottom-tier');
  const cakeSuccessBanner = document.getElementById('cake-success-banner');
  const cakeInstructionText = document.getElementById('cake-instruction-text');

  // Balloon Elements
  const balloonBox = document.getElementById('balloon-box');
  const poppedCountEl = document.getElementById('popped-count');
  const spawnBalloonsBtn = document.getElementById('spawn-balloons-btn');
  const balloonModalOverlay = document.getElementById('balloon-modal-overlay');
  const balloonModalTitle = document.getElementById('balloon-modal-title');
  const balloonModalMsg = document.getElementById('balloon-modal-message');
  const balloonModalEmoji = document.getElementById('balloon-modal-emoji');
  const balloonModalClose = document.getElementById('balloon-modal-close');

  // Polaroid Carousel Elements
  const polaroidTrack = document.getElementById('polaroid-track');
  const polaroidDots = document.getElementById('polaroid-dots');
  const prevPhotoBtn = document.getElementById('prev-photo-btn');
  const nextPhotoBtn = document.getElementById('next-photo-btn');

  // Gift Box & Letter Elements
  const giftBoxInteractive = document.getElementById('gift-box-interactive');
  const letterCard = document.getElementById('letter-card');
  const letterFriendName = document.getElementById('letter-friend-name');
  const letterCustomBody = document.getElementById('letter-custom-body');
  const letterSenderName = document.getElementById('letter-sender-name');
  const blastConfettiBtn = document.getElementById('blast-confetti-btn');
  const footerFriendName = document.getElementById('footer-friend-name');

  // Form Inputs
  const inputName = document.getElementById('input-name');
  const inputNickname = document.getElementById('input-nickname');
  const inputAge = document.getElementById('input-age');
  const inputTagline = document.getElementById('input-tagline');
  const inputMessage = document.getElementById('input-message');
  const inputSender = document.getElementById('input-sender');
  const inputAvatarFile = document.getElementById('input-avatar-file');
  const inputAvatarUrl = document.getElementById('input-avatar-url');
  const inputMusicPreset = document.getElementById('input-music-preset');
  const inputAudioFile = document.getElementById('input-audio-file');
  const customAudioUploadWrap = document.getElementById('custom-audio-upload-wrap');
  const bgAudio = document.getElementById('bg-audio');

  // ==========================================================================
  // 1. INITIALIZATION & STORAGE
  // ==========================================================================
  function initApp() {
    loadConfigFromStorageOrUrl();
    renderAppConfig();
    spawnAmbientStars();
    initBalloons();
    renderPolaroids();
    setupEventListeners();
    triggerWelcomeConfetti();
  }

  function loadConfigFromStorageOrUrl() {
    // 1. Check URL query params first
    const params = new URLSearchParams(window.location.search);
    let loadedFromUrl = false;

    if (params.get('name')) {
      appConfig.name = params.get('name');
      loadedFromUrl = true;
    }
    if (params.get('nick')) {
      appConfig.nickname = params.get('nick');
      loadedFromUrl = true;
    }
    if (params.get('age')) {
      appConfig.age = params.get('age');
      loadedFromUrl = true;
    }
    if (params.get('tag')) {
      appConfig.tagline = params.get('tag');
      loadedFromUrl = true;
    }
    if (params.get('msg')) {
      appConfig.message = params.get('msg');
      loadedFromUrl = true;
    }
    if (params.get('from')) {
      appConfig.sender = params.get('from');
      loadedFromUrl = true;
    }
    if (params.get('avatar')) {
      appConfig.avatar = params.get('avatar');
      loadedFromUrl = true;
    }

    // 2. If not in URL, load from localStorage
    if (!loadedFromUrl) {
      try {
        const saved = localStorage.getItem('bday_app_config');
        if (saved) {
          appConfig = Object.assign({}, DEFAULT_CONFIG, JSON.parse(saved));
        }
      } catch (e) {
        console.error('Storage parse error:', e);
      }
    }

    updateShareUrlInput();
  }

  function saveConfig() {
    try {
      localStorage.setItem('bday_app_config', JSON.stringify(appConfig));
      updateShareUrlInput();
      showToast('✨ Details saved successfully!');
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }

  function renderAppConfig() {
    document.title = `Happy Birthday ${appConfig.name}! 🎉🎂`;
    headerNickname.textContent = appConfig.nickname || `${appConfig.name} Yaar`;
    displayName.textContent = (appConfig.name || 'Rahul').toUpperCase();
    displayTagline.textContent = appConfig.tagline || '✨ The Official Legend of the Gang ✨';
    displayAge.textContent = appConfig.age || 'Forever Young 🔥';
    displayAvatar.src = appConfig.avatar || DEFAULT_CONFIG.avatar;

    letterFriendName.textContent = appConfig.name || 'Rahul';
    letterCustomBody.textContent = appConfig.message || DEFAULT_CONFIG.message;
    letterSenderName.textContent = appConfig.sender || DEFAULT_CONFIG.sender;
    footerFriendName.textContent = appConfig.name || 'Rahul';

    // Populate Settings Inputs
    inputName.value = appConfig.name;
    inputNickname.value = appConfig.nickname;
    inputAge.value = appConfig.age;
    inputTagline.value = appConfig.tagline;
    inputMessage.value = appConfig.message;
    inputSender.value = appConfig.sender;
    inputAvatarUrl.value = appConfig.avatar && appConfig.avatar.startsWith('http') ? appConfig.avatar : '';
    inputMusicPreset.value = appConfig.musicPreset || 'festive_synth';

    if (appConfig.musicPreset === 'custom') {
      customAudioUploadWrap.style.display = 'block';
    } else {
      customAudioUploadWrap.style.display = 'none';
    }
  }

  function updateShareUrlInput() {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    params.set('name', appConfig.name);
    params.set('nick', appConfig.nickname);
    params.set('age', appConfig.age);
    params.set('tag', appConfig.tagline);
    params.set('msg', appConfig.message);
    params.set('from', appConfig.sender);
    if (appConfig.avatar && appConfig.avatar.startsWith('http')) {
      params.set('avatar', appConfig.avatar);
    }

    const shareUrl = `${baseUrl}?${params.toString()}`;
    shareUrlInput.value = shareUrl;
  }

  // ==========================================================================
  // 2. AUDIO SYNTHESIS & BGM ENGINE
  // ==========================================================================
  function getAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    return audioContext;
  }

  // Play Sound Effects
  function playPopSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.8, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  }

  function playBlowSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Whoosh / wind effect using modulated noise
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  }

  function playCakeCutSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Cheerful arpeggio fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
    });
  }

  function playSparkleSound() {
    const ctx = getAudioContext();
    if (!ctx) return;
    const chimeFreqs = [1200, 1500, 1800, 2200];
    chimeFreqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.06);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + i * 0.06 + 0.35);
    });
  }

  // Synthesized "Happy Birthday" Melody
  const BDAY_MELODY = [
    { note: 261.63, dur: 0.3 }, // C4 Hap-
    { note: 261.63, dur: 0.3 }, // C4 py
    { note: 293.66, dur: 0.6 }, // D4 Birth-
    { note: 261.63, dur: 0.6 }, // C4 day
    { note: 349.23, dur: 0.6 }, // F4 to
    { note: 329.63, dur: 1.0 }, // E4 you

    { note: 261.63, dur: 0.3 }, // C4 Hap-
    { note: 261.63, dur: 0.3 }, // C4 py
    { note: 293.66, dur: 0.6 }, // D4 Birth-
    { note: 261.63, dur: 0.6 }, // C4 day
    { note: 392.00, dur: 0.6 }, // G4 to
    { note: 349.23, dur: 1.0 }, // F4 you

    { note: 261.63, dur: 0.3 }, // C4 Hap-
    { note: 261.63, dur: 0.3 }, // C4 py
    { note: 523.25, dur: 0.6 }, // C5 Birth-
    { note: 440.00, dur: 0.6 }, // A4 day
    { note: 349.23, dur: 0.6 }, // F4 dear
    { note: 329.63, dur: 0.6 }, // E4 [Friend]
    { note: 293.66, dur: 1.0 }, // D4 Name

    { note: 466.16, dur: 0.3 }, // Bb4 Hap-
    { note: 466.16, dur: 0.3 }, // Bb4 py
    { note: 440.00, dur: 0.6 }, // A4 Birth-
    { note: 349.23, dur: 0.6 }, // F4 day
    { note: 392.00, dur: 0.6 }, // G4 to
    { note: 349.23, dur: 1.2 }  // F4 you
  ];

  let currentNoteIndex = 0;

  function startSynthMelody() {
    stopSynthMelody();
    const ctx = getAudioContext();
    if (!ctx) return;

    currentNoteIndex = 0;
    function playNextNote() {
      if (!isMusicPlaying) return;
      const noteItem = BDAY_MELODY[currentNoteIndex];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = appConfig.musicPreset === 'party_beat' ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(noteItem.note, ctx.currentTime);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + noteItem.dur * 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + noteItem.dur);

      currentNoteIndex = (currentNoteIndex + 1) % BDAY_MELODY.length;
      synthMusicInterval = setTimeout(playNextNote, noteItem.dur * 1000 + 40);
    }

    playNextNote();
  }

  function stopSynthMelody() {
    if (synthMusicInterval) {
      clearTimeout(synthMusicInterval);
      synthMusicInterval = null;
    }
  }

  function toggleMusic() {
    const ctx = getAudioContext();
    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
      musicBtn.classList.add('playing');
      showToast('🎵 Birthday Song Playing!');

      if (appConfig.musicPreset === 'custom' && appConfig.customAudioData) {
        bgAudio.src = appConfig.customAudioData;
        bgAudio.play().catch(e => console.log('Audio play blocked:', e));
      } else {
        startSynthMelody();
      }
    } else {
      musicBtn.classList.remove('playing');
      stopSynthMelody();
      bgAudio.pause();
      showToast('🔇 Music Paused');
    }
  }

  // ==========================================================================
  // 3. BALLOON POPPING MINI-GAME
  // ==========================================================================
  function initBalloons() {
    balloonBox.innerHTML = '';
    poppedCount = 0;
    poppedCountEl.textContent = '0';

    const boxWidth = balloonBox.clientWidth || 340;
    const boxHeight = balloonBox.clientHeight || 280;

    for (let i = 0; i < 6; i++) {
      const b = document.createElement('div');
      b.className = 'game-balloon';
      const colorScheme = BALLOON_COLORS[i % BALLOON_COLORS.length];
      b.style.background = colorScheme.bg;
      b.style.color = colorScheme.text;

      // Random positioning within arena
      const leftPos = 15 + Math.random() * (boxWidth - 90);
      const topPos = 20 + Math.random() * (boxHeight - 120);
      b.style.left = `${leftPos}px`;
      b.style.top = `${topPos}px`;
      b.style.animationDelay = `${(i * 0.4).toFixed(1)}s`;

      const msgData = BALLOON_MESSAGES[i % BALLOON_MESSAGES.length];
      b.innerHTML = `<span>${msgData.emoji}</span>`;

      // Tap / Click to Pop
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        popBalloon(b, msgData, e.clientX, e.clientY);
      });

      balloonBox.appendChild(b);
    }
  }

  function popBalloon(balloonElement, msgData, clientX, clientY) {
    if (balloonElement.dataset.popped === 'true') return;
    balloonElement.dataset.popped = 'true';

    playPopSound();
    
    // Confetti burst right at balloon coordinates
    if (window.confetti) {
      window.confetti({
        particleCount: 35,
        spread: 60,
        origin: {
          x: clientX ? clientX / window.innerWidth : 0.5,
          y: clientY ? clientY / window.innerHeight : 0.5
        },
        colors: ['#ff2a85', '#ffc837', '#00f2fe', '#8b2fc9']
      });
    }

    // Balloon pop animation
    balloonElement.style.transform = 'scale(1.4)';
    balloonElement.style.opacity = '0';
    setTimeout(() => {
      balloonElement.remove();
    }, 200);

    poppedCount++;
    poppedCountEl.textContent = poppedCount;

    // Show popup modal with roast/wish
    setTimeout(() => {
      balloonModalEmoji.textContent = msgData.emoji + '💥';
      balloonModalTitle.textContent = msgData.title;
      balloonModalMsg.textContent = msgData.msg;
      balloonModalOverlay.classList.add('active');
    }, 150);

    if (poppedCount === 6) {
      setTimeout(() => {
        triggerGrandConfetti();
        showToast('🎉 Wow! All balloons popped! Master Level Achieved!');
      }, 500);
    }
  }

  // ==========================================================================
  // 4. INTERACTIVE CAKE CUTTING & CANDLE BLOWING
  // ==========================================================================
  function handleBlowCandle() {
    if (isCandleBlown) return;
    isCandleBlown = true;

    playBlowSound();
    candleFlame.classList.add('blown-out');
    blowCandleBtn.disabled = true;
    cutCakeBtn.disabled = false;
    cutCakeBtn.classList.add('highlight');

    cakeInstructionText.innerHTML = '✨ <strong>Candle blown!</strong> Now tap "Cut Cake" or tap the knife to slice it!';
    showToast('💨 Fffff! Candle blown! Make a wish!');

    // Sparkle effect
    if (window.confetti) {
      window.confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.55 },
        colors: ['#ffffff', '#ffd700']
      });
    }
  }

  function handleCutCake() {
    if (isCakeCut) return;
    if (!isCandleBlown) {
      handleBlowCandle();
    }

    isCakeCut = true;
    cutCakeBtn.disabled = true;
    cutCakeBtn.textContent = '✅ Cake Sliced!';

    // Knife Animation
    cakeKnife.classList.add('cutting-action');
    playCakeCutSound();

    setTimeout(() => {
      cakeBottomTier.classList.add('sliced');
      cakeSuccessBanner.classList.add('active');
      triggerGrandConfetti();

      // Start music automatically if not playing
      if (!isMusicPlaying) {
        toggleMusic();
      }

      showToast('🍰 YAY! Cake cut successfully! Treat time!');
    }, 450);
  }

  // ==========================================================================
  // 5. POLAROID MEMORIES CAROUSEL
  // ==========================================================================
  function renderPolaroids() {
    polaroidTrack.innerHTML = '';
    polaroidDots.innerHTML = '';

    DEFAULT_MEMORIES.forEach((item, idx) => {
      // Card
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      card.style.setProperty('--tape-tilt', `${(idx % 2 === 0 ? 2 : -2)}deg`);
      
      card.innerHTML = `
        <div class="tape-pin"></div>
        <div class="polaroid-img-frame">
          <img src="${item.img}" alt="${item.title}" loading="lazy">
        </div>
        <div class="polaroid-caption">
          <h4>${item.title}</h4>
          <p>${item.date} • ${item.caption}</p>
        </div>
      `;
      polaroidTrack.appendChild(card);

      // Dot
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        scrollToPolaroid(idx);
      });
      polaroidDots.appendChild(dot);
    });

    // Update active dot on scroll
    polaroidTrack.addEventListener('scroll', () => {
      const scrollLeft = polaroidTrack.scrollLeft;
      const cardWidth = 276; // 260 width + 16 gap
      const activeIdx = Math.round(scrollLeft / cardWidth);
      if (activeIdx !== currentPolaroidIndex && activeIdx >= 0 && activeIdx < DEFAULT_MEMORIES.length) {
        currentPolaroidIndex = activeIdx;
        updatePolaroidDots();
      }
    });
  }

  function scrollToPolaroid(index) {
    currentPolaroidIndex = Math.max(0, Math.min(index, DEFAULT_MEMORIES.length - 1));
    const cardWidth = 276;
    polaroidTrack.scrollTo({
      left: currentPolaroidIndex * cardWidth,
      behavior: 'smooth'
    });
    updatePolaroidDots();
  }

  function updatePolaroidDots() {
    const dots = polaroidDots.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentPolaroidIndex);
    });
  }

  // ==========================================================================
  // 6. GIFT BOX & HEARTFELT LETTER
  // ==========================================================================
  function handleOpenGiftBox() {
    if (giftBoxInteractive.classList.contains('opened')) return;

    giftBoxInteractive.classList.add('opened');
    playSparkleSound();
    triggerGrandConfetti();

    setTimeout(() => {
      letterCard.classList.add('active');
      letterCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('💌 Secret Birthday Wish Unlocked!');
    }, 300);
  }

  // ==========================================================================
  // 7. CONFETTI & VISUAL EFFECTS
  // ==========================================================================
  function triggerWelcomeConfetti() {
    if (!window.confetti) return;
    setTimeout(() => {
      window.confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#ff2a85', '#ffc837', '#00f2fe', '#ffd700']
      });
    }, 600);
  }

  function triggerGrandConfetti() {
    if (!window.confetti) return;
    const end = Date.now() + 1500;
    const colors = ['#ff2a85', '#ffc837', '#00f2fe', '#8b2fc9', '#ffffff'];

    (function frame() {
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors
      });
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  function spawnAmbientStars() {
    const container = document.getElementById('ambient-container');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const star = document.createElement('div');
      star.className = 'ambient-star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${5 + Math.random() * 6}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(star);
    }
  }

  // ==========================================================================
  // 8. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  let toastTimeout = null;
  function showToast(message) {
    if (!appToast) return;
    appToast.textContent = message;
    appToast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      appToast.classList.remove('show');
    }, 3000);
  }

  // ==========================================================================
  // 9. EVENT LISTENERS SETUP
  // ==========================================================================
  function setupEventListeners() {
    // Music Controls
    musicBtn.addEventListener('click', toggleMusic);

    // Cake Controls
    candleWrap.addEventListener('click', handleBlowCandle);
    blowCandleBtn.addEventListener('click', handleBlowCandle);
    cakeKnife.addEventListener('click', handleCutCake);
    cutCakeBtn.addEventListener('click', handleCutCake);

    // Balloon Arena Controls
    spawnBalloonsBtn.addEventListener('click', () => {
      initBalloons();
      showToast('🎈 New batch of balloons spawned!');
    });

    balloonModalClose.addEventListener('click', () => {
      balloonModalOverlay.classList.remove('active');
    });

    balloonModalOverlay.addEventListener('click', (e) => {
      if (e.target === balloonModalOverlay) {
        balloonModalOverlay.classList.remove('active');
      }
    });

    // Polaroid Nav
    prevPhotoBtn.addEventListener('click', () => scrollToPolaroid(currentPolaroidIndex - 1));
    nextPhotoBtn.addEventListener('click', () => scrollToPolaroid(currentPolaroidIndex + 1));

    // Gift Box
    giftBoxInteractive.addEventListener('click', handleOpenGiftBox);
    blastConfettiBtn.addEventListener('click', () => {
      triggerGrandConfetti();
      playSparkleSound();
    });

    // Settings Modal
    const openSettings = () => {
      settingsModal.classList.add('active');
      renderAppConfig();
    };
    const closeSettings = () => {
      settingsModal.classList.remove('active');
    };

    settingsBtn.addEventListener('click', openSettings);
    reopenSettingsBtn.addEventListener('click', openSettings);
    closeSettingsBtn.addEventListener('click', closeSettings);
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeSettings();
    });

    // Handle Image File Upload
    inputAvatarFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          appConfig.avatar = event.target.result;
          inputAvatarUrl.value = '';
          showToast('📸 Photo loaded! Click "Save" to apply.');
        };
        reader.readAsDataURL(file);
      }
    });

    // Handle Custom Music Preset Change
    inputMusicPreset.addEventListener('change', (e) => {
      if (e.target.value === 'custom') {
        customAudioUploadWrap.style.display = 'block';
      } else {
        customAudioUploadWrap.style.display = 'none';
      }
    });

    // Handle Custom Audio File Upload
    inputAudioFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          appConfig.customAudioData = event.target.result;
          showToast('🎵 Custom audio file uploaded!');
        };
        reader.readAsDataURL(file);
      }
    });

    // Save Settings
    saveSettingsBtn.addEventListener('click', () => {
      appConfig.name = inputName.value.trim() || DEFAULT_CONFIG.name;
      appConfig.nickname = inputNickname.value.trim() || DEFAULT_CONFIG.nickname;
      appConfig.age = inputAge.value.trim() || DEFAULT_CONFIG.age;
      appConfig.tagline = inputTagline.value.trim() || DEFAULT_CONFIG.tagline;
      appConfig.message = inputMessage.value.trim() || DEFAULT_CONFIG.message;
      appConfig.sender = inputSender.value.trim() || DEFAULT_CONFIG.sender;
      
      if (inputAvatarUrl.value.trim()) {
        appConfig.avatar = inputAvatarUrl.value.trim();
      }
      appConfig.musicPreset = inputMusicPreset.value;

      saveConfig();
      renderAppConfig();
      closeSettings();
      triggerGrandConfetti();
    });

    // Reset Settings
    resetSettingsBtn.addEventListener('click', () => {
      if (confirm('Kya aap saare details default par reset karna chahte hain?')) {
        appConfig = Object.assign({}, DEFAULT_CONFIG);
        saveConfig();
        renderAppConfig();
        closeSettings();
        showToast('🔄 Reset to default values!');
      }
    });

    // Share Website Button
    shareWebsiteBtn.addEventListener('click', () => {
      updateShareUrlInput();
      if (navigator.share) {
        navigator.share({
          title: `Happy Birthday ${appConfig.name}! 🎉`,
          text: `A special birthday wish website created for ${appConfig.name}! Check it out:`,
          url: shareUrlInput.value
        }).catch(() => {
          openSettings();
        });
      } else {
        openSettings();
        shareUrlInput.select();
        showToast('🔗 Shareable link ready in settings!');
      }
    });

    // Copy URL
    copyUrlBtn.addEventListener('click', () => {
      shareUrlInput.select();
      shareUrlInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(shareUrlInput.value).then(() => {
        showToast('📋 Link copied to clipboard!');
      }).catch(() => {
        document.execCommand('copy');
        showToast('📋 Link copied!');
      });
    });
  }

  // --- BOOTSTRAP ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
