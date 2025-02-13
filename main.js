const container = document.querySelector(".container");
const addBook = document.querySelector(".add-book");
const closeModal = document.querySelector(".close");
const modal = document.querySelector("#modal");
const submitBtn = document.querySelector("#submit");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookYear = document.querySelector("#book-year");
const allCards = document.querySelectorAll(".card");
const form  = document.querySelector("form");
const allRemoveBtns = document.querySelectorAll(".removeBook");

// Kirjasto array
const myLibrary = [];


// Kirja Constructori
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}

// Ota parametrit, Luo kirja ja lisää se array:hyn
function addBookToLibrary(title, author, year) {
    const book = new Book(title, author, year);

    // Add only uniques books
    let index = -1;
    for (let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].title === book.title) {
          index = i;
        }
      }
    
      if(index > -1) {
        myLibrary[index] = book;
      } else {
        myLibrary.push(book);
      }
}

// Manuaalisesti lisätyt kirjat
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 1937);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J. K. Rownling", 1997);
displayBooks();

// Funktio: Looppaa Arrayn läpi ja näytä kirjat sivulla
// Näytä taulukossa tai kortissa
function displayBooks () {

  // clear the list of books to display
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    for (let i = 0; i < myLibrary.length; i++) {
      let book = myLibrary[i];
      let index = i.toString();

      const card = document.createElement("div");
        card.classList.add("card");

        const name = document.createElement("h1");
        name.textContent = `${book.title}`;

        const author = document.createElement("h2");
        author.textContent = `${book.author}`;

        const para = document.createElement("p");
        para.classList.add("text");
        para.textContent = `The book was published in ${book.year}.`;

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("removeBook")
        removeBtn.setAttribute("data-index", index);
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", e => {
          let bookIndex = e.target.getAttribute("data-index");
          // remove book object from the array
          myLibrary.splice(bookIndex, 1);
          // remove clicked "card" node
          container.removeChild(e.target.closest(".card"));
        })
         
        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(para);
        card.appendChild(removeBtn);
        container.appendChild(card);
    }
  };


// Painike, jolla käyttäjä voi lisätä uuden kirjan
addBook.addEventListener("click", () => {
    modal.showModal();
})

submitBtn.addEventListener("click", (e) => {
    const newBookTitle =  bookTitle.value;
    const newBookAuthor = bookAuthor.value;
    const newBookYear = bookYear.value;
    e.preventDefault();
  
    addBookToLibrary(newBookTitle, newBookAuthor, newBookYear);
    displayBooks();
    modal.close();
    form.reset();
})

closeModal.addEventListener("click", () => {
    modal.close();
    form.reset();
})


// - Form/dialog/modal esim sivupalkissa
// - Katso miten submit painike toimii, event.preventDefault();

// Lisää painike jokaisen kirjan, kohdalle millä sen voi poistaa kirjastosta.

// Lisää painike jokaisen kirjan näyttöön muuttaaksesi sen lukutilaa
//  - Luo Book prototype funktio, joka vaihtelee esiintymän lukutilaa.


