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

let indexInData;

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
    const item = data.find((items, index) => {
        if (items.id === id) {
            indexInData = index;
        }
        return items;
    });

    if (item) {
        editElement.innerHTML = `
                <div>
                    <input type="text" id="editablenaam" class="product-name" value="${item.productname}">
                </div>
                 <input type="text" id="editableprijs" class="product-prijs" value="${item.prijs}">
                <div>
                </div>
                <button onclick="saveText()">Save</button>
                `;
    }
}

async function saveText() {
    const inputElement = document.getElementById("editabletext");
    let data = await Product();
    data[indexInData].productname = inputElement.value;
    localStorage.setItem("data", JSON.stringify(data));
    console.log("Product name updated:", data[indexInData].productname);
}

setItem();