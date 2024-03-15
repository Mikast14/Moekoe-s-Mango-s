async function Product() {
    try {
        const response = await fetch('products.json');
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
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await Product();
    }
    const alles = document.getElementById('product');
    alles.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const listItem = document.createElement('div');
        listItem.classList.add('product');
        listItem.innerHTML = `
            <img class="product-image" src="${item.image}" alt="Foto of ${item.productname}">
            <h1 class="product-name">${item.productname}</h1>
            <div class="prijs-winkelwagen">
            <h3 class="product-price">${item.prijs},-</h3>
            <button class="product-button" onclick="buttonWithRedDot(${item.id})">
            <img class="buttonimg" src="../Moekoes-Mangos/img/shopping-cart-38-48.png" alt="">
            </button>
            </div>
            <h5 class="product-hoeveelheid">${item.hoeveelheid}</h5>
            <h5 class="product-info">${item.productinfo}</h5>
        `;
        alles.appendChild(listItem);
    }
}

function button(productId) {
    const selectedProduct = getProductById(productId);
    console.log(selectedProduct);

    let cartProducts = localStorage.getItem("cartProducts")
        ? JSON.parse(localStorage.getItem("cartProducts"))
        : [];

    cartProducts.push(selectedProduct);

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function buttonWithRedDot(productId) {
    const selectedProduct = getProductById(productId);
    console.log(selectedProduct);

    let cartProducts = localStorage.getItem("cartProducts")
        ? JSON.parse(localStorage.getItem("cartProducts"))
        : [];

    cartProducts.push(selectedProduct);

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

    showRedDot();
}

function getProductById(productId) {
    const data = JSON.parse(localStorage.getItem("data"));
    return data.find(product => product.id === productId);
}

function showRedDot() {
    const redDot = document.getElementById('redDot');
    redDot.style.display = 'block';
}

function hideRedDot() {
    const redDot = document.getElementById('redDot');
    redDot.style.display = 'none';
}

function updateRedDotVisibility() {
    const cartProducts = localStorage.getItem("cartProducts")
        ? JSON.parse(localStorage.getItem("cartProducts"))
        : [];

    if (cartProducts.length > 0) {
        showRedDot();
    } else {
        hideRedDot();
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        updateRedDotVisibility();
        krijgproducten();
    }
});

updateRedDotVisibility();
krijgproducten();
