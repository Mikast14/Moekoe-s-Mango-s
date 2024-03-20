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
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const cart = document.createElement('div'); // Create a new cart/container for each order
        cart.classList.add('cart'); // Add a class to style the cart if needed
        for (let j = 0; j < order.length; j++) {
            const product = order[j];
            const listItem = document.createElement('div');
            listItem.classList.add('order');
            listItem.innerHTML = `
            <div>
                <img class="product-image" src="${product.image}" alt="Foto of ${product.productname}">
            </div>
            <div>
                <h2 class="product-name">${product.productname}</h2>
            </div>
            <h2 class="product-name">${product.prijs},-</h2>
            <div>
            </div>
            `;
            cart.appendChild(listItem);
        }
        alles.appendChild(cart); // Append the cart containing products to the main container
    }
}
krijgproducten();


