class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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

    showAlert(message, className) {
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

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}


// // Local Storage Class
class Store {
    static getBook() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBook() {
        const books = Store.getBook();

        books.forEach(function (book) {
            const ui = new UI;

            ui.addBookToList(book);
        });

    }

    static addBook(book) {
        const books = Store.getBook();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBook();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBook);



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

        // Add To Local Storage
        Store.addBook(book);

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

    // Remove from Local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert
    ui.showAlert('Book Deleted', 'success');
    e.preventDefault();
});