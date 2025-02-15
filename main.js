const container = document.querySelector(".container");
const addBook = document.querySelector(".add-book");
const closeModal = document.querySelector(".close");
const modal = document.querySelector("#modal");
const submitBtn = document.querySelector("#submit");
const allCards = document.querySelectorAll(".card");
const form  = document.querySelector("form");

// Kirjasto array
const myLibrary = [];


// Kirja Constructori
function Book(title, author, year, status) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = status;
}

// Ota parametrit, Luo kirja ja lisää se array:hyn
function addBookToLibrary(title, author, year, status) {
    const book = new Book(title, author, year, status);

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

Book.prototype.toggleStatus = function (event) {
  event.target.textContent = event.target.textContent === "Not read" ? "Read" : "Not read";
  event.target.style.backgroundColor = event.target.style.backgroundColor === "green" ? "red" : "green";
}

// Manuaalisesti lisätyt kirjat
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 1937, "Not read");
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J. K. Rownling", 1997, "Not read");
addBookToLibrary("A Tale of Two Cities", "Charles Dickens", 1859, "Not read");
addBookToLibrary("The Lion, the Witch and the Wardrobe", "C. S. Lewis", 1950, "Not read");
addBookToLibrary("Alice's Adventures in Wonderland", "Lewis Carroll", 1865, "Not read");
addBookToLibrary("A Game of Thrones", "George R. R. Martin", 1996, "Not read");

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
        });

        const readStatusBtn = document.createElement("button");
        readStatusBtn.classList.add("read-status");
        readStatusBtn.textContent = `${book.status}`;

        if (book.status === "Not read") {
          readStatusBtn.style.backgroundColor = "red";
        } else if (book.status === "Read") {
          readStatusBtn.style.backgroundColor = "green";
        }
        

        readStatusBtn.addEventListener("click", book.toggleStatus);

         
        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(para);
        card.appendChild(removeBtn);
        card.appendChild(readStatusBtn);
        container.appendChild(card);
    }
  };


// Open Modal
addBook.addEventListener("click", () => {
    modal.showModal();
})

// Submit form
form.addEventListener("submit", (e) => {
    const newBookTitle = document.querySelector("#book-title").value;
    const newBookAuthor = document.querySelector("#book-author").value;
    const newBookYear = document.querySelector("#book-year").value;
    const newBookStatus = document.querySelector('input[name="status"]:checked').value;

    addBookToLibrary(newBookTitle, newBookAuthor, newBookYear, newBookStatus);
    displayBooks();
    modal.close();
    form.reset();

    e.preventDefault();
})

// close modal 
closeModal.addEventListener("click", () => {
    modal.close();
    form.reset();
})


// - Form/dialog/modal esim sivupalkissa
// - Katso miten submit painike toimii, event.preventDefault();

// Lisää painike jokaisen kirjan, kohdalle millä sen voi poistaa kirjastosta.

// Lisää painike jokaisen kirjan näyttöön muuttaaksesi sen lukutilaa
//  - Luo Book prototype funktio, joka vaihtelee esiintymän lukutilaa.


// ENSI KERRALLA

// KEKSI MITEN SAADA ARVO EI CHECKATUSTA LAATIKOSTA
// MITEN LIITTÄÄ ARVO FUNKTIOON