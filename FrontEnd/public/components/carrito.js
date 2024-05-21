export default function carrito({parent, name}) {
    const lista_items = []
    this.id = `${name.replaceAll(" ", "_")}_${Math.floor(Math.random() * 1000)}`;
    this.CarElement = document.createElement("div");
    this.CarElement.id = this.id;
    this.CarElement.className = "navbar-cart";
    this.CarElement.innerHTML = `
        <div class="cart-items">
            <a class="main-btn">
                <i class="lni lni-cart"></i>
                <span class="total-items" id="${this.id}_total-items">0</span>
            </a>
            <!-- Shopping Item -->
            <div class="shopping-item">
                <div class="dropdown-cart-header">
                    <span id=${this.id}_title_items>0 Items</span>
                    <a href="cart.html">View Cart</a>
                </div>
                <ul class="shopping-list" id="${this.id}_list_items"></ul>
                <div class="bottom">
                    <div class="total">
                        <span>Total</span>
                        <span class="total-amount" id="${this.id}_price">$0</span>
                    </div>
                    <div class="button">
                        <a href="checkout.html" class="btn animate">Checkout</a>
                    </div>
                </div>
            </div>
        </div>`;
    const title_items = this.CarElement.querySelector(`#${this.id}_title_items`);
    const element_price = this.CarElement.querySelector(`#${this.id}_price`);
    const total_items = this.CarElement.querySelector(`#${this.id}_total-items`);
    const list_items = this.CarElement.querySelector(`#${this.id}_list_items`);
    parent.appendChild(this.CarElement); 
    this.addItem =({image, title, price, id, href})=>{
        const properties = {image, title, price, id, href};
        const element = item(properties);
        lista_items.push({element, properties});
        list_items.appendChild(element);
        total_items.innerHTML = lista_items.length;
        title_items.innerHTML = `${lista_items.length} Items`;
        
        // esto no es mio, copilot lo hizo
        element_price.innerHTML = `$${lista_items.reduce((acc, item) => acc + Number(item.properties.price), 0)}`;
        // --------------------------------
    }
    this.removeItem = (id) => {
        const index = lista_items.findIndex(item => item.properties.id === id);
        if (index !== -1) {
            list_items.removeChild(lista_items[index].element);
            lista_items.splice(index, 1);
            total_items.innerHTML = lista_items.length;
        }
    }
}

function item({image, title, price, id, href}) {
    const element = document.createElement("li");
    element.id = id;
    element.innerHTML = `
        <a class="remove" title="Remove this item">
            <i class="lni lni-close"></i>
        </a>
        <div class="cart-img-head">
            <a class="cart-img" href="${href}"> <img src="${image}" alt="#"/> </a>
        </div>
        <div class="content">
            <h4> <a href="#">${title}</a> </h4>
            <p class="quantity">1x - <span class="amount">${price}</span></p>
        </div>
    `
    return element;
}
