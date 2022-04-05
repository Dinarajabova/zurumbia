
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


const wrapper = document.querySelector(".col-9")
const productList = createElement("ul", "row list-unstyled g-3");


for (let i = 0; i < products.length; i++) {
    const currentProduct = products[i];

    const productItem = createElement("li", "col-4");
    const card = createElement("div", "card");
    const productImg = createElement("img", "card-img-top");
    productImg.src = currentProduct.img
    const cardBody = createElement("div", "card-body");
    const cardTitle = createElement("h3", "card-title", currentProduct.title);
    const currentPrice = createElement("p", "card-text fw-bold");
    const mark = createElement("mark", "", currentProduct.price);
    const lastPrice = createElement("p", "card-text");
    const delPrice = createElement("s", "", currentProduct.lastPrice);
    const productModel = createElement("p", "badge bg-success", currentProduct.model);
    const addDate = createElement("p","card-text", showDate(currentProduct.addedDate));

    const btnDiv = createElement("div", "position-absolute top-0 end-0 d-flex");
    const btn = createElement("button", "btn rounded-0 btn-secondary");
    const btnI = createElement("i", "fa-solid fa-pen");
    const btnSec = createElement("button", "btn rounded-0 btn-danger");
    const btnSecI = createElement("i", "fa-solid fa-trash");


    const benefList = createElement("ul", "d-flex flex-wrap list-unstyled");


    for (let j = 0; j < currentProduct.benefits.length; j++) {
        const benefit = currentProduct.benefits[j];

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
}




const addForm = document.querySelector("#add-form");
const addModal = new bootstrap.Modal(document.querySelector("#edit-student-modal"))

addForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    

    const titleInput = document.querySelector("#product-title");
    const priceInput = document.querySelector("#price");
    const selectInput = document.querySelector("#product-manufacturers");
    const benefitInput = document.querySelector("#benefits");

    const titleInputValue = titleInput.value;
    const priceInputValue = priceInput.value;
    const selectInputValue = selectInput.value;
    const benefitInputValue = benefitInput.value;

    if (titleInputValue.trim() && priceInputValue.trim() && selectInputValue.trim() && benefitInputValue.trim()){

        const newProduct = {
            id: Math.floor(Math.random() * 1000),
            title: titleInputValue,
            price: priceInputValue,
            model: selectInputValue,
            addedDate: new Date().toISOString(), 
        }

        products.push(newProduct);

        addForm.reset();
        addModal.hide();
    }
});