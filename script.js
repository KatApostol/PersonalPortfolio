const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();


// Achievement image lightbox
const achievementLightbox = document.getElementById('achievementLightbox');
const achievementLightboxImage = achievementLightbox?.querySelector('.achievement-lightbox-image');
const achievementLightboxCaption = achievementLightbox?.querySelector('.achievement-lightbox-caption');
const achievementLightboxClose = achievementLightbox?.querySelector('.achievement-lightbox-close');
let lastLightboxTrigger = null;

function openAchievementLightbox(button) {
  if (!achievementLightbox || !achievementLightboxImage) return;

  const src = button.dataset.lightboxSrc;
  const caption = button.dataset.lightboxCaption || '';
  const sourceImage = button.querySelector('img');

  achievementLightboxImage.src = src;
  achievementLightboxImage.alt = sourceImage?.alt || caption || 'Achievement image';
  achievementLightboxCaption.textContent = caption;

  lastLightboxTrigger = button;

  achievementLightbox.classList.add('is-open');
  achievementLightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');

  achievementLightboxClose?.focus();
}

function closeAchievementLightbox() {
  if (!achievementLightbox) return;

  achievementLightbox.classList.remove('is-open');
  achievementLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');

  if (achievementLightboxImage) {
    achievementLightboxImage.src = '';
  }

  lastLightboxTrigger?.focus();
}

document.querySelectorAll('.achievement-image-button').forEach(button => {
  button.addEventListener('click', () => openAchievementLightbox(button));
});

achievementLightboxClose?.addEventListener('click', closeAchievementLightbox);

achievementLightbox?.addEventListener('click', event => {
  if (event.target === achievementLightbox) {
    closeAchievementLightbox();
  }
});

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    achievementLightbox?.classList.contains('is-open')
  ) {
    closeAchievementLightbox();
  }
});
