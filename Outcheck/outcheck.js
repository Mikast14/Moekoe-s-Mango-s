document.addEventListener("DOMContentLoaded", function () {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const cartContainer = document.getElementById('cart-container');
    let totalPrice = 0;

    function updateCart() {
        cartContainer.innerHTML = '';

        totalPrice = 0;

        cartProducts.forEach(product => {
            const cartItem = document.createElement('div');
            const productPrice = parseFloat(product.prijs);

            if (!Number.isNaN(productPrice)) {
                totalPrice += productPrice;

                cartItem.innerHTML = `
                    <div class="alles">
                    <td><img class="product-image" src="../${product.image}" alt="Foto of ${product.productname}"></td>
                        <td class="product-name"><h1>${product.productname}</h1></td>
                        <td class="product-price"><h3>${productPrice},-</h3></td>
            <td> <button class="product-button" onclick="removeFromCart(${product.id})">remove from cart</button></td>
                    </div>
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

    window.removeFromCart = function (productId) {
        const indexToRemove = cartProducts.findIndex(product => product.id === productId);

        if (indexToRemove !== -1) {
            const removedProduct = cartProducts.splice(indexToRemove, 1)[0];

            totalPrice -= parseFloat(removedProduct.prijs);

            updateCart();
        } else {
            console.error(`Product with ID ${productId} not found in the cart.`);
        }
    };

    document.addEventListener("keydown", function (event) {
        if (event.key === "c") {
            console.log("clear");
            localStorage.clear();
        }
    });
    updateCart();
});

function clearLocalStorage() {
    localStorage.clear();
    window.location.href = '../order-confirmation/order-confirmation.html';
}