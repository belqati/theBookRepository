// CONVERT A ES5 APP.JS TO ES6

// Classes for constructors
class Book {
  constructor(author, year, title, isbn) {
    this.author = author;
    this.year = year;
    this.title = title;
    this.isbn =isbn;
  }
  // could add methods here, but then repeated in the prototype for every instance of a new Book; better to place them in a different class, then access them via that class's prototype
}

// UI class holds all methods in prototype; no new UI with args thus no constructor needed
class UI {
  // addBook
  addBookToList(book){
    const list = document.querySelector('#book-list');
    // create row element
    const row = document.createElement('tr');
    // insert data columns for row
    row.innerHTML = `
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td><em>${book.title}</em></td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete"><i class="fas fa-times"></i></a></td>
    `;
    // append row/data to book list
    list.appendChild(row);
  }

  // show alert
  showAlert(message, className){
    // create div element
    const div = document.createElement('div');
    // add two classes to div: 'alert' for timeOut of alert, 'className' for style (via CSS)
    div.className = `alert ${className}`;
    // append message argument to div as text
    div.appendChild(document.createTextNode(message));
    // get parent element
    const container = document.querySelector('.container');
    // get form element
    const form = document.querySelector('#book-form');
    // insert div alert within container, immediately before the form
    container.insertBefore(div, form);

    // remove div after 3s
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 2000);
  }

  // delete a book from UI
  deleteBook(target){
    // grab all parents of anchor around fa-times
    if(target.parentElement.classList.contains('delete')){
      target.parentElement.parentElement.parentElement.remove();
    }
  }

  // clear all inputs
  clearFields(){
    document.querySelector('#author').value = '';
    document.querySelector('#year').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Local Storage class for localStorage methods
class Store {
  // set all methods as static, making them immediately available--thus no need to instantiate Store

  // first get books from localStorage
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      // create empty array for adding first book
      books = [];
    } else {
      // convert localStorage string to array
      books = JSON.parse(localStorage.getItem('books'));
    }
    // return empty/parsed array
    return books;
  }

  // then display books in UI
  static displayBooks(){
    // get books method for grabbing array
    const books = Store.getBooks();
    // loop through array
    books.forEach(function(book){
      // instantiate UI to use its methods
      const ui = new UI;
      // add book to UI
      ui.addBookToList(book);
    });
  }

  // add book to local storage
  static addBook(book){
    // get books method for grabbing array
    const books = Store.getBooks();
    // add new book object to that array
    books.push(book);
    // set updated array into localStorage as a string
    localStorage.setItem('books', JSON.stringify(books))
  }

  // remove book from local storage
  static removeBook(isbn){
    // get books method for grabbing array
    const books = Store.getBooks();

    // loop through and update
    books.forEach(function(book, index){
      // if isbn matches, splice book obj out of array
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });

    // update localStorage via stringify
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// EVENT LISTENERS
// DOM Load Event for populating UI with books from localStorage
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event listener to form for add book
document.querySelector('#book-form').addEventListener('submit', function(e){
  // get form values
  const author = document.querySelector('#author').value,
        year = document.querySelector('#year').value,
        title = document.querySelector('#title').value,
        isbn = document.querySelector('#isbn').value;

  // instantiate book object
  const book = new Book(author, year, title, isbn);

  // instantiate UI class for accessing its methods via its prototype
  const ui = new UI();
  // console illustrates classes as syntactic sugar, showing that UI methods are stored in its prototype, just as in our ES5 version 
  // console.log(ui);

  // validate form input
  if(author === '' || year === '' || title === '' || isbn === ''){
    // show error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
  // add book to list
  ui.addBookToList(book);

  // add book to localStorage via static method in Store; no need to instantiate
  Store.addBook(book);

  // show success alert
  ui.showAlert('Book successfully added!', 'success');

  // clear fields
  ui.clearFields();
  }

  // prevent default form behavior
  e.preventDefault();
});

// Event listener for book delete
document.querySelector('#book-list').addEventListener('click', function(e){
  // instantiate UI class for method access
  const ui = new UI();
  // delete book
  ui.deleteBook(e.target);
  // remove from localStorage
  Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
  // show show alert
  ui.showAlert('Book removed!', 'success');
  // prevent default behavior for delete (else UI jumps to top of page on delete via href="#")
  e.preventDefault();
});