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

// UI prototypes
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
    <td><a href="#" class="delete"><i class="fas fa-times"></i></a></td>
  `;
  list.appendChild(row);
}

UI.prototype.clearFields = function(){
  document.querySelector('#author').value = '';
  document.querySelector('#year').value = '';
  document.querySelector('#title').value = '';
  document.querySelector('#isbn').value = '';
}

// Event Listeners
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

  // add book to list
  ui.addBookToList(book);

  // clear fields
  ui.clearFields();

  e.preventDefault();
});