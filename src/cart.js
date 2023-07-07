import { navbar, basketItems } from "./navbar.js";
navbar();
basketItems();

let basket = JSON.parse(localStorage.getItem('basket'));

const createTable = () => {
	document.querySelector(".tableDiv").innerHTML = `
		<table class="table">
			<tr>
				<th>Image</th>
				<th>Title</th>
				<th>Author</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Remove</th>
			</tr>
		</table>`;
	const table = document.querySelector('.table');
	basket.forEach(book => {
		let row = table.insertRow(1);
		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);
		let cell5 = row.insertCell(4);
		let cell6 = row.insertCell(5);
		cell1.innerHTML = `<a href="details.html?id=${book.id}"><img class="cartImg" src=${book.book_image}></img></a>`;
		cell2.innerHTML = `<a href="details.html?id=${book.id}">${book.title.toLowerCase()}</a>`;
		cell3.textContent = book.author;
		cell4.innerHTML = `<p class="greenText">$${book.price}</p>`;
		cell5.innerHTML = `<i class="fa-solid fa-minus redText marginRight" data-product-id=${book.id}>
			</i>${book.items}<i class="fa-solid fa-plus greenText marginLeftS" data-product-id=${book.id}></i>`;
		cell6.innerHTML = `<a class="redBtn remove" data-product-id=${book.id}>
			<i class="fa-solid fa-trash marginRight remove" data-product-id=${book.id}></i>Remove</a>`;
	});
};

const buyTable = () => {
	let total = 0;
	let items = 0;
	if (basket) {
		basket.forEach((book) => {
			total += Number(book.price) * book.items;
			items += book.items;
		});
	}
	document.querySelector(".items").textContent = items;
	document.querySelector(".totalPrice").textContent = `$${total}`;
};

window.addEventListener('DOMContentLoaded', () => {
	buyTable();
	if (basket.length > 0) createTable();
});

document.querySelector('.tableDiv').addEventListener('click', (e) => {
	const bookInBasket = basket.find((book) =>
			book.id === e.target.getAttribute('data-product-id'));

	if (e.target.classList.contains('fa-plus')) {
		if (bookInBasket.items < bookInBasket.stock) {
			bookInBasket.items++;
			createTable();
			buyTable();
		} else if (bookInBasket.items === Number(bookInBasket.stock)) {
			alert("Stock limit reached.");
		}
	} else if (e.target.classList.contains('fa-minus')) {
		if (bookInBasket.items > 1) {
			bookInBasket.items--;
			createTable();
			buyTable();
		}
	} else if (e.target.classList.contains('remove')) {
		basket = basket.filter((product) => product.id != bookInBasket.id);
		createTable();
		if (basket.length === 0) document.querySelector('.table').remove();
		buyTable();
	}
	localStorage.setItem('basket', JSON.stringify(basket));
	basketItems();
});

document.querySelector('.buyBooksBtn').addEventListener('click', () => {
	alert("You cannot buy things here, this is just a personal project.");
});