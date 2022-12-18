let myLibrary = [];

function Book(title, author, pageCount, pagesRead) {
    if (pagesRead > pageCount) {
        pagesRead = pageCount;
    }
    this.title = title;
    this.author = author;
    this.pageCount = parseInt(pageCount);
    this.pagesRead = parseInt(pagesRead);
    this.isAppended = false;
}
 
const a = document.querySelector("#title");
const b = document.querySelector("#author");
const c = document.querySelector("#page-count");
const d = document.querySelector("#pages-read");

function addBookToLibrary() {
    let newBook = new Book(a.value, b.value, c.value, d.value);
    myLibrary.push(newBook);
    a.value = "";
    b.value = "";
    c.value = "";
    d.value = "";
}

//container to append books
const contentContainer = document.getElementById("append-here");
const formData = document.getElementById("form");
const empty = document.createElement("div");
empty.classList.add("empty");
contentContainer.appendChild(empty);


function createBookElement (arrayPosition, title, author, totalPages, currentPage) { 
    let n = arrayPosition;

    //create basic elements to call upon later
    const bookElement = document.createElement("div")
    bookElement.classList.add("book");
    bookElement.setAttribute("id", `${n}`);
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
    checkBox.setAttribute("id", `switch-${n}`);
    checkBox.setAttribute("name", "switch");
    checkBox.setAttribute("type", "checkbox");
    const groove = document.createElement("div")
    groove.classList.add("sliding-groove");
    const labelElement = document.createElement("label")
    labelElement.classList.add("my-label")
    labelElement.setAttribute("for", `switch-${n}`);
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
    contentContainer.appendChild(bookElement);

    //add read class
    if (totalPages === currentPage) {
        bookElement.classList.toggle("read");
        checkBox.click();
    }

    //add event listeners to buttons
    incrementButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            if (currentPage === totalPages) {
                checkBox.click();
            }
        }
        currentPageElement.textContent = `Page ${currentPage}`;
    });

    decrementButton.addEventListener("click", () => {
        if (currentPage === totalPages && bookElement.classList.contains("read")) {
            currentPage--;
            checkBox.click();
        } else if (currentPage > 0) {
            currentPage--;
        }
        currentPageElement.textContent = `Page ${currentPage}`;
    });

    checkBox.addEventListener("click", () => {
        bookElement.classList.toggle("read");
    });
    
    deleteButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this book? This action is irreversible") == true) {
            bookElement.remove();
            delete myLibrary[n];
            //remove empty spaces from array - otherwise empty slot produces reference error when adding back to array
            let filtered = myLibrary.filter(function (el) {
                return el != null;
            });
            myLibrary = filtered;
        }
    });
}

const addButton = document.getElementById("add-button");

formData.addEventListener("submit", (event) => {
        empty.remove();
        addBookToLibrary();
        for (let i = 0; i < myLibrary.length; i++) {
            if (myLibrary[i].isAppended === false) {
                createBookElement(i, myLibrary[i].title, myLibrary[i].author, myLibrary[i].pageCount, myLibrary[i].pagesRead);
                myLibrary[i].isAppended = true;
            }
        }
        contentContainer.appendChild(empty);
        event.preventDefault();
});
