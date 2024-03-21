function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    if (cart.length <= 0) {
        localStorage.removeItem("cartProducts");
    }
    updateCart();
}


function updateCart() {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const cartContainer = document.getElementById('cart-container');
    let totalPrice = 0;
    cartContainer.innerHTML = '';

    totalPrice = 0;

    cartProducts.forEach(product => {
        const cartItem = document.createElement('div');
        const productPrice = parseFloat(product.prijs);
        cartItem.classList.add('geheel');

        if (!Number.isNaN(productPrice)) {
            totalPrice += productPrice;

            cartItem.innerHTML = `

                    <td><img class="product-image" src="${product.image}" alt="Foto of ${product.productname}"></td>
                        <td class="product-name"><h1>${product.productname}</h1></td>
                        <td class="product-price"><h3>${productPrice},-</h3></td>
            <td> <button class="product-button" onclick="removeFromCart(${product.id})">remove from cart</button></td>

                `;

            cartContainer.appendChild(cartItem);
        } else {
            console.error(`Invalid price for product: ${product.productname}`);
        }
    });

    const totalElement = document.getElementById('total-price');
    totalElement.textContent = `Total Price: €${totalPrice.toFixed(2)}`;

    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}



document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
    }
});
function saveOrderList(orderList) {
    let existingOrders = JSON.parse(localStorage.getItem("orderList")) || [];
    existingOrders.push(orderList);
    localStorage.setItem("orderList", JSON.stringify(existingOrders));
}



function pay() {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const orderDateTime = new Date().toISOString();
    const order = {
        products: cartProducts,
        dateTime: orderDateTime,
    };
    saveOrder(order);
    clearLocalStorage();
}

function saveOrder(order) {
    let existingOrders = JSON.parse(localStorage.getItem("orderList")) || [];
    existingOrders.push(order);
    localStorage.setItem("orderList", JSON.stringify(existingOrders));
}


function clearLocalStorage() {
    localStorage.removeItem("cartProducts");
    window.location.href = '../order-confirmation/order-confirmation.html';
}
updateCart();