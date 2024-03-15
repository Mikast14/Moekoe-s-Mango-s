async function Product() {
    try {
        const response = await fetch('../products.json');
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

async function setItem() {
    const editElement = document.getElementById("edit");
    let data;
    if (localStorage.getItem("data")) {
        console.log("Using local data");
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await Product();
    }
    const urlParams = new URLSearchParams(window.location.search);
    let id = Number(urlParams.get('id'));

    const newproduct = data.find(item => item.id === id);

    if (!newproduct) {
        editElement.innerHTML = `
                <div>
                    <input type="text" id="productname" class="product-name" placeholder="product name">
                </div>
                <div>
                    <input type="number" id="editablePrijs" class="product-name" placeholder="Price">
                </div>
                <div>
                    <input type="text" id="editableProductamount" class="product-name" placeholder="Quantity">
                </div>
                <div>
                    <input type="text" id="editableProductinfo" class="product-name" placeholder="Product Info">
                </div>
                 <div>
                <input type="text" id="editableImage" class="product-image" value="/Moekoes-Mangos/img/placeholder.png">
                    <button onclick="refreshImage()">Refresh Image</button>
                </div>
                <div>
                    <img src="/Moekoes-Mangos/img/placeholder.png" alt="Product Image" id="productImage">
                </div>
                <button onclick="addProduct()">Add Product</button>
                `;
    } else {
        editElement.innerHTML = "Product not found";
    }


    lastProductId = Math.max(...data.map(item => item.id), 0);
}

let lastProductId = 0;

async function addProduct() {
    const productname = document.getElementById("productname");
    const prijsInput = document.getElementById("editablePrijs");
    const productAmountInput = document.getElementById("editableProductamount");
    const productinfoInput = document.getElementById("editableProductinfo");
    const imageInput = document.getElementById("editableImage");

    let data = JSON.parse(localStorage.getItem("data"));

    lastProductId++;

    const newProduct = {
        id: lastProductId,
        productname: productname.value,
        prijs: parseFloat(prijsInput.value),
        hoeveelheid: productAmountInput.value,
        productinfo: productinfoInput.value,
        image: imageInput.value,
    };

    data.push(newProduct);
    localStorage.setItem("data", JSON.stringify(data));
    console.log("Product added successfully");
    window.location.href = "admin.html";
}

async function refreshImage() {
    const imageInput = document.getElementById("editableImage");
    const productImage = document.getElementById("productImage");
    productImage.src = imageInput.value;
}

setItem();
