// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {

}

UI.prototype.addBookToList = function (book) {

    const list = document.getElementById('book-list');

    // Create tr Element
    const row = document.createElement('tr');

    // Insert Columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
    `;

    list.appendChild(row);
}

// Show ALert
UI.prototype.showAlert = function (message, className) {
    // Create Div
    const div = document.createElement('div');
    // Add Class Name
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    // Insert Alert
    container.insertBefore(div, form);

    // Set Timeout
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);

}

// Delete on Click
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }

}



// Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {

    // Get Form Values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please Fill in all the Fields', 'error');
    } else {
        // Add Book to List
        ui.addBookToList(book);

        ui.showAlert('Book Added!!', 'success');
        // Clear Fields
        ui.clearFields();
    }
    e.preventDefault();
});


// Event Listener for Delete Book
document.getElementById('book-list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();

    // Delete Book
    ui.deleteBook(e.target);

    // Show Alert
    ui.showAlert('Book Deleted', 'success');
    e.preventDefault();
});