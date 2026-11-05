/* ==========================================================================
   PERSONA 5 ROYAL INTERACTIVITY ENGINE
   Developer Portfolio - Mohammad Elsherbiny
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // SOUND SYNTHESIZER (WEB AUDIO API)
  // --------------------------------------------------------------------------
  class P5SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
    }

    playClick() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    }

    playWhoosh() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    }

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }
  }

  const soundEngine = new P5SoundEngine();

  // --------------------------------------------------------------------------
  // P5 PAUSE MENU ("TAKE YOUR TIME")
  // --------------------------------------------------------------------------
  const pauseModal = document.getElementById('p5-pause-menu');
  const menuToggleBtn = document.getElementById('p5-menu-toggle');
  const pauseCloseBtn = document.getElementById('p5-pause-close');
  const pauseMenuItems = document.querySelectorAll('.p5-pause-menu-item');

  function openPauseMenu() {
    if (!pauseModal) return;
    pauseModal.classList.add('active');
    soundEngine.playWhoosh();
  }

  function closePauseMenu() {
    if (!pauseModal) return;
    pauseModal.classList.remove('active');
    soundEngine.playWhoosh();
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      if (pauseModal.classList.contains('active')) {
        closePauseMenu();
      } else {
        openPauseMenu();
      }
    });
  }

  if (pauseCloseBtn) {
    pauseCloseBtn.addEventListener('click', closePauseMenu);
  }

  pauseMenuItems.forEach((item) => {
    item.addEventListener('mouseenter', () => soundEngine.playClick());
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      closePauseMenu();
      if (targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        }
      }
    });
  });

  // ESC Key Listener for Pause Menu
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pauseModal && pauseModal.classList.contains('active')) {
        closePauseMenu();
      } else {
        openPauseMenu();
      }
    }
  });

  // --------------------------------------------------------------------------
  // JOKER CLI COMMAND PALETTE
  // --------------------------------------------------------------------------
  const cliModal = document.getElementById('joker-cli-modal');
  const cliBtn = document.getElementById('joker-cli-toggle');
  const cliInput = document.getElementById('joker-cli-input');
  const cliSuggestions = document.querySelectorAll('.joker-cli-item');

  function openCLI() {
    if (!cliModal) return;
    cliModal.classList.add('active');
    soundEngine.playWhoosh();
    if (cliInput) {
      cliInput.value = '';
      setTimeout(() => cliInput.focus(), 100);
    }
  }

  function closeCLI() {
    if (!cliModal) return;
    cliModal.classList.remove('active');
  }

  if (cliBtn) {
    cliBtn.addEventListener('click', openCLI);
  }

  // Keyboard shortcut Ctrl+K or '/'
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key.toLowerCase() === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
      e.preventDefault();
      if (cliModal && cliModal.classList.contains('active')) {
        closeCLI();
      } else {
        openCLI();
      }
    }
  });

  // Close CLI when clicking outside
  if (cliModal) {
    cliModal.addEventListener('click', (e) => {
      if (e.target === cliModal) closeCLI();
    });
  }

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    soundEngine.playClick();
    closeCLI();

    switch (cleanCmd) {
      case '/palaces':
      case '/projects':
        scrollToSection('palaces');
        break;
      case '/stats':
      case '/about':
      case '/education':
        scrollToSection('stats');
        break;
      case '/skills':
      case '/confidants':
      case '/tech':
        scrollToSection('confidants');
        break;
      case '/calling-card':
      case '/contact':
        scrollToSection('calling-card');
        break;
      case '/mute':
        const isMuted = soundEngine.toggleMute();
        alert(isMuted ? 'UI Sounds Muted' : 'UI Sounds Unmuted');
        break;
      default:
        console.log('Unknown command:', cleanCmd);
        break;
    }
  }

  if (cliInput) {
    cliInput.addEventListener('input', (e) => {
      soundEngine.playClick();
      const query = e.target.value.trim().toLowerCase();
      cliSuggestions.forEach((item) => {
        const cmd = item.getAttribute('data-cmd') || '';
        const text = item.textContent.toLowerCase();
        if (cmd.includes(query) || text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(cliInput.value);
      }
    });
  }

  cliSuggestions.forEach((item) => {
    item.addEventListener('click', () => {
      const cmd = item.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });

  function scrollToSection(id) {
    const sec = document.getElementById(id);
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --------------------------------------------------------------------------
  // LIVE CLOCK, CALENDAR & P5 DAY PHASE ENGINE
  // --------------------------------------------------------------------------
  function updateLiveClockAndCalendar() {
    const dateEl = document.getElementById('p5-live-date');
    const timeEl = document.getElementById('p5-live-time');
    const phaseEl = document.getElementById('p5-live-phase');
    if (!dateEl || !timeEl) return;

    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dayName = dayNames[now.getDay()];
    dateEl.textContent = `${month}/${day} ${dayName}`;

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = (hours % 12 || 12).toString().padStart(2, '0');
    timeEl.textContent = `${displayHours}:${minutes}:${seconds} ${ampm}`;

    if (phaseEl) {
      if (hours >= 6 && hours < 12) {
        phaseEl.textContent = 'MORNING';
      } else if (hours >= 12 && hours < 17) {
        phaseEl.textContent = 'AFTER SCHOOL';
      } else if (hours >= 17 && hours < 21) {
        phaseEl.textContent = 'EVENING';
      } else {
        phaseEl.textContent = 'NIGHT';
      }
    }
  }

  setInterval(updateLiveClockAndCalendar, 1000);
  updateLiveClockAndCalendar();

  // --------------------------------------------------------------------------
  // REAL-TIME WEATHER ENGINE (OPEN-METEO LIVE FORECAST)
  // --------------------------------------------------------------------------
  async function fetchLiveWeather() {
    const weatherEl = document.getElementById('p5-live-weather');
    const iconEl = document.getElementById('p5-weather-icon');
    if (!weatherEl) return;

    try {
      // Alexandria / E-JUST coordinates (lat: 31.2001, lon: 29.9187)
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=31.2001&longitude=29.9187&current_weather=true');
      if (!res.ok) throw new Error('Weather API unreachable');
      const data = await res.json();
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;

      let weatherDesc = 'CLEAR SUNNY';
      let iconName = 'wb_sunny';

      if (code === 0) {
        weatherDesc = 'CLEAR SUNNY';
        iconName = 'wb_sunny';
      } else if (code >= 1 && code <= 3) {
        weatherDesc = 'PARTLY CLOUDY';
        iconName = 'partly_cloudy_day';
      } else if (code >= 45 && code <= 48) {
        weatherDesc = 'METAVERSE MIST';
        iconName = 'foggy';
      } else if (code >= 51 && code <= 67) {
        weatherDesc = 'RAINING';
        iconName = 'water_drop';
      } else if (code >= 71) {
        weatherDesc = 'SNOW / FROST';
        iconName = 'ac_unit';
      } else if (code >= 80) {
        weatherDesc = 'THUNDERSTORM';
        iconName = 'thunderstorm';
      }

      weatherEl.textContent = `${temp}°C ${weatherDesc}`;
      if (iconEl) iconEl.textContent = iconName;
    } catch (err) {
      console.warn('Fallback weather active:', err);
      weatherEl.textContent = '22°C CLEAR SUNNY';
      if (iconEl) iconEl.textContent = 'wb_sunny';
    }
  }

  fetchLiveWeather();

  // --------------------------------------------------------------------------
  // PROCEDURAL 8-BIT / LO-FI CHILL BGM ENGINE (WEB AUDIO API)
  // --------------------------------------------------------------------------
  class ProceduralLoFiBGM {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.timerId = null;
      this.step = 0;
      this.tempo = 74; // Chill Lo-Fi Tempo
      this.masterGain = null;
      this.filterNode = null;

      // Note frequencies (Hz) for Lo-Fi Jazz Scale (D minor 9 / C major 7)
      this.notes = {
        'C2': 65.41, 'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00,
        'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00,
        'OFF': 0
      };

      // Spaced-out Jazz Chords (Dm9 -> G13 -> Cmaj7 -> A7alt)
      this.chords = [
        ['D3', 'F3', 'A3', 'C4', 'E4'], // Dm9
        ['G2', 'F3', 'A3', 'B3', 'E4'], // G13
        ['C3', 'E3', 'G3', 'B3', 'D4'], // Cmaj7
        ['A2', 'G3', 'C4', 'E4', 'G4']  // A7
      ];

      // Bassline (Soft Sub-Sine/Triangle wave, playing sustained root notes)
      this.bassPattern = [
        'D2', 'OFF', 'OFF', 'OFF',   'G2', 'OFF', 'OFF', 'OFF',
        'C2', 'OFF', 'OFF', 'OFF',   'A2', 'OFF', 'OFF', 'OFF'
      ];

      // Spaced-Out Lead Melody Motif (Soft Sine wave with breathing room)
      this.leadPattern = [
        'A4', 'OFF', 'C5', 'OFF',    'E5', 'OFF', 'D5', 'OFF',
        'OFF', 'C5', 'OFF', 'A4',    'G4', 'OFF', 'OFF', 'OFF',
        'F4', 'OFF', 'A4', 'OFF',    'C5', 'OFF', 'E5', 'OFF',
        'D5', 'OFF', 'C5', 'OFF',    'A4', 'OFF', 'OFF', 'OFF'
      ];

      // Lo-Fi Drum Pattern (Soft Kick, Snare Rimshot, Muted Hi-Hat)
      this.drumPattern = [
        'KICK', 'HAT', 'OFF', 'HAT',    'SNARE', 'HAT', 'OFF', 'HAT',
        'OFF', 'HAT', 'KICK', 'HAT',    'SNARE', 'HAT', 'OFF', 'HAT'
      ];
    }

    initCtx() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          
          // Master Gain & Warm Lowpass Filter for Lo-Fi Tape Saturation Feel
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

          this.filterNode = this.ctx.createBiquadFilter();
          this.filterNode.type = 'lowpass';
          this.filterNode.frequency.setValueAtTime(1600, this.ctx.currentTime);

          this.filterNode.connect(this.masterGain);
          this.masterGain.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playNote(freq, type, duration, volume = 0.04, attack = 0.02) {
      if (!this.ctx || freq <= 0) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.filterNode);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }

    playChord(chordNotes, duration = 1.6, volume = 0.025) {
      if (!this.ctx || !chordNotes) return;
      chordNotes.forEach((noteName, idx) => {
        const freq = this.notes[noteName];
        if (freq) {
          setTimeout(() => {
            this.playNote(freq, 'triangle', duration, volume, 0.1);
          }, idx * 25);
        }
      });
    }

    playDrum(type) {
      if (!this.ctx) return;
      if (type === 'KICK') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      } else if (type === 'SNARE') {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.06);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.5;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

        noise.connect(gain);
        gain.connect(this.filterNode);
        noise.start();
      } else if (type === 'HAT') {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.02);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.3;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

        noise.connect(gain);
        gain.connect(this.filterNode);
        noise.start();
      }
    }

    tick() {
      if (!this.isPlaying || !this.ctx) return;

      const step16 = this.step % 16;
      const step32 = this.step % 32;

      // 1. Play Sustained Jazz Chords every 4 beats (step 0, 4, 8, 12)
      if (step16 % 4 === 0) {
        const chordIdx = Math.floor(step16 / 4);
        this.playChord(this.chords[chordIdx], 1.6, 0.025);
      }

      // 2. Play Sub-Bass Note
      const bassNote = this.notes[this.bassPattern[step16]];
      if (bassNote) {
        this.playNote(bassNote, 'sine', 0.8, 0.06, 0.05);
      }

      // 3. Play Spaced-Out Soft Lead Melody
      const leadNote = this.notes[this.leadPattern[step32]];
      if (leadNote) {
        this.playNote(leadNote, 'sine', 0.5, 0.035, 0.04);
      }

      // 4. Play Chill Lo-Fi Drums
      const drumType = this.drumPattern[step16];
      if (drumType) {
        this.playDrum(drumType);
      }

      this.step++;
    }

    start() {
      this.initCtx();
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.step = 0;
      const intervalMs = (60 / this.tempo / 4) * 1000;
      this.timerId = setInterval(() => this.tick(), intervalMs);
    }

    stop() {
      this.isPlaying = false;
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    }

    toggle() {
      if (this.isPlaying) {
        this.stop();
        return false;
      } else {
        this.start();
        return true;
      }
    }
  }

  const loFiBGM = new ProceduralLoFiBGM();

  // --------------------------------------------------------------------------
  // SCROLL TO TOP & SOUND TOGGLE LISTENERS
  // --------------------------------------------------------------------------
  const scrollTopBtn = document.getElementById('scroll-to-top-btn');
  const soundToggleBtn = document.getElementById('p5-sound-toggle-btn');

  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        scrollTopBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      soundEngine.playWhoosh();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  let wasPlayingBeforeLossOfFocus = false;

  function handleFocusLoss() {
    if (loFiBGM.isPlaying) {
      wasPlayingBeforeLossOfFocus = true;
      loFiBGM.stop();
    }
  }

  function handleFocusGain() {
    if (wasPlayingBeforeLossOfFocus) {
      wasPlayingBeforeLossOfFocus = false;
      loFiBGM.start();
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      handleFocusLoss();
    } else {
      handleFocusGain();
    }
  });

  window.addEventListener('blur', () => {
    handleFocusLoss();
  });

  window.addEventListener('focus', () => {
    handleFocusGain();
  });

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const playing = loFiBGM.toggle();
      if (!playing) {
        wasPlayingBeforeLossOfFocus = false;
      }
      const statusText = document.getElementById('bgm-status-text');
      if (statusText) {
        statusText.textContent = playing ? 'LO-FI BGM: ON' : 'LO-FI BGM: OFF';
      }
      soundEngine.playClick();
    });
  }

  // --------------------------------------------------------------------------
  // GLOBAL SMOOTH SCROLL ENGINE FOR ALL NAV & HERO BUTTONS
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      
      const targetId = href.slice(1);
      if (targetId === '' || targetId === '#') {
        e.preventDefault();
        soundEngine.playWhoosh();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        soundEngine.playWhoosh();
        
        // Calculate offset for fixed top header (80px)
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Attach hover click sound to all buttons
  document.querySelectorAll('button, .p5-btn-action, a').forEach((el) => {
    el.addEventListener('mouseenter', () => soundEngine.playClick());
  });

})();
