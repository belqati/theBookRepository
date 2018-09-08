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
// addBook
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

// EVENT LISTENERS
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

  // validate form input
  if(author === '' || year === '' || title === '' || isbn === ''){
    // show error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
  // add book to list
  ui.addBookToList(book);

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
  // delete book
  ui.deleteBook(e.target);
  // show success alert
  ui.showAlert('Book removed!', 'success');

  // Brad included the following line--it is unnecessary
  // e.preventDefault();
});