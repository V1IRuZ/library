const container = document.querySelector(".container");
const addBook = document.querySelector(".add-book");
const closeModal = document.querySelector(".close");
const modal = document.querySelector("#modal");
const submitBtn = document.querySelector("#submit");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookYear = document.querySelector("#book-year");
const allCards = document.querySelectorAll(".card");

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
    container.innerHTML = "";
    myLibrary.forEach(book => {
        const card = document.createElement("div");
        const name = document.createElement("h1");
        const author = document.createElement("h2");
        const para = document.createElement("p");
        card.classList.add("card");
        name.textContent = `${book.title}`;
        author.textContent = `${book.author}`;
        para.classList.add("text");
        para.textContent = `The book was published in ${book.year}.`;

        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(para);
        container.appendChild(card);
    })
};

// displayBooks();

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
})

closeModal.addEventListener("click", () => {
    modal.close();
})
// - Form/dialog/modal esim sivupalkissa
// - Katso miten submit painike toimii, event.preventDefault();

// Lisää painike jokaisen kirjan, kohdalle millä sen voi poistaa kirjastosta.

// Lisää painike jokaisen kirjan näyttöön muuttaaksesi sen lukutilaa
//  - Luo Book prototype funktio, joka vaihtelee esiintymän lukutilaa.
