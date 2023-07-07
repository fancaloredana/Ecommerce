import { navbar, basketItems } from "./navbar.js";
navbar();
basketItems();

const searchParams = new URLSearchParams(window.location.search);
const query = searchParams.get('q').toLowerCase();
const tableDiv = document.querySelector(".tableDiv");
const resultArray = [];

const search = async () => {
	// Show loader
	document.querySelector('.tableDiv').style.display = 'none';
	document.querySelector('.loader').style.display = 'block';

	// Show books
    const result = await fetch('https://64a6862a096b3f0fcc7ff504.mockapi.io/books');
	const books = await result.json();

    books.forEach((book) => {
        if (book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query)) {
            resultArray.push(book);
        }
    })
    createTable();

	// Hide loader
	document.querySelector('.loader').style.display = 'none';
	document.querySelector('.tableDiv').style.display = 'block';
}
search();

const createTable = () => {
	if (resultArray[0] === undefined) {
		tableDiv.innerHTML = `<h1 class="centerAbs">Nothing found</h1>`;
	} else {
		tableDiv.innerHTML = `
		<table class="table marginTop">
			<tr>
				<th>Image</th>
				<th>Title</th>
				<th>Author</th>
				<th>Price</th>
			</tr>
		</table>`;
		const tableSearch = document.querySelector('.table');
		resultArray.forEach(book => {
			let row = tableSearch.insertRow(1);
			let cell1 = row.insertCell(0);
			let cell2 = row.insertCell(1);
			let cell3 = row.insertCell(2);
			let cell4 = row.insertCell(3);
			cell1.innerHTML = `<a href="details.html?id=${book.id}"><img class="cartImg" src=${book.book_image}></img></a>`;
			cell2.textContent = book.title.toLowerCase();
			cell3.textContent = book.author;
			cell4.innerHTML = `<p class="greenText">$${book.price}</p>`;
		});
	}
};