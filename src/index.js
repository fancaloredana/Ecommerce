function searchBooks(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    fetch('https://632b4aa31090510116d6319b.mockapi.io/books')
        .then((response) => response.json())
        .then((data) => {
            const filteredBooks = data.filter((carte) => {
                return carte.title.toLowerCase().includes(searchInput);
            });

            if (filteredBooks.length > 0) {
                afiseazaCarti(filteredBooks);
            } else {
                const noResults = document.createElement('p');
                noResults.textContent = 'No books found.';
                searchResults.appendChild(noResults);
            }
        })
        .catch((error) => console.log(error));
}

document.getElementById('search-form').addEventListener('submit', searchBooks);

function afiseazaCarti(carti) {
    const container = document.getElementById('book-list');
    container.innerHTML = '';

    carti.forEach((carte) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = carte.book_image;
        img.alt = carte.title;
        img.classList.add('book-image');
        card.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = carte.title;
        card.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${carte.author}`;
        card.appendChild(author);

        const price = document.createElement('p');
        price.textContent = `Price: $${carte.price}`;
        card.appendChild(price);

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        detailsButton.addEventListener('click', () => {
            window.location.href = `details.html?id=${carte.id}`;
        });
        card.appendChild(detailsButton);

        container.appendChild(card);
    });
}

fetch('https://632b4aa31090510116d6319b.mockapi.io/books')
    .then((response) => response.json())
    .then((data) => afiseazaCarti(data))
    .catch((error) => console.log(error));


function redirectToDetails(id) {
	window.location.href = `details.html?id=${id}`;
  }
  
  document.getElementById('book-list').addEventListener('click', function(event) {
	if (event.target.classList.contains('details-button')) {
	  const bookId = event.target.getAttribute('data-id');
	  redirectToDetails(bookId);
	}
  });
  
  document.getElementById('cart-button').addEventListener('click', function() {
	window.location.href = 'cart.html';
  });
  
  document.getElementById('admin-button').addEventListener('click', function() {
	window.location.href = 'admin.html';
  });
  
  