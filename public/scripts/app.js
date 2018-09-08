// sorting by author, date, title

// Book Constructor
function Book(author, year, title, isbn){
  this.author = author;
  this.year = year;
  this.title = title;
  this.isbn = isbn;
}

// UI Constructor for holding prototypes; used by each instance of new Book
function UI(){}

// UI PROTOTYPES
// add book to UI
UI.prototype.addBookToList = function(book){
  const list = document.querySelector('#book-list');
  // create row element
  const row = document.createElement('tr');
  // insert data columns for row
  row.innerHTML = `
    <td>${book.author}</td>
    <td>${book.year}</td>
    <td><em>${book.title}</em></td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete"><i class="deleteItem fas fa-times"></i></a></td>
  `;
  // append row/data to book list
  list.appendChild(row);
}

// delete a book
UI.prototype.deleteBook = function(target){
  // grab all parents of anchor around fa-times
  if(target.parentElement.classList.contains('delete')){
    target.parentElement.parentElement.parentElement.remove();
  }
}

// clear all inputs
UI.prototype.clearFields = function(){
  document.querySelector('#author').value = '';
  document.querySelector('#year').value = '';
  document.querySelector('#title').value = '';
  document.querySelector('#isbn').value = '';
}

// show alert
UI.prototype.showAlert = function(message, className){
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

  // remove div alert after 3s
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 2000);
}

// Local Storage Constructor for holding prototypes; used by each instance of new Book
function Store(){}

// get books from localStorage
Store.prototype.getBooks = function(){
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

// display books from localStorage in UI
Store.prototype.displayBooks = function(){
  // instantiate Store for prototype access
  const store = new Store();
  // get books method for grabbing array
  const books = store.getBooks();
  // loop through array
  books.forEach(function(book){
    // instantiate UI to use its methods
    const ui = new UI;
    // add book to UI
    ui.addBookToList(book);
  });
}

// add book to local storage
Store.prototype.addBook = function(book){
  // instantiate Store for prototype access
  const store = new Store();
  // get books method for grabbing array
  const books = store.getBooks();
  // add new book object to that array
  books.push(book);
  // set updated array into localStorage as a string
  localStorage.setItem('books', JSON.stringify(books))
}

// remove book from local storage
Store.prototype.removeBook = function(isbn){
  // instantiate Store for prototype access
  const store = new Store();
  // get books method for grabbing array
  const books = store.getBooks();

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

// EVENT LISTENERS
// DOM Load Event for populating UI with books from localStorage
document.addEventListener('DOMContentLoaded', function(){
  // instantiate Store for prototype access
  const store = new Store();
  // display books from local storage
  store.displayBooks();
});

// Event listener to form for add book
document.querySelector('#book-form').addEventListener('submit', function(e){
  // get form values
  const author = document.querySelector('#author').value,
        year = document.querySelector('#year').value,
        title = document.querySelector('#title').value,
        isbn = document.querySelector('#isbn').value;

  // instantiate book object
  const book = new Book(author, year, title, isbn);

  // instantiate UI for prototype access
  const ui = new UI();

  // instantiate Store for prototype access
  const store = new Store();

  // validate form input
  if(author === '' || year === '' || title === '' || isbn === ''){
    // show error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
  // add book to list
  ui.addBookToList(book);

  // add book to localStorage
  store.addBook(book);

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
  // instantiate UI for prototype access
  const ui = new UI();
  // instantiate Store for prototype access
  const store = new Store();
  // delete book from UI
  ui.deleteBook(e.target);
  // delete book from localStorage
  store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
  // show success alert
  ui.showAlert('Book removed!', 'success');

  // prevent default behavior for delete (else UI jumps to top of page on delete via href="#")
  e.preventDefault();
});