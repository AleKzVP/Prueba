document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
  
    menuToggle.addEventListener('click', function () {
      navbar.classList.toggle('active');
      const ariaExpanded = navbar.classList.contains('active') ? 'true' : 'false';
      menuToggle.setAttribute('aria-expanded', ariaExpanded);
    });
  });
  
let cart = [];
let total = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById("cartItems");
    const cartCountElement = document.getElementById("cartCount");
    const cartIcon = document.getElementById("cartIcon");

    // cartItemsElement.innerHTML = "";
    cartCountElement.innerText = cart.length;

    // if (cart.length === 0) {
    //     cartItemsElement.innerHTML = "<p>No hay elementos en el carrito</p>";
    // } else {
    //     cart.forEach(item => {
    //         const itemElement = document.createElement("div");
    //         itemElement.innerText = `${item.name} - $${item.price}`;
    //         cartItemsElement.appendChild(itemElement);
    //     });
    // }

    document.getElementById("total").innerText = total;
}