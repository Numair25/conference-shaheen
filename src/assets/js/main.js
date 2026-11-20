/**
 * THE LEGACY CONCLAVE 2026 | SHAHEEN GROUP OF INSTITUTIONS
 * Academic Event Portal Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeaderScroll();
  initSubnavScrollspy();
  initAgendaTabs();
  initFormHandler();
  initVenueGallery();
});

/**
 * 1. Top Scroll Progress Indicator
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (windowHeight > 0) {
      const scrollPercent = (totalScroll / windowHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }
  }, { passive: true });
}

/**
 * 2. Header Box Shadow on Scroll
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 3. Sticky In-Page Subnav Scrollspy & Smooth Scrolling
 */
function initSubnavScrollspy() {
  const subnav = document.getElementById('subnav');
  if (!subnav) return;

  const links = subnav.querySelectorAll('.subnav-link');
  const sections = [];

  links.forEach(link => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const section = document.querySelector(targetId);
      if (section) {
        sections.push({ id: targetId, link, section });
      }
    }
  });

  // Smooth scroll with offset for fixed header + sticky subnav
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          const headerHeight = 72;
          const subnavHeight = 52;
          const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - (headerHeight + subnavHeight + 10);
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Update active link immediately on click
          links.forEach(l => {
            l.classList.remove('active');
            l.setAttribute('aria-selected', 'false');
          });
          link.classList.add('active');
          link.setAttribute('aria-selected', 'true');
        }
      }
    });
  });

  // Scrollspy observer
  const observerCallback = () => {
    const scrollPos = window.scrollY + 160;
    
    // Check from bottom to top
    for (let i = sections.length - 1; i >= 0; i--) {
      const { link, section } = sections[i];
      if (section.offsetTop <= scrollPos) {
        links.forEach(l => {
          l.classList.remove('active');
          l.setAttribute('aria-selected', 'false');
        });
        link.classList.add('active');
        link.setAttribute('aria-selected', 'true');
        break;
      }
    }
  };

  window.addEventListener('scroll', observerCallback, { passive: true });
}

/**
 * 4. Programme Agenda Day Filter Tabs
 */
function initAgendaTabs() {
  const tabs = document.querySelectorAll('.agenda-tab');
  const dayHeaders = document.querySelectorAll('.day-group-header');
  const sessionCards = document.querySelectorAll('.session-card');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetFilter = tab.getAttribute('data-target'); // 'all', 'day1', 'day2'

      // Update active tab state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter day group headers
      dayHeaders.forEach(header => {
        const day = header.getAttribute('data-day');
        if (targetFilter === 'all' || targetFilter === day) {
          header.style.display = 'flex';
        } else {
          header.style.display = 'none';
        }
      });

      // Filter session cards
      sessionCards.forEach(card => {
        const day = card.getAttribute('data-day');
        if (targetFilter === 'all' || targetFilter === day) {
          card.style.display = 'grid';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 5. Expression of Interest Form Submission
 */
function initFormHandler() {
  const form = document.getElementById('conclave-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('form-name');
    const delegateName = nameInput ? nameInput.value.trim() : 'Delegate';

    // Replace form content with elegant confirmation message
    form.innerHTML = `
      <div class="form-success-alert" role="alert" style="padding: 24px 18px; text-align: center;">
        <div style="font-size: 2.2rem; color: #0a3622; margin-bottom: 8px;">&#10003;</div>
        <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: #0a3622; margin-bottom: 8px;">
          Thank You, ${delegateName}!
        </h3>
        <p style="font-size: 0.9rem; color: #3c4841; line-height: 1.5; margin-bottom: 12px;">
          Your Expression of Interest for <strong>The Legacy Conclave 2026</strong> has been received by the Shaheen Organising Directorate.
        </p>
        <p style="font-size: 0.8125rem; color: #6b7770;">
          Our Conclave Secretariat will get in touch with your office with official invitation credentials and protocol details.
        </p>
      </div>
    `;
  });
}

/**
 * 6. Venue Campus Gallery Thumbnail Switcher
 */
function initVenueGallery() {
  const mainImg = document.querySelector('.venue-main-image .venue-img');
  const thumbs = document.querySelectorAll('.venue-thumb');

  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.getAttribute('src');
      if (newSrc && mainImg.getAttribute('src') !== newSrc) {
        mainImg.style.opacity = '0.6';
        setTimeout(() => {
          mainImg.setAttribute('src', newSrc);
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });
}
