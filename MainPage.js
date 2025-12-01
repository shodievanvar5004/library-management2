// Namuna kitoblar ma'lumotlari
const books = [
  { title: "Alpomish", author: "Xalq dostoni", category: "adabiy", location: "1-qavat, A-seksiya, 3-tokcha" },
  { title: "Kimyo 10-sinf", author: "A.Qodirov", category: "ilmiy", location: "3-qavat, C-seksiya, 7-tokcha" },
  { title: "Qur'oni Karim", author: "Allohning kalomi", category: "diniy", location: "2-qavat, D-seksiya, 1-tokcha" },
  { title: "O'tgan kunlar", author: "Abdulla Qodiriy", category: "adabiy", location: "1-qavat, B-seksiya, 5-tokcha" },
  { title: "Bolajonlar uchun ertaklar", author: "Various", category: "bolalar", location: "1-qavat, E-seksiya, 2-tokcha" },
  { title: "O'zbekiston tarixi", author: "A.Asqarov", category: "tarix", location: "3-qavat, B-seksiya, 4-tokcha" },
  { title: "Mehrobdan chayon", author: "Abdulla Oripov", category: "adabiy", location: "2-qavat, A-seksiya, 8-tokcha" },
  { title: "Fizika 11-sinf", author: "M.Mirzaev", category: "ilmiy", location: "3-qavat, C-seksiya, 10-tokcha" }
];

const booksGrid = document.getElementById('booksGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const catBtns = document.querySelectorAll('.cat-btn');

function renderBooks(filter = 'all', search = '') {
  booksGrid.innerHTML = '';
  
  let filtered = books;

  if (filter !== 'all') {
    filtered = books.filter(book => book.category === filter);
  }

  if (search) {
    filtered = filtered.filter(book => 
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filtered.length === 0) {
    booksGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:white; font-size:1.2rem;">Hech narsa topilmadi 😔</p>';
    return;
  }

  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author"><strong>Muallif:</strong> ${book.author}</p>
        <span class="book-location">
          <i class="fas fa-map-marker-alt"></i> ${book.location}
        </span>
      </div>
    `;
    booksGrid.appendChild(card);
  });
}

// Ilk yuklanishda barchasini ko‘rsatish
renderBooks();

// Qidiruv
searchBtn.addEventListener('click', () => {
  renderBooks(document.querySelector('.cat-btn.active').dataset.category, searchInput.value.trim());
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    renderBooks(document.querySelector('.cat-btn.active')?.dataset.category || 'all', searchInput.value.trim());
  }
});

// Kategoriya tugmalari
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderBooks(btn.dataset.category, searchInput.value.trim());
  });
});