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

function goToAddProductPage() {
    window.location.href = "newproduct.html";
}


function addAddProductButton() {
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('newproductbutton');
    addButton.addEventListener('click', goToAddProductPage);
    document.body.appendChild(addButton);
}


window.addEventListener('load', addAddProductButton);

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
        <div>
            <img class="product-image" src="${item.image}" alt="Foto of ${item.productname}">
        </div>
        <div>
            <h2 class="product-name">${item.productname}</h2>
        </div>
         <h2 class="product-name">${item.prijs},-</h2>
        <div>
        </div>
        <div>
        <button class="product-button" onclick="edit(${item.id})">edit</button>
        <button class="product-button" onclick="deleteItem(${item.id})">remove</button>
        </div>
        `;
        alles.appendChild(listItem);
    }
}

function getProductById(productId) {
    const data = JSON.parse(localStorage.getItem("data"));
    return data.find(product => product.id === productId);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        krijgproducten();
    }
});
function edit(id) {
    window.location.href = `edit.html?id=${id}`;
}
function deleteItem(id) {
    let data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
        console.error('No data available');
        return;
    }
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(data));
        krijgproducten();
    } else {
        console.error(`Item with ID ${id} not found`);
    }
}
krijgproducten();