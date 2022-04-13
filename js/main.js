
const createElement = function(elName, className, textContent) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;

    if (textContent) {
        createdElement.textContent = textContent;
    }

    return createdElement
}

const addZero = function(number) {
    return number < 10 ? "0" + number : number
}
const showDate = function(dateString) {
    const date = new Date(dateString);
  
    return `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
}


const renderProduct = function(addedproduct) {

    const { id, title, img, price, model, addedDate, benefits } = addedproduct;
    

    const productItem = createElement("li", "col-4");
    const card = createElement("div", "card");
    const productImg = createElement("img", "card-img-top");
    productImg.src = addedproduct.img
    const cardBody = createElement("div", "card-body");
    const cardTitle = createElement("h3", "card-title", addedproduct.title);
    const currentPrice = createElement("p", "card-text fw-bold");
    const mark = createElement("mark", "", addedproduct.price);
    const lastPrice = createElement("p", "card-text");
    const delPrice = createElement("s", "", addedproduct.lastPrice);
    const productModel = createElement("p", "badge bg-success", addedproduct.model);
    const addDate = createElement("p","card-text", showDate(addedproduct.addedDate));

    const btnDiv = createElement("div", "position-absolute top-0 end-0 d-flex");
    const btn = createElement("button", "btn rounded-0 btn-secondary");
    const btnI = createElement("i", "fa-solid fa-pen");
    const btnSec = createElement("button", "btn rounded-0 btn-danger");
    const btnSecI = createElement("i", "fa-solid fa-trash");


    const benefList = createElement("ul", "d-flex flex-wrap list-unstyled");

    for (let j = 0; j < addedproduct.benefits.length; j++) {
         const benefit = addedproduct.benefits[j];

         const benefItem = createElement("li", "badge bg-primary me-1 mb-1", benefit);

        benefList.append(benefItem);
    }

    wrapper.append(productList);
    productList.append(productItem);
    productItem.append(card);
    card.append(productImg);
    card.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(currentPrice);
    currentPrice.append(mark);
    cardBody.append(lastPrice);
    lastPrice.append(delPrice);
    cardBody.append(productModel);
    cardBody.append(addDate);
    cardBody.append(benefList);
    cardBody.append(btnDiv);
    btnDiv.append(btn);
    btnDiv.append(btnSec);
    btn.append(btnI);
    btnSec.append(btnSecI);


    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#edit-product-modal");
    btn.setAttribute("data-addedproduct", id);
    btnI.style.pointerEvents = "none";
    btnSecI.style.pointerEvents = "none";
    btnSec.setAttribute("data-addedproduct", id);

    return productItem;
}

const selectInput = document.querySelector("#product-manufacturer");
for (let k = 0; k < manufacturers.length; k++) {
    const selectOption = createElement("option", "", manufacturers[k].name);
    selectOption.id = manufacturers[k].id;

    selectInput.append(selectOption);
}


const wrapper = document.querySelector(".col-9")
const productList = createElement("ul", "row list-unstyled g-3");


for (let i = 0; i < products.length; i++) {
    const currentProduct = products[i];

    const prodItem = renderProduct(currentProduct);
    

    productList.append(prodItem);
    
}



const benef = document.querySelector("#benefits");
const benefArray = [];
benef.addEventListener("input", function() {
    const benefVaue = benef.value;

    const benefSplitet = benefVaue.split(";");

    if (benefSplitet.length == 2) {
        benefArray.push(benefSplitet[0]);

        benef.value = "";
        const benefWrapper = document.querySelector(".benifits-wrapper");
        benefWrapper.textContent = "";
        for (let a = 0; a < benefArray.length; a++) {
            const benefItem = createElement("li", "me-1 mb-1");
            const benefBtn = createElement("button", "btn btn-sm badge rounded-pill btn-danger", benefArray[a]);
            benefWrapper.append(benefItem);
            benefItem.append(benefBtn);
        }
    }


});



const addForm = document.querySelector("#add-form");
const addModal = new bootstrap.Modal(document.querySelector("#edit-student-modal"))

addForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    

    const titleInput = document.querySelector("#product-title");
    const priceInput = document.querySelector("#price");
    const selectInput = document.querySelector("#product-manufacturer");
    const benefitInput = document.querySelector("#benefits");

    const titleInputValue = titleInput.value;
    const priceInputValue = priceInput.value;
    const selectInputValue = selectInput.value;
    

    if (titleInputValue.trim() && priceInputValue.trim() && selectInputValue && benefArray){

        const newProduct = {
            id: Math.floor(Math.random() * 1000),
            title: titleInputValue,
            price: priceInputValue,
            model: selectInputValue,
            img: "https://picsum.photos/300/200",
            addedDate: new Date().toISOString(), 
            benefits: benefArray
        }

        products.push(newProduct);
        

        addForm.reset();
        addModal.hide();

        const productIte = renderProduct(newProduct);
        productList.append(productIte);
    }
});


 

const renderProducts = function(productsArray = products) {

    productList.innerHTML = ""; 

    productsArray.forEach(function(addedproduct) {
       const addedproductItem = renderProduct(addedproduct);
       productList.append(addedproductItem);
    })
}


const editTitle = document.querySelector("#edit-product-title");
const editPrice = document.querySelector("#edit-price");     
const editManufacturer = document.querySelector("#edit-product-manufacturer");
const editBenefits = document.querySelector("#edit-benefits");

productList.addEventListener("click", function(evt) {
    if (evt.target.matches(".btn-danger")) {
       const clickedItemId = +evt.target.dataset.addedproduct;

        const clickedItemIndex = products.findIndex(function(addedproduct) {
           return addedproduct.id === clickedItemId
       })
       
       products.splice(clickedItemIndex, 1);

       renderProducts();
    } else if (evt.target.matches(".btn-secondary")) {
        const clickedId = +evt.target.dataset.addedproduct;

        const clickedItem = products.find(function(addedproduct) {
            return addedproduct.id === clickedId
            
            
        })
        
        editTitle.value = clickedItem.title;
        editPrice.value = clickedItem.price;
        editManufacturer.value = clickedItem.model;
        editBenefits.value = clickedItem.benefits;

        editForm.setAttribute("data-editing-id", clickedItem.id)        
    }
})


const editForm = document.querySelector("#edit-form");
editForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const editId = +evt.target.dataset.editingId;

    
    const titleEditted = document.querySelector("#product-title");
    const priceEditted = document.querySelector("#price");
    const selectEditted = document.querySelector("#product-manufacturer");
    const benefitEditted = document.querySelector("#benefits");

    const titleEdittedValue = titleEditted.value;
    const priceEdittedValue = priceEditted.value;
    const selectEdittedValue = selectEditted.value;
    

    if (titleEdittedValue.trim() && priceEdittedValue.trim() && selectEdittedValue && benefArray){

        const edittedProduct = {
            id: editId,
            title: titleEdittedValue,
            price: priceEdittedValue,
            model: selectEdittedValue,
            img: "https://picsum.photos/300/200",
            addedDate: new Date().toISOString(), 
            benefits: benefArray
        }


        const editingItemIndex = products.findIndex(function(addedproduct) {
            return addedproduct.id === editId 
        })

        products.splice(editingItemIndex, 1, edittedProduct);
        

        editForm.reset();
        
        renderProduct();
        // const productIte = renderProduct(newProduct);
        // productList.append(productIte);
    }
   
})

const filterForm = document.querySelector(".filter");

filterForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const elements = evt.target.elements;
    const fromValue = elements.from.value;

    const toValue = elements.to.value;

    const filteredProducts = products.filter(function(product) {
        return product.price >= fromValue;
    }).filter(function(product) {

        
        return !toValue ? true : product.price <= toValue;
    });

    

    renderProducts(filteredProducts);
   
})
 


