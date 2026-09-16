/* ==========================================================================
   BIRTHDAY CELEBRATION WEB APP - ENHANCED SCRIPT
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
    musicPreset: 'happy_birthday_mp3', // default is our local HappyBirthday.mp3
    musicLoop: true,                  // repeat music option
    customAudioUrl: '',               // custom music link
    customAudioData: null             // base64 data for uploaded files
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
  let isSharedRecipientView = false;
  let poppedCount = 0;
  let isCandleBlown = false;
  let isCakeCut = false;
  let isMusicPlaying = false;
  let audioContext = null;
  let synthMusicInterval = null;
  let currentPolaroidIndex = 0;

  // --- DOM ELEMENTS ---
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const enterCelebrationBtn = document.getElementById('enter-celebration-btn');

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
  const shareFriendUrlInput = document.getElementById('share-friend-url-input');
  const copyFriendUrlBtn = document.getElementById('copy-friend-url-btn');
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
  const inputMusicLoop = document.getElementById('input-music-loop');
  const inputAudioUrl = document.getElementById('input-audio-url');
  const inputAudioFile = document.getElementById('input-audio-file');
  const customAudioUrlWrap = document.getElementById('custom-audio-url-wrap');
  const customAudioFileWrap = document.getElementById('custom-audio-file-wrap');
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
  }

  function loadConfigFromStorageOrUrl() {
    const params = new URLSearchParams(window.location.search);
    let loadedFromUrl = false;

    // Check if opened as shared recipient view
    if (params.get('mode') === 'view' || params.get('shared') === '1') {
      isSharedRecipientView = true;
    }

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
    if (params.get('music_url')) {
      appConfig.customAudioUrl = params.get('music_url');
      appConfig.musicPreset = 'custom_url';
      loadedFromUrl = true;
    }
    if (params.get('loop') !== null) {
      appConfig.musicLoop = params.get('loop') === '1';
      loadedFromUrl = true;
    }

    // If not loaded from URL parameters, load from localStorage
    if (!loadedFromUrl) {
      try {
        const saved = localStorage.getItem('bday_app_config_v2');
        if (saved) {
          appConfig = Object.assign({}, DEFAULT_CONFIG, JSON.parse(saved));
        }
      } catch (e) {
        console.error('Storage parse error:', e);
      }
    }

    // Hide edit options for recipient view
    if (isSharedRecipientView) {
      if (settingsBtn) settingsBtn.classList.add('hide-edit');
      if (reopenSettingsBtn) reopenSettingsBtn.classList.add('hide-edit');
    }

    updateShareUrlInputs();
  }

  function saveConfig() {
    try {
      localStorage.setItem('bday_app_config_v2', JSON.stringify(appConfig));
      updateShareUrlInputs();
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
    inputMusicPreset.value = appConfig.musicPreset || 'happy_birthday_mp3';
    inputMusicLoop.checked = appConfig.musicLoop !== false;
    inputAudioUrl.value = appConfig.customAudioUrl || '';

    // Audio Loop Sync
    bgAudio.loop = appConfig.musicLoop !== false;

    // Show/Hide music input fields based on preset
    updateMusicPresetVisibility();
  }

  function updateMusicPresetVisibility() {
    const preset = inputMusicPreset.value;
    if (preset === 'custom_url') {
      customAudioUrlWrap.style.display = 'block';
      customAudioFileWrap.style.display = 'none';
    } else if (preset === 'custom_file') {
      customAudioUrlWrap.style.display = 'none';
      customAudioFileWrap.style.display = 'block';
    } else {
      customAudioUrlWrap.style.display = 'none';
      customAudioFileWrap.style.display = 'none';
    }
  }

  function updateShareUrlInputs() {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    // Shared Mode to HIDE edit button for recipient
    params.set('mode', 'view');
    params.set('name', appConfig.name);
    params.set('nick', appConfig.nickname);
    params.set('age', appConfig.age);
    params.set('tag', appConfig.tagline);
    params.set('msg', appConfig.message);
    params.set('from', appConfig.sender);
    params.set('loop', appConfig.musicLoop ? '1' : '0');

    if (appConfig.avatar && appConfig.avatar.startsWith('http')) {
      params.set('avatar', appConfig.avatar);
    }
    if (appConfig.musicPreset === 'custom_url' && appConfig.customAudioUrl) {
      params.set('music_url', appConfig.customAudioUrl);
    }

    const shareUrl = `${baseUrl}?${params.toString()}`;
    shareFriendUrlInput.value = shareUrl;
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

    const notes = [523.25, 659.25, 783.99, 1046.50];
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

  // Synthesized Chimes Melody
  const BDAY_MELODY = [
    { note: 261.63, dur: 0.3 }, { note: 261.63, dur: 0.3 }, { note: 293.66, dur: 0.6 },
    { note: 261.63, dur: 0.6 }, { note: 349.23, dur: 0.6 }, { note: 329.63, dur: 1.0 },
    { note: 261.63, dur: 0.3 }, { note: 261.63, dur: 0.3 }, { note: 293.66, dur: 0.6 },
    { note: 261.63, dur: 0.6 }, { note: 392.00, dur: 0.6 }, { note: 349.23, dur: 1.0 },
    { note: 261.63, dur: 0.3 }, { note: 261.63, dur: 0.3 }, { note: 523.25, dur: 0.6 },
    { note: 440.00, dur: 0.6 }, { note: 349.23, dur: 0.6 }, { note: 329.63, dur: 0.6 },
    { note: 293.66, dur: 1.0 }, { note: 466.16, dur: 0.3 }, { note: 466.16, dur: 0.3 },
    { note: 440.00, dur: 0.6 }, { note: 349.23, dur: 0.6 }, { note: 392.00, dur: 0.6 },
    { note: 349.23, dur: 1.2 }
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

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteItem.note, ctx.currentTime);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + noteItem.dur * 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + noteItem.dur);

      currentNoteIndex = (currentNoteIndex + 1) % BDAY_MELODY.length;
      if (currentNoteIndex === 0 && !appConfig.musicLoop) {
        toggleMusic(false);
        return;
      }
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

  function playActiveMusic() {
    getAudioContext();
    isMusicPlaying = true;
    musicBtn.classList.add('playing');

    bgAudio.loop = appConfig.musicLoop !== false;

    if (appConfig.musicPreset === 'festive_synth') {
      bgAudio.pause();
      startSynthMelody();
    } else {
      stopSynthMelody();
      let targetSrc = 'audio/HappyBirthday.mp3';

      if (appConfig.musicPreset === 'custom_url' && appConfig.customAudioUrl) {
        targetSrc = appConfig.customAudioUrl;
      } else if (appConfig.musicPreset === 'custom_file' && appConfig.customAudioData) {
        targetSrc = appConfig.customAudioData;
      }

      if (bgAudio.src !== targetSrc) {
        bgAudio.src = targetSrc;
      }
      
      bgAudio.play().catch(e => {
        console.log('Audio autoplay info:', e);
      });
    }
  }

  function pauseActiveMusic() {
    isMusicPlaying = false;
    musicBtn.classList.remove('playing');
    stopSynthMelody();
    bgAudio.pause();
  }

  function toggleMusic(forceState) {
    const shouldPlay = forceState !== undefined ? forceState : !isMusicPlaying;
    if (shouldPlay) {
      playActiveMusic();
      showToast('🎵 Birthday Song Playing!');
    } else {
      pauseActiveMusic();
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

      const leftPos = 15 + Math.random() * (boxWidth - 90);
      const topPos = 20 + Math.random() * (boxHeight - 120);
      b.style.left = `${leftPos}px`;
      b.style.top = `${topPos}px`;
      b.style.animationDelay = `${(i * 0.4).toFixed(1)}s`;

      const msgData = BALLOON_MESSAGES[i % BALLOON_MESSAGES.length];
      b.innerHTML = `<span>${msgData.emoji}</span>`;

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

    balloonElement.style.transform = 'scale(1.4)';
    balloonElement.style.opacity = '0';
    setTimeout(() => {
      balloonElement.remove();
    }, 200);

    poppedCount++;
    poppedCountEl.textContent = poppedCount;

    setTimeout(() => {
      balloonModalEmoji.textContent = msgData.emoji + '💥';
      balloonModalTitle.textContent = msgData.title;
      balloonModalMsg.textContent = msgData.msg;
      balloonModalOverlay.classList.add('active');
    }, 150);

    if (poppedCount === 6) {
      setTimeout(() => {
        triggerGrandConfetti();
        showToast('🎉 All balloons popped! Master Level Achieved!');
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

    cakeKnife.classList.add('cutting-action');
    playCakeCutSound();

    setTimeout(() => {
      cakeBottomTier.classList.add('sliced');
      cakeSuccessBanner.classList.add('active');
      triggerGrandConfetti();

      if (!isMusicPlaying) {
        toggleMusic(true);
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

      const dot = document.createElement('div');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        scrollToPolaroid(idx);
      });
      polaroidDots.appendChild(dot);
    });

    polaroidTrack.addEventListener('scroll', () => {
      const scrollLeft = polaroidTrack.scrollLeft;
      const cardWidth = 276;
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
    // 0. Welcome Volume Guide Enter Button
    enterCelebrationBtn.addEventListener('click', () => {
      welcomeOverlay.classList.add('hidden');
      toggleMusic(true);
      triggerGrandConfetti();
    });

    // Music Controls
    musicBtn.addEventListener('click', () => toggleMusic());

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
      if (isSharedRecipientView) return;
      settingsModal.classList.add('active');
      renderAppConfig();
    };
    const closeSettings = () => {
      settingsModal.classList.remove('active');
    };

    if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
    if (reopenSettingsBtn) reopenSettingsBtn.addEventListener('click', openSettings);
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

    // Handle Music Preset Dropdown Change
    inputMusicPreset.addEventListener('change', () => {
      updateMusicPresetVisibility();
    });

    // Handle Custom Audio File Upload
    inputAudioFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          appConfig.customAudioData = event.target.result;
          showToast('🎵 Custom audio file ready! Click "Save" to apply.');
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
      appConfig.musicLoop = inputMusicLoop.checked;
      appConfig.customAudioUrl = inputAudioUrl.value.trim();

      saveConfig();
      renderAppConfig();
      closeSettings();
      triggerGrandConfetti();

      // Restart music with updated settings if playing
      if (isMusicPlaying) {
        playActiveMusic();
      }
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
      updateShareUrlInputs();
      if (navigator.share) {
        navigator.share({
          title: `Happy Birthday ${appConfig.name}! 🎉`,
          text: `A special birthday wish website created for ${appConfig.name}! Check it out:`,
          url: shareFriendUrlInput.value
        }).catch(() => {
          if (!isSharedRecipientView) openSettings();
        });
      } else {
        if (!isSharedRecipientView) {
          openSettings();
          shareFriendUrlInput.select();
        } else {
          navigator.clipboard.writeText(shareFriendUrlInput.value || window.location.href);
        }
        showToast('🔗 Shareable link ready!');
      }
    });

    // Copy Friend Link
    copyFriendUrlBtn.addEventListener('click', () => {
      shareFriendUrlInput.select();
      shareFriendUrlInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(shareFriendUrlInput.value).then(() => {
        showToast('📋 Friend Link copied! (Edit option is hidden)');
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
