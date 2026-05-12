/* ============================================================
   ANRI COMMERCIALE — components.js
   Shared logic: header nav, mobile menu, modal, forms, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* ── Feather Icons ── */
  document.addEventListener('DOMContentLoaded', () => {
    if (window.feather) feather.replace();

    initHeader();
    initModal();
    initScrollReveal();
    initMagnetEffect();
    initForms();
    initMultiStepForm();
    initTracking();
    setFooterYear();
    initSmoothScroll();
    initSmartHeader();
    initProductFilters();
  });

  /* ── Tracking Helpers ── */
  function initTracking() {
    // Phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(el => {
      el.addEventListener('click', () => {
        if (window.trackEvent) window.trackEvent('click_phone', { phone: el.getAttribute('href') });
      });
    });

    // Email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
      el.addEventListener('click', () => {
        if (window.trackEvent) window.trackEvent('click_email', { email: el.getAttribute('href') });
      });
    });

    // Catalog downloads
    document.querySelectorAll('.btn-catalog, [onclick*="Richiesta Catalogo"]').forEach(el => {
      el.addEventListener('click', () => {
        if (window.trackEvent) window.trackEvent('request_catalog', { location: 'Catalog Button' });
      });
    });

    // CTA clicks
    document.querySelectorAll('.btn-primary').forEach(el => {
      el.addEventListener('click', () => {
        const text = el.textContent.trim();
        if (window.trackEvent) window.trackEvent('click_cta', { cta_text: text });
      });
    });
  }

  /* ── Footer Year ── */
  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Sticky Header ── */
  function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('primary-nav');
    if (hamburger && nav) {
      hamburger.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.classList.toggle('active', open);
      });

      // Mobile dropdowns
      document.querySelectorAll('.nav-item.has-dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', e => {
          if (window.innerWidth < 1024) {
            e.preventDefault();
            link.closest('.nav-item').classList.toggle('open');
          }
        });
      });

      // Mobile sub-dropdowns
      document.querySelectorAll('.has-sub-dropdown > a').forEach(link => {
        link.addEventListener('click', e => {
          if (window.innerWidth < 1024) {
            e.preventDefault();
            link.closest('.has-sub-dropdown').classList.toggle('open');
          }
        });
      });

      // Close on outside click
      document.addEventListener('click', e => {
        if (!header.contains(e.target)) {
          nav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('active');
        }
      });
    }
  }

  /* ── Smart Header (Hide on scroll down, show on scroll up) ── */
  function initSmartHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 80) {
        header.classList.remove('header-hidden');
        return;
      }
      if (currentScroll > lastScroll && !header.classList.contains('header-hidden')) {
        // scroll down
        header.classList.add('header-hidden');
      } else if (currentScroll < lastScroll && header.classList.contains('header-hidden')) {
        // scroll up
        header.classList.remove('header-hidden');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ── Smooth Scroll ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 84;
          window.scrollTo({ top, behavior: 'smooth' });
          document.getElementById('primary-nav')?.classList.remove('open');
        }
      });
    });
  }

  /* ── Modal ── */
  let _modalOpener = null; // element that triggered the modal, to restore focus on close

  const FOCUSABLE = [
    'a[href]', 'button:not([disabled])', 'input:not([disabled])',
    'select:not([disabled])', 'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  function getFocusable(container) {
    return Array.from(container.querySelectorAll(FOCUSABLE))
      .filter(el => !el.closest('[hidden]') && getComputedStyle(el).display !== 'none');
  }

  function trapFocus(e) {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay || overlay.hidden) return;
    const focusable = getFocusable(overlay);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  }

  window.openModal = function (context) {
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    const product = document.getElementById('modal-product');
    if (!overlay) return;

    // Remember what triggered the modal
    _modalOpener = document.activeElement;

    const ctx = context || 'Informazioni Generali';
    if (product) product.value = ctx;

    const isInfo = ctx.includes('Informazioni') || ctx.includes('Catalogo');
    if (title) title.textContent = isInfo ? 'Richiedi Informazioni' : "Richiedi un'offerta personalizzata";
    if (subtitle) {
      subtitle.textContent = (ctx !== 'Richiesta Offerta Generale' && ctx !== 'Informazioni Generali')
        ? (isInfo
          ? `Prodotto: ${ctx}. Compilate il form e vi risponderemo al più presto.`
          : `Hai selezionato: ${ctx}. Il nostro team vi risponderà entro 24 ore lavorative.`)
        : 'Compilate il modulo e vi ricontatteremo entro 24 ore lavorative.';
    }

    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', trapFocus);
    requestAnimationFrame(() => {
      overlay.classList.add('open');
      // Move focus to first focusable element inside modal
      const focusable = getFocusable(overlay);
      if (focusable.length) focusable[0].focus();
    });
  };

  window.closeModal = function () {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', trapFocus);
    setTimeout(() => {
      overlay.hidden = true;
      document.body.style.overflow = '';
      // Return focus to the element that opened the modal
      if (_modalOpener && typeof _modalOpener.focus === 'function') {
        _modalOpener.focus();
        _modalOpener = null;
      }
    }, 300);
  };

  function initModal() {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    // Ensure ARIA attributes are present
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'modal-title');
    overlay.setAttribute('aria-describedby', 'modal-subtitle');
    overlay.setAttribute('aria-hidden', 'true');

    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !overlay.hidden) closeModal();
    });

    // Form initialization is handled by initForms()
  }

  /* ── Multi-Step Form Logic ── */
  function initMultiStepForm() {
    const forms = document.querySelectorAll('.js-multi-step-form');
    forms.forEach(form => {
      let currentStep = 1;
      const steps = form.querySelectorAll('.form-step');
      const progressBar = form.querySelector('.progress-bar-fill');
      const labels = form.querySelectorAll('.step-labels span');

      const updateSteps = () => {
        steps.forEach((s, idx) => {
          s.classList.toggle('active', idx === currentStep - 1);
        });

        if (labels.length) {
          labels.forEach((l, idx) => {
            l.classList.toggle('active', idx <= currentStep - 1);
          });
        }

        if (progressBar) {
          const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
          progressBar.style.width = `${progress}%`;
        }
      };

      form.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
          const inputs = steps[currentStep - 1].querySelectorAll('input, select, textarea');
          let valid = true;
          inputs.forEach(i => {
            if (i.required && !i.value) {
              i.classList.add('error');
              i.reportValidity();
              valid = false;
            } else {
              i.classList.remove('error');
            }
          });

          if (valid && currentStep < steps.length) {
            currentStep++;
            updateSteps();
            if (window.trackEvent) window.trackEvent('form_step_next', { step: currentStep, form_id: form.id });
          }
        });
      });

      form.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
          if (currentStep > 1) {
            currentStep--;
            updateSteps();
          }
        });
      });

      // Initial state
      updateSteps();
    });
  }

  /* ── Form Submission ── */
  function initForms() {
    const forms = document.querySelectorAll('.js-contact-form, .js-multi-step-form');
    forms.forEach(form => {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Final validation check
        if (!this.checkValidity()) {
          this.reportValidity();
          return;
        }

        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Track submission start
        if (window.trackEvent) window.trackEvent('form_submission_start', { form_id: form.id || 'form' });

        // Show loading state
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
          const originalContent = btn.innerHTML;
          btn.disabled = true;
          btn.innerHTML = '<i data-feather="loader" class="spin"></i> Invio in corso...';
          if (window.feather) feather.replace();

          try {
            /* ── Google Apps Script Integration ── */
            // Replace 'YOUR_SCRIPT_ID' with the ID of your deployed GAS Web App
            const GAS_URL = 'https://script.google.com/macros/s/AKfycbw0cahHCzp3EMqC5eTT62BbGd3gvHaiHzMHtmc_L7zioUWITj_UFfet5xOTT1b9YBzW/exec';

            await fetch(GAS_URL, {
              method: 'POST',
              mode: 'no-cors', // Important: Google Apps Script needs no-cors for simple fetches
              cache: 'no-cache',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
            });

            // Success tracking
            if (window.trackEvent) {
              window.trackEvent('generate_lead', {
                form_id: form.id || 'form',
                product: data.product || 'general'
              });
            }

            // Success UI: Replace form content with thank you message
            if (form.classList.contains('modal-form')) {
              const modalBox = form.closest('.modal-box');
              if (modalBox) {
                modalBox.innerHTML = `
                  <button class="modal-close" onclick="closeModal()" aria-label="Chiudi">
                    <i data-feather="x"></i>
                  </button>
                  <div class="modal-header" style="text-align: center; padding: 4rem 2rem;">
                    <div class="modal-icon" style="margin: 0 auto 1.5rem; background: rgba(0,217,126,0.15); color: #00d97e; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                      <i data-feather="check-circle" style="width: 32px; height: 32px;"></i>
                    </div>
                    <h2 class="modal-title">Richiesta Inviata!</h2>
                    <p class="modal-subtitle">Grazie ${data.name || ''}, abbiamo ricevuto la tua richiesta.<br>Un nostro tecnico ti contatterà entro 24 ore.</p>
                    <button class="btn btn-primary" onclick="closeModal()" style="margin-top: 2rem;">Chiudi</button>
                  </div>
                `;
                if (window.feather) feather.replace();
              }
            } else {
              window.location.href = 'thank-you.html';
            }
          } catch (err) {
            console.error('Submission error:', err);
            btn.disabled = false;
            btn.innerHTML = originalContent;
            if (window.feather) feather.replace();
            alert('Si è verificato un errore durante l\'invio. Riprova tra poco.');
          }
        }
      });
    });
  }

  /* ── Scroll Reveal ── */
  function initScrollReveal() {
    const els = document.querySelectorAll(
      '[data-reveal], .cat-card, .product-card, .usp-item, .pillar, .stat, .about-img'
    );
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Optionally stop observing after reveal
          // observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    els.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ── Magnet Effect ── */
  function initMagnetEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-ghost, .logo');
    if (window.innerWidth < 1024) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }


  /* ── Product Filters ── */
  function initProductFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    if (!filters.length) return;

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const products = document.querySelectorAll('.product-card');
        const filter = btn.dataset.filter;

        // Update active state
        filters.forEach(f => {
          f.classList.remove('active');
          f.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter products with animation
        products.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

})();
