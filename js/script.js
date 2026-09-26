'use strict';

/* ======================================== CONFIGURAÇÃO - INÍCIO ========================================
   PERSONALIZE AQUI: telefone com país e DDD, somente números. Todos os botões usam esta constante.
====================================================================================================== */
const WHATSAPP_NUMBER = '5511967231749';
const WHATSAPP_MESSAGE = 'Olá! Vi o site do sítio e gostaria de consultar disponibilidade e valores.';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rua Guilhermina Coelho, 460, Miraflor, Itapevi, SP');
const INSTAGRAM_URL = ''; // Cole o endereço HTTPS do perfil oficial quando estiver disponível.

// FOTOS: substitua os SVGs por fotos reais e atualize src para .jpg, .webp ou .avif e alt.
// Para adicionar/remover fotos, duplique/exclua objetos. Cada arquivo abaixo é uma ilustração provisória.
const GALERIA = [
  { src: 'assets/images/sitio-01.svg', category: 'Área externa', title: 'O lado de fora, do seu jeito', alt: 'Área externa — imagem ilustrativa' },
  { src: 'assets/images/sitio-02.svg', category: 'Piscina', title: 'Um mergulho na tranquilidade', alt: 'Piscina — imagem ilustrativa' },
  { src: 'assets/images/sitio-03.svg', category: 'Quartos', title: 'Para recarregar as energias', alt: 'Quarto — imagem ilustrativa' },
  { src: 'assets/images/sitio-04.svg', category: 'Churrasqueira', title: 'Sabores e boas conversas', alt: 'Churrasqueira — imagem ilustrativa' },
  { src: 'assets/images/sitio-05.svg', category: 'Área verde', title: 'Natureza por todos os lados', alt: 'Área verde — imagem ilustrativa' },
  { src: 'assets/images/sitio-06.svg', category: 'Área externa', title: 'Espaço para aproveitar', alt: 'Jardim — imagem ilustrativa' },
  { src: 'assets/images/sitio-07.svg', category: 'Piscina', title: 'Dias de sol', alt: 'Área da piscina — imagem ilustrativa' },
  { src: 'assets/images/sitio-08.svg', category: 'Quartos', title: 'Seu cantinho de descanso', alt: 'Acomodação — imagem ilustrativa' },
  { src: 'assets/images/sitio-09.svg', category: 'Salão', title: 'Tempo para estar junto', alt: 'Salão — imagem ilustrativa' },
  { src: 'assets/images/sitio-10.svg', category: 'Churrasqueira', title: 'A mesa está esperando', alt: 'Área gourmet — imagem ilustrativa' },
  { src: 'assets/images/sitio-11.svg', category: 'Área verde', title: 'Respire fundo', alt: 'Paisagem verde — imagem ilustrativa' },
  { src: 'assets/images/sitio-12.svg', category: 'Cozinha', title: 'Sabores de casa', alt: 'Cozinha — imagem ilustrativa' },
  { src: 'assets/images/sitio-13.svg', category: 'Banheiros', title: 'Cuidado nos detalhes', alt: 'Banheiro — imagem ilustrativa' },
  { src: 'assets/images/sitio-14.svg', category: 'Área de lazer', title: 'Dias para aproveitar', alt: 'Lazer — imagem ilustrativa' },
  { src: 'assets/images/sitio-15.svg', category: 'Vista do local', title: 'Um horizonte de calma', alt: 'Vista da paisagem — imagem ilustrativa' },
  { src: 'assets/images/sitio-16.svg', category: 'Quartos', title: 'Uma boa noite começa aqui', alt: 'Quarto adicional — imagem ilustrativa' },
  { src: 'assets/images/sitio-17.svg', category: 'Salão', title: 'Onde a conversa acontece', alt: 'Área de convivência — imagem ilustrativa' },
  { src: 'assets/images/sitio-18.svg', category: 'Área externa', title: 'Bem-vindo ao campo', alt: 'Entrada do sítio — imagem ilustrativa' },
  { src: 'assets/images/sitio-19.svg', category: 'Área de lazer', title: 'Seu ritmo, seu momento', alt: 'Área de descanso — imagem ilustrativa' },
  { src: 'assets/images/sitio-20.svg', category: 'Vista do local', title: 'Até o sol se despedir', alt: 'Entardecer no campo — imagem ilustrativa' }
];
/* ======================================== CONFIGURAÇÃO - FIM ======================================== */

// Função pura compartilhada: o teste pode conferir os links sem acessar ou enviar mensagens no WhatsApp.
function buildWhatsAppURL(context = '') {
  const number = WHATSAPP_NUMBER.replace(/\D/g, '');
  if (!/^[1-9]\d{9,14}$/.test(number)) return null;
  return 'https://wa.me/' + number + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE + (context ? '\n\n' + context : ''));
}

document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  /* ======================================== MODAIS / CONTATO - INÍCIO ======================================== */
  const infoDialog = $('#sv-info-dialog');
  const lightbox = $('#sv-lightbox');
  const modalTriggers = new WeakMap();
  function openDialog(dialog) {
    modalTriggers.set(dialog, document.activeElement);
    dialog.showModal();
    document.body.classList.add('sv-modal-open');
  }
  function showInfo(title, message) {
    $('#sv-info-title').textContent = title;
    $('#sv-info-text').textContent = message;
    openDialog(infoDialog);
  }
  [infoDialog, lightbox].forEach((dialog) => {
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('sv-modal-open');
      modalTriggers.get(dialog)?.focus({ preventScroll: true });
    });
    let backdropPointerDown = false;
    const outside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.addEventListener('pointerdown', (event) => { backdropPointerDown = outside(event); });
    dialog.addEventListener('click', (event) => { if (backdropPointerDown && outside(event)) dialog.close(); });
  });
  $('#sv-close-info').addEventListener('click', () => infoDialog.close());
  $('#sv-dismiss-info').addEventListener('click', () => infoDialog.close());

  // TODOS os botões de orçamento e o formulário passam por esta mesma função.
  function openWhatsApp(context = '') {
    const url = buildWhatsAppURL(context);
    if (!url) {
      showInfo('Vamos conversar em breve.', 'O contato está temporariamente indisponível. Nenhuma solicitação foi enviada.');
      return;
    }
    window.location.assign(url); // Abre a conversa; cabe ao visitante enviar a mensagem.
  }
  $$('[data-whatsapp]').forEach((button) => button.addEventListener('click', () => openWhatsApp(button.dataset.context || '')));
  const digits = WHATSAPP_NUMBER.replace(/\D/g, '');
  const formattedNumber = digits.replace(/^55(\d{2})(\d{5})(\d{4})$/, '+55 ($1) $2-$3');
  $$('[data-whatsapp-display]').forEach((element) => { element.textContent = formattedNumber; });
  // Mantém também o schema sincronizado com a única constante de configuração do telefone.
  const schema = $('script[type="application/ld+json"]');
  if (schema) {
    const data = JSON.parse(schema.textContent);
    data.telephone = '+' + digits;
    schema.textContent = JSON.stringify(data);
  }
  function openConfiguredLink(url, title, message) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') throw new Error('Use HTTPS.');
      window.open(parsed.href, '_blank', 'noopener,noreferrer');
    } catch { showInfo(title, message); }
  }
  $('#sv-location-button').addEventListener('click', () => openConfiguredLink(MAPS_URL, 'Consulte o caminho.', 'Peça as orientações de acesso pelo WhatsApp.'));
  $('#sv-instagram-button').addEventListener('click', () => showInstagram());
  function showInstagram() {
    openConfiguredLink(INSTAGRAM_URL, 'Logo, novas histórias.', 'O perfil oficial do sítio será disponibilizado em breve. Enquanto isso, fale com a gente pelo WhatsApp e conheça mais sobre o espaço.');
  }
  /* ======================================== MODAIS / CONTATO - FIM ======================================== */

  /* ======================================== HEADER - INÍCIO ======================================== */
  const menuButton = $('.sv-menu-toggle');
  const menu = $('#sv-menu');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  $$('#sv-menu a, #sv-menu button').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', (event) => { if (!event.target.closest('.sv-header')) setMenu(false); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { setMenu(false); menuButton.focus(); }
  });
  window.matchMedia('(min-width: 981px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$('.sv-nav-links a').forEach((link) => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    $$('.sv-nav-links a').forEach((link) => { const section = $(link.hash); if (section) sectionObserver.observe(section); });
  }
  /* ======================================== HEADER - FIM ======================================== */

  /* ======================================== GALERIA / LIGHTBOX - INÍCIO ======================================== */
  let activeCategory = 'Todas';
  let lightboxPhotos = [...GALERIA];
  let photoIndex = 0;
  const categorySelect = $('#sv-lightbox-category');
  const galleryGrid = $('#sv-gallery-grid');
  const lightboxImage = $('#sv-lightbox-image');
  [...new Set(GALERIA.map((photo) => photo.category))].forEach((category) => {
    const option = document.createElement('option');
    option.value = category; option.textContent = category; categorySelect.append(option);
  });
  function photosFor(category) { return category === 'Todas' ? [...GALERIA] : GALERIA.filter((photo) => photo.category === category); }
  function renderGallery(category) {
    activeCategory = category;
    const photos = photosFor(category);
    galleryGrid.classList.toggle('is-filtered', category !== 'Todas');
    const fragment = document.createDocumentFragment();
    photos.slice(0, 5).forEach((photo) => {
      const button = document.createElement('button');
      button.className = 'sv-gallery-photo'; button.type = 'button';
      button.dataset.photo = String(GALERIA.indexOf(photo)); button.setAttribute('aria-label', 'Ampliar: ' + photo.alt);
      const img = document.createElement('img');
      img.src = photo.src; img.alt = photo.alt; img.loading = 'lazy'; img.width = 900; img.height = 700;
      const label = document.createElement('span'); label.textContent = photo.title;
      button.append(img, label); fragment.append(button);
    });
    galleryGrid.replaceChildren(fragment);
    $('#sv-gallery-count').textContent = photos.length;
    $('#sv-gallery-status').textContent = photos.length + ' imagens ilustrativas · fotografias reais em breve';
    $$('.sv-filter').forEach((button) => {
      const active = button.dataset.filter === category;
      button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active));
    });
  }
  function showPhoto() {
    if (!lightboxPhotos.length) return;
    const photo = lightboxPhotos[photoIndex];
    lightboxImage.src = photo.src; lightboxImage.alt = photo.alt;
    $('#sv-lightbox-caption').textContent = photo.category + ' · ' + photo.title;
    $('#sv-lightbox-counter').textContent = (photoIndex + 1) + ' / ' + lightboxPhotos.length;
    $('#sv-prev-photo').disabled = lightboxPhotos.length < 2; $('#sv-next-photo').disabled = lightboxPhotos.length < 2;
  }
  function openGallery(globalIndex) {
    lightboxPhotos = photosFor(activeCategory);
    if (!lightboxPhotos.length) return;
    categorySelect.value = activeCategory;
    photoIndex = Math.max(0, lightboxPhotos.indexOf(GALERIA[globalIndex]));
    showPhoto(); openDialog(lightbox);
  }
  function stepPhoto(direction) {
    if (!lightboxPhotos.length) return;
    photoIndex = (photoIndex + direction + lightboxPhotos.length) % lightboxPhotos.length; showPhoto();
  }
  $$('.sv-filter').forEach((button) => button.addEventListener('click', () => renderGallery(button.dataset.filter)));
  galleryGrid.addEventListener('click', (event) => { const button = event.target.closest('[data-photo]'); if (button) openGallery(Number(button.dataset.photo)); });
  $('#sv-open-gallery').addEventListener('click', () => openGallery(GALERIA.indexOf(photosFor(activeCategory)[0])));
  $('#sv-close-lightbox').addEventListener('click', () => lightbox.close());
  $('#sv-prev-photo').addEventListener('click', () => stepPhoto(-1));
  $('#sv-next-photo').addEventListener('click', () => stepPhoto(1));
  categorySelect.addEventListener('change', () => { lightboxPhotos = photosFor(categorySelect.value); photoIndex = 0; showPhoto(); });
  lightbox.addEventListener('keydown', (event) => {
    if (event.target.tagName === 'SELECT') return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); stepPhoto(event.key === 'ArrowRight' ? 1 : -1); }
  });
  let touchStart = null;
  lightboxImage.addEventListener('touchstart', (event) => { touchStart = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY }; }, { passive: true });
  lightboxImage.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) stepPhoto(dx < 0 ? 1 : -1);
    touchStart = null;
  }, { passive: true });
  renderGallery('Todas');
  /* ======================================== GALERIA / LIGHTBOX - FIM ======================================== */

  /* ======================================== FORMULÁRIO DE CONSULTA - INÍCIO ======================================== */
  const checkin = $('#sv-checkin'); const checkout = $('#sv-checkout'); const guests = $('#sv-guests'); const bookingError = $('#sv-booking-error');
  function localDateString(date) { return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'); }
  function nextDate(value) { const [year, month, day] = value.split('-').map(Number); return localDateString(new Date(year, month - 1, day + 1, 12)); }
  function updateDates() {
    checkin.min = localDateString(new Date()); checkout.min = nextDate(checkin.value || checkin.min);
    checkout.setCustomValidity(checkin.value && checkout.value && checkout.value <= checkin.value ? 'Escolha uma saída posterior à entrada.' : '');
    bookingError.hidden = true;
  }
  updateDates();
  [checkin, checkout, guests].forEach((input) => input.addEventListener('input', updateDates));
  checkin.addEventListener('focus', updateDates);
  $('#sv-booking-form').addEventListener('submit', (event) => {
    event.preventDefault(); updateDates();
    if (!event.currentTarget.reportValidity()) return;
    if (checkin.value < localDateString(new Date()) || checkout.value <= checkin.value || !Number.isInteger(Number(guests.value)) || Number(guests.value) < 1) {
      bookingError.textContent = 'Confira as datas e informe uma quantidade válida de hóspedes.'; bookingError.hidden = false; return;
    }
    const formatDate = (value) => value.split('-').reverse().join('/');
    openWhatsApp('Entrada: ' + formatDate(checkin.value) + '\nSaída: ' + formatDate(checkout.value) + '\nHóspedes: ' + guests.value + '\nGostaria de confirmar a disponibilidade para esse período.');
  });
  /* ======================================== FORMULÁRIO DE CONSULTA - FIM ======================================== */

  /* ======================================== FAQ / ANIMAÇÕES / FOOTER - INÍCIO ======================================== */
  // Fallback para navegadores que não agrupam details com name.
  $$('.sv-faq-item').forEach((item) => item.addEventListener('toggle', () => { if (item.open) $$('.sv-faq-item').forEach((other) => { if (other !== item) other.open = false; }); }));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -15px 0px' });
    $$('.sv-reveal').forEach((element) => { element.classList.add('is-ready'); observer.observe(element); });
  }
  $('#sv-year').textContent = new Date().getFullYear();
  /* ======================================== FAQ / ANIMAÇÕES / FOOTER - FIM ======================================== */
});
