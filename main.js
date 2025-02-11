const container = document.querySelector(".container");
const addBook = document.querySelector(".add-book");
const closeModal = document.querySelector(".close");
const modal = document.querySelector("#modal");

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
    myLibrary.push(book);
    console.log(myLibrary);
}

// Manuaalisesti lisätyt kirjat
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 1937);
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J. K. Rownling", 1997);

// Funktio: Looppaa Arrayn läpi ja näytä kirjat sivulla
// Näytä taulukossa tai kortissa
function displayBooks () {
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

displayBooks();

// Painike, jolla käyttäjä voi lisätä uuden kirjan
addBook.addEventListener("click", () => {
    modal.showModal();
})

closeModal.addEventListener("click", () => {
    modal.close();
})
// - Form/dialog/modal esim sivupalkissa
// - Katso miten submit painike toimii, event.preventDefault();

// Lisää painike jokaisen kirjan, kohdalle millä sen voi poistaa kirjastosta.

// Lisää painike jokaisen kirjan näyttöön muuttaaksesi sen lukutilaa
//  - Luo Book prototype funktio, joka vaihtelee esiintymän lukutilaa.
