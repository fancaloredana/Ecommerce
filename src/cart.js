function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
  
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
    } else {
      cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
  
        const titleElement = document.createElement('h3');
        titleElement.innerText = item.title;
  
        const quantityElement = document.createElement('p');
        quantityElement.innerText = `Quantity: ${item.quantity}`;
  
        const priceElement = document.createElement('p');
        priceElement.innerText = `Price: $${item.price}`;
  
        cartItemElement.appendChild(titleElement);
        cartItemElement.appendChild(quantityElement);
        cartItemElement.appendChild(priceElement);
  
        cartItemsContainer.appendChild(cartItemElement);
      });
    }
  }
  
  function calculateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;
  
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
  
    const totalElement = document.getElementById('cart-total');
    totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  }
  
  async function getBookDetails(bookId) {
    try {
      const response = await fetch(`https://632b4aa31090510116d6319b.mockapi.io/books/${bookId}`);
      const book = await response.json();
      return book;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function initCartPage() {
    displayCartItems();
    calculateCartTotal();
  
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsWithDetails = [];
  
    for (const item of cartItems) {
      const book = await getBookDetails(item.id);
      const cartItemWithDetails = {
        ...book,
        quantity: item.quantity
      };
      cartItemsWithDetails.push(cartItemWithDetails);
    }
  
    displayCartItems(cartItemsWithDetails);
  }
  
  initCartPage();
  
  