let myLibrary = [];

function book(title, author, pageCount, pagesRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.pagesRead = pagesRead
}

function addBookToLibrary() {

}

let title = "Example Title"
let author = "Example Author"
let currentPage = 500;
let totalPages = 1000;

//all elements are to match the index.html
//create basic elements to call upon later
const bookElement = document.createElement("div")
bookElement.classList.add("book");
const titleElement = document.createElement("h4");
const authorElement = document.createElement("h5");
const currentPageElement = document.createElement("h5");
const incrementButton = document.createElement("button")
incrementButton.classList.add("increment");
const decrementButton = document.createElement("button")
decrementButton.classList.add("decrement");
const pageTotalElement = document.createElement("h6")
pageTotalElement.classList.add("total-pages");

//add text to elements
titleElement.textContent = title;
authorElement.textContent = author;
currentPageElement.textContent = `Page ${currentPage}`;
pageTotalElement.textContent = `of ${totalPages}`

//add text for buttons
incrementButton.innerHTML = '<p class="button-text">+</p>';
decrementButton.innerHTML = '<p class="button-text">-</p>';

//create two containers for various elements
const pageButtonElement = document.createElement("div")
pageButtonElement.classList.add("page-buttons");
const pageContainer = document.createElement("div")
pageContainer.classList.add("page");

//append buttons to container
pageButtonElement.appendChild(incrementButton);
pageButtonElement.appendChild(decrementButton);

//append current page and button container to another div
pageContainer.appendChild(currentPageElement);
pageContainer.appendChild(pageButtonElement);

//start appending to book
bookElement.appendChild(titleElement);
bookElement.appendChild(authorElement);
bookElement.appendChild(pageContainer);
bookElement.appendChild(pageTotalElement);

//create div for second half of book html
const buttonsContainer = document.createElement("div")
buttonsContainer.classList.add("book-buttons");
const deleteButton = document.createElement("button")
deleteButton.classList.add("delete-button");
const switchContainer = document.createElement("div")
switchContainer.classList.add("my-label");

//create elements for switch
const checkBox = document.createElement("input")
checkBox.setAttribute("id", "switch1");
checkBox.setAttribute("name", "switch");
checkBox.setAttribute("type", "checkbox");
const groove = document.createElement("div")
groove.classList.add("sliding-groove");
const labelElement = document.createElement("label")
labelElement.classList.add("my-label")
labelElement.setAttribute("for", "switch1");
const spanElement = document.createElement("span")
spanElement.classList.add("labels")
spanElement.setAttribute("data-on", "READ!");
spanElement.setAttribute("data-off", "");

//add text content
deleteButton.textContent = "Delete";


//begin appending to secondary container div
switchContainer.appendChild(checkBox);
switchContainer.appendChild(groove);
switchContainer.appendChild(labelElement);
switchContainer.appendChild(spanElement);

//append to button div container
buttonsContainer.appendChild(deleteButton);
buttonsContainer.appendChild(switchContainer);

//append button container to book
bookElement.appendChild(buttonsContainer);

const contentContainer = document.getElementById("append-here");
contentContainer.appendChild(bookElement);

const addButton = document.getElementById("add-button")
addButton.addEventListener("click", () => {
    contentContainer.appendChild(bookElement);
});