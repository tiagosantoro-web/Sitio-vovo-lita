'use strict';

/* ======================================== CONFIGURAÇÃO - INÍCIO ========================================
   PERSONALIZE AQUI: telefone com país e DDD, somente números. Todos os botões usam esta constante.
====================================================================================================== */
const WHATSAPP_NUMBER = '5511967231749';
const WHATSAPP_MESSAGE = 'Olá! Vi o site do sítio e gostaria de consultar disponibilidade e valores.';
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Rua Guilhermina Coelho, 460, Miraflor, Itapevi, SP');
const INSTAGRAM_URL = ''; // Cole o endereço HTTPS do perfil oficial quando estiver disponível.

// FOTOS: para adicionar/remover fotos, duplique/exclua objetos. As 5 primeiras aparecem na página; a primeira fica em destaque.
// "category" define o filtro. Os filtros da página usam: Área externa, Piscina, Quartos, Churrasqueira, Área de lazer e Vista aérea.
const GALERIA = [
  { src: 'assets/images/piscina-vista-jardim.jpg', category: 'Piscina', title: 'Um mergulho na tranquilidade', alt: 'Piscina vista do jardim, com área coberta ao fundo' },
  { src: 'assets/images/portao-entrada.jpg', category: 'Área externa', title: 'Bem-vindo ao Vovó Lita', alt: 'Portão de entrada do sítio com a placa' },
  { src: 'assets/images/salao-jogos-sinuca.jpg', category: 'Área de lazer', title: 'Partidas sem pressa', alt: 'Salão de jogos com mesas de sinuca' },
  { src: 'assets/images/churrasqueira.jpg', category: 'Churrasqueira', title: 'Sabores e boas conversas', alt: 'Churrasqueira de tijolos com pia e bancada' },
  { src: 'assets/images/quarto-01-beliches.jpg', category: 'Quartos', title: 'Para recarregar as energias', alt: 'Quarto com beliches' },
  { src: 'assets/images/piscina-palmeiras.jpg', category: 'Piscina', title: 'Dias de sol', alt: 'Piscina cercada por palmeiras' },
  { src: 'assets/images/piscina-ceu-azul.jpg', category: 'Piscina', title: 'Céu azul e água fresca', alt: 'Piscina com céu azul e árvores ao redor' },
  { src: 'assets/images/piscina-borda.jpg', category: 'Piscina', title: 'Um respiro na água', alt: 'Borda da piscina com vegetação ao fundo' },
  { src: 'assets/images/casa-lateral.jpg', category: 'Área externa', title: 'A casa do sítio', alt: 'Lateral da casa principal' },
  { src: 'assets/images/corredor-externo.jpg', category: 'Área externa', title: 'Caminhos ao ar livre', alt: 'Corredor externo ao lado da casa' },
  { src: 'assets/images/varanda-gramado.jpg', category: 'Área externa', title: 'Varanda de frente para o verde', alt: 'Varanda ao lado do gramado' },
  { src: 'assets/images/caminho-quiosque.jpg', category: 'Área externa', title: 'Espaço para aproveitar', alt: 'Caminho até o quiosque' },
  { src: 'assets/images/area-churrasqueira.jpg', category: 'Churrasqueira', title: 'Tudo pronto para o churrasco', alt: 'Área da churrasqueira com freezer' },
  { src: 'assets/images/cozinha.jpg', category: 'Cozinha', title: 'Sabores de casa', alt: 'Cozinha com fogão, geladeira e mesa' },
  { src: 'assets/images/salao-jogos.jpg', category: 'Área de lazer', title: 'Sinuca e pebolim', alt: 'Salão de jogos com sinuca e pebolim' },
  { src: 'assets/images/campo-futebol.jpg', category: 'Área de lazer', title: 'Bola rolando no gramado', alt: 'Campo de futebol gramado' },
  { src: 'assets/images/parquinho.jpg', category: 'Área de lazer', title: 'Diversão para as crianças', alt: 'Parquinho com gangorra' },
  { src: 'assets/images/parquinho-balanco.jpg', category: 'Área de lazer', title: 'Balanço à sombra', alt: 'Parquinho com balanço sob as árvores' },
  { src: 'assets/images/salao-amplo.jpg', category: 'Salão', title: 'Tempo para estar junto', alt: 'Salão amplo e iluminado' },
  { src: 'assets/images/salao-iluminado.jpg', category: 'Salão', title: 'Onde a conversa acontece', alt: 'Salão com luz natural' },
  { src: 'assets/images/quarto-02.jpg', category: 'Quartos', title: 'Seu cantinho de descanso', alt: 'Quarto com beliche e cama de casal' },
  { src: 'assets/images/quarto-03.jpg', category: 'Quartos', title: 'Uma boa noite começa aqui', alt: 'Quarto com beliches' },
  { src: 'assets/images/area-verde-casa.jpg', category: 'Área verde', title: 'Natureza por todos os lados', alt: 'Gramado e árvores ao lado da casa' },
  { src: 'assets/images/jardim-piscina.jpg', category: 'Área verde', title: 'Respire fundo', alt: 'Jardim com caminho de pedras até a piscina' },
  { src: 'assets/images/vista-do-alto-campo.jpg', category: 'Vista do local', title: 'Um horizonte de calma', alt: 'Vista do alto do gramado e do campo' },
  { src: 'assets/images/drone-01.jpg', category: 'Vista aérea', title: 'O sítio visto do alto', alt: 'Vista aérea do sítio inteiro: gramado, piscina, casa e mata ao redor' },
  { src: 'assets/images/drone-02.jpg', category: 'Vista aérea', title: 'Cercado de verde', alt: 'Vista aérea da casa, do quiosque e do gramado' },
  { src: 'assets/images/drone-03.jpg', category: 'Vista aérea', title: 'Piscina e jardim', alt: 'Vista do alto da piscina entre palmeiras' }
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
      img.src = photo.src; img.alt = photo.alt; img.loading = 'lazy'; img.decoding = 'async'; img.width = 720; img.height = 1280;
      const label = document.createElement('span'); label.textContent = photo.title;
      button.append(img, label); fragment.append(button);
    });
    galleryGrid.replaceChildren(fragment);
    $('#sv-gallery-count').textContent = photos.length;
    $('#sv-gallery-status').textContent = photos.length + (photos.length === 1 ? ' foto' : ' fotos') + ' do sítio · toque para ampliar';
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
