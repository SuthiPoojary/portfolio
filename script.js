/**
 * suthi - Personal Developer Portfolio
 * Vanilla JavaScript Implementation
 * Handles: Theme Toggle, Mobile Drawer, ScrollSpy, Project Filtering,
 * Interactive CV Visualizer, Resume Modal & Print, Clipboard Copy & Toast Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Theme Toggle)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');
  const htmlElement = document.documentElement;

  // Retrieve stored theme or default to 'light' per design requirements
  const storedTheme = localStorage.getItem('suthi-portfolio-theme') || 'light';
  applyTheme(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('suthi-portfolio-theme', theme);

    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to light mode');
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    }
  }

  // --------------------------------------------------------------------------
  // 2. Navigation Header & ScrollSpy
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('#desktop-nav .nav-link');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      siteHeader.style.boxShadow = 'var(--shadow-md)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }

    // ScrollSpy active link update
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const mobileBrandLink = document.getElementById('mobile-brand-link');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', openDrawer);
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeDrawer();
      }
    });
  }

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  if (mobileBrandLink) {
    mobileBrandLink.addEventListener('click', closeDrawer);
  }

  // --------------------------------------------------------------------------
  // 4. Project Category Filtering Tabs
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Update active tab button
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all') {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else if (filterValue === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. Interactive Object Detection Scene Visualizer (Simulation in Modal)
  // --------------------------------------------------------------------------
  const cvScenes = {
    desk: {
      items: '3 Objects',
      conf: '94.6%',
      speed: '32 ms',
      render: `
        <!-- Desk Surface -->
        <rect x="0" y="190" width="500" height="50" fill="#141820" />
        <rect x="60" y="30" width="220" height="140" rx="4" fill="#1b202a" stroke="#2d3748" stroke-width="2"/>
        <rect x="75" y="45" width="190" height="110" fill="#0b0e14"/>
        <line x1="170" y1="170" x2="170" y2="195" stroke="#4a5568" stroke-width="5"/>
        <rect x="140" y="195" width="60" height="5" fill="#4a5568"/>
        <!-- Laptop Box -->
        <g>
          <rect x="55" y="25" width="230" height="150" rx="4" fill="rgba(249, 115, 22, 0.1)" stroke="#f97316" stroke-width="2.5" stroke-dasharray="6 3"/>
          <rect x="55" y="5" width="115" height="20" rx="3" fill="#ea580c"/>
          <text x="62" y="19" font-family="monospace" font-size="11" font-weight="bold" fill="#fff">laptop: 98%</text>
        </g>
        <!-- Coffee Cup -->
        <rect x="330" y="120" width="45" height="60" rx="4" fill="#2d3748"/>
        <g>
          <rect x="325" y="112" width="60" height="75" rx="4" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" stroke-width="2"/>
          <rect x="325" y="94" width="110" height="18" rx="3" fill="#0284c7"/>
          <text x="331" y="107" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">coffee_cup: 95%</text>
        </g>
        <!-- Notebook -->
        <polygon points="260,195 340,175 380,210 300,230" fill="#222834" stroke="#3b4252" stroke-width="1.5"/>
        <g>
          <rect x="255" y="170" width="130" height="65" rx="4" fill="rgba(74, 222, 128, 0.1)" stroke="#4ade80" stroke-width="2"/>
          <rect x="255" y="152" width="105" height="18" rx="3" fill="#16a34a"/>
          <text x="261" y="165" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">notebook: 91%</text>
        </g>
      `
    },
    office: {
      items: '4 Objects',
      conf: '96.2%',
      speed: '28 ms',
      render: `
        <!-- Office Meeting Room Scene -->
        <rect x="0" y="170" width="500" height="70" fill="#1a1e28"/>
        <!-- Chair 1 -->
        <rect x="40" y="70" width="70" height="120" rx="6" fill="#2d3748"/>
        <g>
          <rect x="35" y="65" width="80" height="130" rx="4" fill="rgba(168, 85, 247, 0.1)" stroke="#a855f7" stroke-width="2"/>
          <rect x="35" y="47" width="95" height="18" rx="3" fill="#9333ea"/>
          <text x="41" y="60" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">chair: 97%</text>
        </g>
        <!-- Person / Developer Silhouette -->
        <circle cx="250" cy="70" r="25" fill="#334155"/>
        <path d="M 210 170 C 210 115, 290 115, 290 170 Z" fill="#334155"/>
        <g>
          <rect x="200" y="40" width="100" height="145" rx="4" fill="rgba(249, 115, 22, 0.12)" stroke="#f97316" stroke-width="2.5"/>
          <rect x="200" y="22" width="105" height="18" rx="3" fill="#ea580c"/>
          <text x="206" y="35" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">person: 98%</text>
        </g>
        <!-- Whiteboard -->
        <rect x="360" y="30" width="120" height="100" rx="3" fill="#242c3d" stroke="#3b4252" stroke-width="2"/>
        <g>
          <rect x="355" y="25" width="130" height="110" rx="4" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" stroke-width="2"/>
          <rect x="355" y="7" width="120" height="18" rx="3" fill="#0284c7"/>
          <text x="361" y="20" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">whiteboard: 94%</text>
        </g>
        <!-- Plant -->
        <circle cx="430" cy="180" r="16" fill="#15803d"/>
        <g>
          <rect x="410" y="160" width="45" height="50" rx="4" fill="rgba(74, 222, 128, 0.1)" stroke="#4ade80" stroke-width="2"/>
          <rect x="410" y="142" width="90" height="18" rx="3" fill="#16a34a"/>
          <text x="416" y="155" font-family="monospace" font-size="9" font-weight="bold" fill="#fff">plant: 96%</text>
        </g>
      `
    },
    library: {
      items: '3 Objects',
      conf: '93.8%',
      speed: '34 ms',
      render: `
        <!-- Study Scene -->
        <rect x="0" y="180" width="500" height="60" fill="#141822"/>
        <!-- Book Stack -->
        <rect x="70" y="130" width="110" height="20" rx="2" fill="#b91c1c"/>
        <rect x="75" y="110" width="100" height="20" rx="2" fill="#1d4ed8"/>
        <rect x="80" y="90" width="90" height="20" rx="2" fill="#047857"/>
        <g>
          <rect x="65" y="85" width="120" height="75" rx="4" fill="rgba(249, 115, 22, 0.1)" stroke="#f97316" stroke-width="2"/>
          <rect x="65" y="67" width="100" height="18" rx="3" fill="#ea580c"/>
          <text x="71" y="80" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">books: 95%</text>
        </g>
        <!-- Backpack -->
        <path d="M 230 190 L 230 110 C 230 85, 290 85, 290 110 L 290 190 Z" fill="#374151"/>
        <g>
          <rect x="220" y="80" width="80" height="115" rx="4" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" stroke-width="2"/>
          <rect x="220" y="62" width="115" height="18" rx="3" fill="#0284c7"/>
          <text x="226" y="75" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">backpack: 93%</text>
        </g>
        <!-- Desk Lamp -->
        <line x1="390" y1="180" x2="390" y2="80" stroke="#64748b" stroke-width="4"/>
        <polygon points="360,80 420,80 405,50 375,50" fill="#f59e0b"/>
        <g>
          <rect x="355" y="45" width="70" height="140" rx="4" fill="rgba(234, 179, 8, 0.1)" stroke="#eab308" stroke-width="2"/>
          <rect x="355" y="27" width="95" height="18" rx="3" fill="#ca8a04"/>
          <text x="361" y="40" font-family="monospace" font-size="10" font-weight="bold" fill="#fff">lamp: 94%</text>
        </g>
      `
    }
  };

  const dynamicSvg = document.getElementById('cv-dynamic-svg');
  const statCount = document.getElementById('stat-count');
  const statConf = document.getElementById('stat-conf');
  const statSpeed = document.getElementById('stat-speed');
  const sceneButtons = document.querySelectorAll('.cv-scene-btn');

  function renderCvScene(sceneName) {
    const scene = cvScenes[sceneName] || cvScenes.desk;
    if (dynamicSvg) dynamicSvg.innerHTML = scene.render;
    if (statCount) statCount.textContent = scene.items;
    if (statConf) statConf.textContent = scene.conf;
    if (statSpeed) statSpeed.textContent = scene.speed;
  }

  // Initialize initial scene
  renderCvScene('desk');

  sceneButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      sceneButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const scene = btn.getAttribute('data-scene');
      renderCvScene(scene);
      showToast(`Analyzed Scene: ${scene.toUpperCase()}`);
    });
  });

  // --------------------------------------------------------------------------
  // 6. Modals Management (Project Modal & Resume Modal)
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const openProjectModalBtn = document.getElementById('btn-project-deepdive');
  const closeProjectModalBtn = document.getElementById('close-project-modal');
  const closeProjectModalBottomBtn = document.getElementById('btn-close-project-modal-bottom');

  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtn = document.getElementById('open-resume-btn');
  const heroBtnResume = document.getElementById('hero-btn-resume');
  const drawerResumeBtn = document.getElementById('drawer-resume-btn');
  const closeResumeModalBtn = document.getElementById('close-resume-modal');
  const btnPrintResume = document.getElementById('btn-print-resume');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Project Modal listeners
  if (openProjectModalBtn) {
    openProjectModalBtn.addEventListener('click', () => openModal(projectModal));
  }
  if (closeProjectModalBtn) {
    closeProjectModalBtn.addEventListener('click', () => closeModal(projectModal));
  }
  if (closeProjectModalBottomBtn) {
    closeProjectModalBottomBtn.addEventListener('click', () => closeModal(projectModal));
  }

  // Resume Modal listeners
  if (openResumeBtn) {
    openResumeBtn.addEventListener('click', () => openModal(resumeModal));
  }
  if (heroBtnResume) {
    heroBtnResume.addEventListener('click', () => openModal(resumeModal));
  }
  if (drawerResumeBtn) {
    drawerResumeBtn.addEventListener('click', () => {
      closeDrawer();
      openModal(resumeModal);
    });
  }
  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', () => closeModal(resumeModal));
  }

  // Print Resume trigger
  if (btnPrintResume) {
    btnPrintResume.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modals on clicking outside backdrop or ESC key
  window.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal(projectModal);
    if (e.target === resumeModal) closeModal(resumeModal);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(projectModal);
      closeModal(resumeModal);
      closeDrawer();
    }
  });

  // --------------------------------------------------------------------------
  // 7. Clipboard Copy Functionality with Toast
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-clipboard');
      if (textToCopy) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied to clipboard: ${textToCopy}`);
          }).catch(() => {
            fallbackCopy(textToCopy);
          });
        } else {
          fallbackCopy(textToCopy);
        }
      }
    });
  });

  function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied to clipboard: ${text}`);
  }

  // --------------------------------------------------------------------------
  // 8. Contact Form - Generates Pre-Filled Mailto
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !subject || !message) {
        showToast('Please fill out all contact fields');
        return;
      }

      const emailRecipient = 'suthipoojari@gmail.com';
      const mailtoUrl = `mailto:${emailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\n\n${message}`)}`;

      showToast('Opening default email client...');
      window.location.href = mailtoUrl;
    });
  }

  // --------------------------------------------------------------------------
  // 9. Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(message, duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => {
        if (toast.parentNode === container) {
          container.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // --------------------------------------------------------------------------
  // 10. Update Dynamic Year in Footer
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
