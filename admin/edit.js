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

    let indexInData = data.findIndex(item => item.id === id);

    if (indexInData !== -1) {
        const item = data[indexInData];
        editElement.innerHTML = `
        <div class="product-edit">
                 <div class="textarea">
                    <div class="textbenaming">
                    Naam: <input type="text" id="editableProductName" class="product-name" value="${item.productname}">
                </div>
                <div class="textbenaming">
                    Prijs: <input type="number" id="editablePrijs" class="product-name" value="${item.prijs}">
                </div>
                </div>
                <div class="textarea">
                    <div class="textbenaming">
                    Hoeveelheid:
                     <textarea type="text" id="editableProductamount" class="product-name">${item.hoeveelheid}
                     </textarea>
                    </div>
                    <div class="textbenaming">
                    Info:  <textarea type="text" id="editableProductinfo" class="product-name">${item.productinfo}
                </textarea>
                </div>
                    </div>
                <div>
                    Foto: <input type="text" id="editableImage" class="product-image" value="${item.image}">
                    <button onclick="refreshImage()">Refresh Image</button>
                </div>
                <div>
                    <img src="${item.image}" alt="Product Image" id="productImage">
                    </div>
                    <button class="buttonsave" onclick="saveText()">Save</button>
                    </div>
                `;
    } else {
        editElement.innerHTML = "Product not found";
    }
}

async function saveText() {
    const productNameInput = document.getElementById("editableProductName");
    const prijsInput = document.getElementById("editablePrijs");
    const productAmountInput = document.getElementById("editableProductamount");
    const productinfoInput = document.getElementById("editableProductinfo");
    const imageInput = document.getElementById("editableImage");
    const productImage = document.getElementById("productImage");
    let data = await Product();
    console.log(prijsInput);
    const urlParams = new URLSearchParams(window.location.search);
    let id = Number(urlParams.get('id'));
    let indexInData = data.findIndex(item => item.id === id);

    if (indexInData !== -1) {
        data[indexInData].productname = productNameInput.value;

        data[indexInData].prijs = parseFloat(prijsInput.value);
        data[indexInData].hoeveelheid = productAmountInput.value;
        data[indexInData].productinfo = productinfoInput.value;
        data[indexInData].image = imageInput.value;
        localStorage.setItem("data", JSON.stringify(data));
        productImage.src = data[indexInData].image;
        window.location.reload();
    } else {
        console.error("Product not found");
    }
}
async function refreshImage() {
    const imageInput = document.getElementById("editableImage");
    const productImage = document.getElementById("productImage");
    productImage.src = imageInput.value;
}
setItem();
