import { navbar, basketItems } from "./navbar.js";
navbar();
basketItems();

const searchParams = new URLSearchParams(window.location.search);
const bookId = searchParams.get('id');
let book;
let bookStock;

const showBook = async () => {
	// Show loader
	document.querySelector('.loader').style.display = 'block';
	// Fetch book
	const result = await fetch(`https://64a6862a096b3f0fcc7ff504.mockapi.io/books/${bookId}`);
	book = await result.json();
	// Update book stock
	bookStock = Number(book.stock);
	bookStockF();
	// Create Card
	document.querySelector('.bookDetails').innerHTML = createCard(book);
	// Event listener for addToBasket button
	document.querySelector('.addToBasket').addEventListener('click', addToBasket)
	// Hide loader
	document.querySelector('.loader').style.display = 'none';
	document.querySelector('.bookDetails').classList.remove("displayNone");
};

window.addEventListener('DOMContentLoaded', showBook);

const createCard = (book) => {
	return `<img class="bookImage" src='${book.book_image}' />
			<div class="marginLeft description">
				<p class="capitalize blackText"><b>Title:</b> ${book.title.toLowerCase()}</p>
				<p class="blackText"><b>Author:</b> ${book.author}</p>
				<p class="blackText"><b>Publisher:</b> ${book.publisher}</p>
				<p class="blackText"><b>ISBN-13:</b> ${book.primary_isbn13}</p>
				<p class="justify blackText"><b>Description:</b> ${book.description}</p>
				<p class="blackText"><b>Price:</b><span class="greenText"> $${book.price}</span></p>
				<hr>
				<p class="blackText"><b>In stock:</b> <span class="bookStock">${bookStock}</span></p>
				<form onsubmit="return false">
					<p class="blackText"><b>Quantity:</b> 
						<input id="input-quantity" type="number" value="1" min="1" max="${bookStock}">
					</p>
					<button class="greenBtn addToBasket" type="submit">
						<i class="fas fa-basket-shopping marginRight"></i>Add to basket
					</button>
				</form>
			</div>`;
};

const addToBasket = () => {
	const inputDetails = document.querySelector('#input-quantity');
	const inputQuantity = Number(inputDetails.value);
	if (inputDetails.checkValidity()){
		let basket = [];
		// If there is no basket in local storage, add book + items to basket array
		if (localStorage.getItem('basket') === null) {
			basket.push({ ...book, items: inputQuantity});
		// Else, get the basket, turn it into an array of objects
		} else {
			basket = JSON.parse(localStorage.getItem('basket'));
			// Find the book in the basket by id
			const bookInBasket = basket.find((book) => book.id === bookId);
			// If it finds the book in the basket, update book.items by input quantity
			if (bookInBasket !== undefined) {
				bookInBasket.items += inputQuantity;
			// If it does not find the book in the basket, add book + items to basket array
			} else {
				basket.push({ ...book, items: inputQuantity});
			}
		}
		// Update book stock
		bookStock -= inputQuantity;
		document.querySelector('.bookStock').textContent = bookStock;
		inputDetails.setAttribute("max", bookStock);
		inputDetails.value = 1;
		// If there are books in the basket, put basket in local storage
		if (basket.length > 0) {
			localStorage.setItem('basket', JSON.stringify(basket));
			// Update the number of items on the basket button
			basketItems();
		}
		// Confirmation message
		document.querySelector(".confirm").style.display = "block"
		setTimeout(() => {document.querySelector(".confirm").style.display = "none"}, 1000)
	// If stock is empty, show alert when adding books to basket
	} else if (bookStock === 0) {
		alert("Stock limit reached.")
	};
};
// Update book stock
const bookStockF = () => {
	if (localStorage.getItem('basket') !== null) {
		const basket = JSON.parse(localStorage.getItem('basket'));
		const bookInBasket = basket.find(book => book.id === bookId);
		if (bookInBasket !== undefined) {
			bookStock = book.stock - bookInBasket.items;
		}
	}
}