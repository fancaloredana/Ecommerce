export const navbar = () => {
    document.querySelector("#topnav").innerHTML = `
        <a id="logo" href="index.html">
            <span class="Text largerFont">BookHub</span>
        </a>
        <div id="searchForm" class="flexWrapCenter">
            <input type="text" placeholder="Search..." id="search" />
            <a class="searchBtn" href="search.html">
                <i class="fas fa-search centerAbs"></i>
            </a>
        </div>
        <div>
            <a class="btn" href="cart.html">
                <span class="btnItems"></span>
                <i class="fas fa-basket-shopping marginRight positionRelative"></i> Cart
            </a>
            <a class="btn" href="admin.html">
                <i class="fas fa-lock marginRight"></i>Admin
            </a>
        </div>`
    
    // Event listeners for search bar
    const searchInput = document.querySelector("#search");
    const searchBtn = document.querySelector(".searchBtn");
    searchBtn.addEventListener("click", () => {
        searchBtn.href = `search.html?q=${searchInput.value}`;
    })
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    })
}

export const basketItems = () => {
    const btnItems = document.querySelector(".btnItems");
    btnItems.classList.remove("displayNone");
    let items = 0;
    if (localStorage.getItem('basket') != null) {
        let basket = JSON.parse(localStorage.getItem('basket'));
        basket.forEach(book => items += book.items);
    }
    if (items === 0) btnItems.classList.add("displayNone");
    else btnItems.textContent = items;
}