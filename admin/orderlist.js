async function Product() {
    try {
        const response = await fetch('/Moekoes-Mangos/products.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

async function krijgproducten() {
    let orders;
    orders = JSON.parse(localStorage.getItem("orderList"));
    const alles = document.getElementById('product');
    alles.innerHTML = '';
    let orderCounter = 1;
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const orderDateTime = new Date(order.dateTime).toLocaleString();
        const cart = document.createElement('div');
        cart.classList.add('orders');
        const counterDiv = document.createElement('div');
        counterDiv.classList.add('order-counter');
        counterDiv.textContent = `Order ${orderCounter++} - ${orderDateTime}`;
        cart.appendChild(counterDiv);
        for (let j = 0; j < order.products.length; j++) {
            const product = order.products[j];
            const listItem = document.createElement('div');
            listItem.classList.add('order');
            listItem.innerHTML = `
            <div class='ordertext'>
            <div>
                <img class="product-image" src="${product.image}" alt="Foto of ${product.productname}">
            </div>
            <div>
                <h2 class="product-name">${product.productname}</h2>
            </div>
            <h2 class="product-prijs">${product.prijs},-</h2>
            <div>
            </div>
            `;
            cart.appendChild(listItem);
        }
        alles.appendChild(cart);
    }
}

krijgproducten();


