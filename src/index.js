import { navbar, basketItems } from "./navbar.js";
navbar();
basketItems();

const createCard = (book) => {
	if (!book || !book.book_image) {
	  return '';
	}
    return `<div class='card centerText'>
	  <img class="bookImage" src='${book.book_image}'/>
	  <p class="capitalize blackText"><b>${book.title.toLowerCase()}</b></p>
	  <p class="blackText">by ${book.author}</p>
	  <div class="flexWrapCenter">
		<p class="greenText largeFont inline">$${book.price}</p>
		<a class="greenBtn marginLeft" href="details.html?id=${book.id}">
		  <i class="fa fa-info-circle marginRight"></i>Details
		</a>
	  </div>
	</div>`;
  };
  
  console.log(createCard());
  
  const showBooks = async () => {
	scroll(0, 0);
	// Show loader
	document.querySelector('.bookContainer').style.display = 'none';
	document.querySelector('.loader').style.display = 'block';
	// Fetch books
	const result = await fetch('https://64a6862a096b3f0fcc7ff504.mockapi.io/books');
	const books = await result.json();
	// Show books
	const bookCards = books.map((book) => createCard(book));
	const cardString = bookCards.join('');
	document.querySelector('.bookContainer').innerHTML = cardString;
	// Hide loader
	document.querySelector('.loader').style.display = 'none';
	document.querySelector('.bookContainer').style.display = 'flex';
  };
  
  window.addEventListener('DOMContentLoaded', showBooks);
  
  