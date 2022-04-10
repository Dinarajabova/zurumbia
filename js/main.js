
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


 

const renderProducts = function() {

    productList.innerHTML = "";  
       products.forEach(function(addedproduct) {
           const productItem = renderProduct(addedproduct);
           productList.append(productItem);
       })
}

productList.addEventListener("click", function(evt) {
    if (evt.target.matches(".btn-danger")) {
       const clickedItemId = +evt.target.dataset.addedproduct;

        const clickedItemIndex = products.findIndex(function(addedproduct) {
           return addedproduct.id === clickedItemId
       })
       
       products.splice(clickedItemIndex, 1);

       renderProducts();
    }
})