class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info = () => {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}.`;
  };
  toggle = () => {
    this.read = !this.read;
  };
}
const action = (() => {
  const tableContainer = document.querySelector(".library > table > tbody");
  const myLibrary = [];

  const addBookToLibrary = (title, author, pages, read) => {
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
  };

  const removeBook = (id) => {
    myLibrary.forEach((book, index) => {
      if (book.id === id) {
        myLibrary.splice(index, 1);
      }
    });
  };

  const displayBooks = () => {
    tableContainer.innerHTML = "";

    myLibrary.forEach((book) => {
      tableContainer.innerHTML += `
        <tr data-index-number="${book.id}">
            <th>${book.title}</th>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${
              book.read ? '<span class="mdi mdi-check-bold"></span>' : "x"
            }</td>
            <td><button class="delete">Delete</button><button class="edit">Edit</button></td>
        </tr>
        `;
    });
  };

  const editReadState = (ind) => {
    myLibrary.forEach((book) => {
      if (book.id === ind) book.toggle();
    });
  };

  return { addBookToLibrary, removeBook, displayBooks, editReadState };
})();

(() => {
  const { addBookToLibrary, removeBook, displayBooks, editReadState } = action;
  const bookButton = document.getElementById("new-book-button");
  const closeModal = document.getElementById("close");
  const addBook = document.getElementById("add-book");
  const tbodyContainer = document.querySelector("tbody");

  bookButton.addEventListener("click", () => {
    document.getElementById("modal").showModal();
  });

  addBook.addEventListener("click", () => {
    const title = document.querySelector("#title:valid")?.value;
    const author = document.querySelector("#author:valid")?.value;
    const pages = document.querySelector("#pages:valid")?.value;

    const read = document.querySelector(
      "form > fieldset input[type='radio']:checked"
    ).value;

    if (title && read && author && pages) {
      addBookToLibrary(title, author, pages, read === "yes");
      displayBooks();
    }
  });

  tbodyContainer.addEventListener("click", (event) => {
    if (event.target.className === "delete") {
      const id = event.target.parentElement.parentElement.dataset.indexNumber;
      removeBook(id);
      displayBooks();
    }
    if (event.target.className === "edit") {
      const id = event.target.parentElement.parentElement.dataset.indexNumber;
      editReadState(id);
      displayBooks();
    }
  });

  closeModal.addEventListener("click", () => {
    document.getElementById("modal").close();
  });

  //adding 4 books manually
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
  addBookToLibrary("1984", "George Orwell", 328, false);
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
  addBookToLibrary("The Alchemist", "Paulo Coelho", 197, false);
  displayBooks();
})();
