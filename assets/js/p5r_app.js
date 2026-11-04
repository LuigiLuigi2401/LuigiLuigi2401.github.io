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

  // Attach hover click sound to all buttons
  document.querySelectorAll('button, .p5-btn-action, a').forEach((el) => {
    el.addEventListener('mouseenter', () => soundEngine.playClick());
  });

})();
