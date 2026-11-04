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

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      const isMuted = soundEngine.toggleMute();
      soundToggleBtn.textContent = isMuted ? 'BGM: MUTED' : 'BGM: ON';
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
