// sorting by author, date, title

// Book Constructor
function Book(author, year, title, isbn){
  this.author = author;
  this.year = year;
  this.title = title;
  this.isbn = isbn;
}

// UI Constructor
function UI(){}

// UI PROTOTYPES
// addBook
UI.prototype.addBookToList = function(book){
  const list = document.querySelector('#book-list');
  // create tr element
  const row = document.createElement('tr');
  // insert columns
  row.innerHTML = `
    <td>${book.author}</td>
    <td>${book.year}</td>
    <td><em>${book.title}</em></td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete"><i class="deleteItem fas fa-times"></i></a></td>
  `;
  list.appendChild(row);
}

// delete book
UI.prototype.deleteBook = function(target){
  // parent = tr
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove();

  // parent = td
  } else if(target.classList.contains('deleteItem')){
    target.parentElement.parentElement.parentElement.remove();
  }
}

// clear inputs
UI.prototype.clearFields = function(){
  document.querySelector('#author').value = '';
  document.querySelector('#year').value = '';
  document.querySelector('#title').value = '';
  document.querySelector('#isbn').value = '';
}

// show alert
UI.prototype.showAlert = function(message, className){
  // create div
  const div = document.createElement('div');
  // add class
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  // get form
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);

  // timeout after 3s
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// EVENT LISTENERS
// Event listener for add book
document.querySelector('#book-form').addEventListener('submit', function(e){
  // get form values
  const author = document.querySelector('#author').value,
        year = document.querySelector('#year').value,
        title = document.querySelector('#title').value,
        isbn = document.querySelector('#isbn').value;

  // instantiate book object
  const book = new Book(author, year, title, isbn);

  // instantiate UI
  const ui = new UI();

  // validate input
  if(author === '' || year === '' || title === '' || isbn === ''){
    // error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
  // add book to list
  ui.addBookToList(book);

  // success alert
  ui.showAlert('Book successfully added!', 'success');

  // clear fields
  ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.querySelector('#book-list').addEventListener('click', function(e){
  // instantiate UI
  const ui = new UI();
  // delete book
  ui.deleteBook(e.target);
  // show alert
  ui.showAlert('Book removed!', 'success');

  e.preventDefault();
});