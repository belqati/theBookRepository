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

// UI class holds all methods in prototype; no new UI thus no constructor needed
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
      <td><a href="#" class="delete"><i class="deleteItem fas fa-times"></i></a></td>
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
    }, 3000);
  }

  // delete a book
  deleteBook(target){
    // grab all parents of anchor around fa-times
    if(target.classList.contains('delete')){
      target.parentElement.parentElement.remove();

    // grab all parents of fa-times
    } else if(target.classList.contains('deleteItem')){
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

// EVENT LISTENERS: SAME AS ES5
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
  // show show alert
  ui.showAlert('Book removed!', 'success');
});