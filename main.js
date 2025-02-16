const container = document.querySelector(".container");
const addBook = document.querySelector(".add-book");
const closeModal = document.querySelector(".close");
const modal = document.querySelector("#modal");
const submitBtn = document.querySelector("#submit");
const allCards = document.querySelectorAll(".card");
const form  = document.querySelector("form");

const myLibrary = [];

function Book(title, author, year, status, genre) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.status = status;
    this.genre = genre;
}

function addBookToLibrary(title, author, year, status, genre) {
    const book = new Book(title, author, year, status, genre);

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

Book.prototype.toggleStatus = function () {
  this.status = this.status === "Not read" ? "Read" : "Not read";
}

// Manuaalisesti lisätyt kirjat
addBookToLibrary("The Hobbit", "J.R.R Tolkien", 1937, "Not read", "Fantasy");
addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979, "Read", "Science fiction")
addBookToLibrary("Harry Potter and the Philosopher's Stone", "J. K. Rownling", 1997, "Not read", "Fantasy");
addBookToLibrary("A Tale of Two Cities", "Charles Dickens", 1859, "Not read", "Historical fiction");
addBookToLibrary("The Long Road Home", "Danielle Steel", 1998, "Not read", "Romance");
addBookToLibrary("The Lion, the Witch and the Wardrobe", "C. S. Lewis", 1950, "Not read", "Fantasy");
addBookToLibrary("The Godfather", "Mario Puzo", 1969, "Read", "Crime");
addBookToLibrary("The Shining", "Stephen King", 1977, "Read", "Horror");
addBookToLibrary("And Then There Were None", "Agatha Christie", 1939, "Not read", "Mystery");
addBookToLibrary("Alice's Adventures in Wonderland", "Lewis Carroll", 1865, "Not read", "Fantasy");
addBookToLibrary("Fahrenheit 451", "Ray Bradbury", 1953, "Not read", "Dystopian");
addBookToLibrary("A Game of Thrones", "George R. R. Martin", 1996, "Not read", "Fantasy");

displayBooks();

function displayBooks () {

  // First, clear the current display of books.
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }

    // Loop a new display of books for the user.
    for (let i = 0; i < myLibrary.length; i++) {
      let book = myLibrary[i];
      let index = i.toString();

        const card = document.createElement("div");
        card.classList.add("card");

        const name = document.createElement("h1");
        name.textContent = `${book.title}`;

        const author = document.createElement("h2");
        author.textContent = `${book.author}`;

        const genre = document.createElement("h3");
        genre.textContent = `${book.genre}`;

        const para = document.createElement("p");
        para.classList.add("text");
        para.textContent = `The book was published in ${book.year}.`;

        const cardBtns = document.createElement("div");
        cardBtns.classList.add("card-buttons");

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-book")
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
        readStatusBtn.classList.add("status-btn");
        readStatusBtn.textContent = `${book.status}`;

        // If the user wants to change the read status of the book.
        readStatusBtn.addEventListener("click", (event) => {
          book.toggleStatus();
          event.target.textContent = `${book.status}`;
          event.target.style.backgroundColor = event.target.style.backgroundColor === "rgb(105, 182, 75)" ? "rgb(39, 154, 248)" : "rgb(105, 182, 75)";
        });

        // Check what value the user entered from the form, and edit the button color accordingly.
        if (book.status === "Not read") {
          readStatusBtn.style.backgroundColor = "rgb(39, 154, 248)";
        } else if (book.status === "Read") {
          readStatusBtn.style.backgroundColor = "rgb(105, 182, 75)";
        }
         
        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(genre);
        card.appendChild(para);
        cardBtns.appendChild(readStatusBtn)
        cardBtns.appendChild(removeBtn);
        card.appendChild(cardBtns);
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
    const newBookGenre = document.querySelector("#genre-select").value;
    const newBookYear = document.querySelector("#book-year").value;
    const newBookStatus = document.querySelector('input[name="status"]:checked').value;

    addBookToLibrary(newBookTitle, newBookAuthor, newBookYear, newBookStatus, newBookGenre);
    displayBooks();
    modal.close();
    form.reset();

    e.preventDefault();
})

// close modal 
closeModal.addEventListener("click", (e) => {
    modal.close();
    form.reset();
    e.preventDefault();
})
