
document.addEventListener('DOMContentLoaded', () => {

  // MOBILE NAVIGATION
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.textContent = open ? '×' : '☰';
    });
  }

  // FOOTER YEAR
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // POSE SEARCH AND FILTER
  const search = document.getElementById('poseSearch');
  const level = document.getElementById('levelFilter');
  const cards = [...document.querySelectorAll('.pose-card')];
  const empty = document.getElementById('noPoses');

  function filterPoses() {
    if (!cards.length) return;

    const term = (search?.value || '').toLowerCase().trim();
    const lev = level?.value || 'all';

    let shown = 0;

    cards.forEach(card => {
      const match =
        card.dataset.name.toLowerCase().includes(term) &&
        (lev === 'all' || card.dataset.level === lev);

      card.hidden = !match;
      if (match) shown++;
    });

    if (empty) empty.hidden = shown !== 0;
  }

  search?.addEventListener('input', filterPoses);
  level?.addEventListener('change', filterPoses);


  // BOOKING SYSTEM
  const form = document.getElementById('bookingForm');
  const list = document.getElementById('bookingList');
  const message = document.getElementById('bookingMessage');
  const clear = document.getElementById('clearBookings');
  const dateInput = document.getElementById('bookingDate');
  const submitButton = document.getElementById('bookingSubmit');

  const STORAGE = 's43-demo-bookings-v1';

  let bookings = JSON.parse(localStorage.getItem(STORAGE) || '[]');

  // SET MINIMUM BOOKING DATE
  if (dateInput) {
    const today = new Date();
    dateInput.min = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().slice(0, 10);
  }

  // READ CLASS FROM URL
  const params = new URLSearchParams(location.search);
  const classChoice = document.getElementById('classChoice');

  if (classChoice && params.has('class')) {
    classChoice.value = params.get('class');
  }


  // SAVE BOOKINGS
  function save() {
    localStorage.setItem(STORAGE, JSON.stringify(bookings));
    render();
  }


  // DISPLAY SAVED BOOKINGS
  function render() {
    if (!list) return;

    list.replaceChildren();

    if (!bookings.length) {
      const p = document.createElement('p');
      p.className = 'empty-state';
      p.textContent = 'No saved requests yet.';
      list.append(p);
      return;
    }

    bookings.forEach(item => {
      const article = document.createElement('article');
      article.className = 'booking-item';

      const details = document.createElement('div');
      const h = document.createElement('h3');
      const p = document.createElement('p');
      const button = document.createElement('button');

      h.textContent = item.className;

      p.textContent =
        `${item.date} · ${item.time} · ${item.level} · ${item.name}`;

      button.className = 'remove-booking';
      button.type = 'button';
      button.textContent = 'Remove';

      button.addEventListener('click', () => {
        bookings = bookings.filter(b => b.id !== item.id);
        save();
      });

      details.append(h, p);
      article.append(details, button);
      list.append(article);
    });
  }


  // CLEAR SAVED BOOKINGS
  clear?.addEventListener('click', () => {

    if (bookings.length && confirm('Clear all saved booking requests?')) {

      bookings = [];
      save();

      if (message) {
        message.textContent = 'All saved requests cleared.';
      }

    }

  });


  render();

});
