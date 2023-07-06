
const bookId = getBookIdFromURL();
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookDescription = document.getElementById('book-description');
const bookPrice = document.getElementById('book-price');
const bookQuantityInput = document.getElementById('book-quantity');
const addToCartButton = document.getElementById('add-to-cart-button');
const totalPrice = document.getElementById('total-price');


window.addEventListener('load', () => {
  fetchBookDetails();
  calculateTotalPrice();
});


function getBookIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}


function fetchBookDetails() {
  fetch(`https://632b4aa31090510116d6319b.mockapi.io/books/${bookId}`)
    .then((response) => response.json())
    .then((data) => {
      displayBookDetails(data);
    })
    .catch((error) => console.log(error));
}


function displayBookDetails(book) {
  const bookImage = document.getElementById('book-image');
  document.title = `BookHub - ${book.title}`;
  bookTitle.textContent = book.title;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookDescription.textContent = `Description: ${book.description}`;

  const price = parseFloat(book.price);
  if (!isNaN(price)) {
    bookPrice.textContent = `Price: $${price.toFixed(2)}`;
  } else {
    bookPrice.textContent = 'Price: N/A';
  }

  bookQuantityInput.value = '1';
  bookImage.src = book.book_image;
}


function calculateTotalPrice() {
  const quantity = parseInt(bookQuantityInput.value);
  const price = parseFloat(bookPrice.textContent.substring(1));
  const total = quantity * price;
  totalPrice.textContent = `Total Price: $${total.toFixed(2)}`;
}


function addToCart() {
  const selectedBook = {
    id: bookId,
    title: bookTitle.textContent,
    price: parseFloat(bookPrice.textContent.substring(1)),
    quantity: parseInt(bookQuantityInput.value)
  };


  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(selectedBook);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  alert('Cart updated!');
}


addToCartButton.addEventListener('click', addToCart);
