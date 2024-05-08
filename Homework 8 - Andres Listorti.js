// Class representing a book
class Book {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }

  // Method to check book availability
  checkAvailability() {
    return this.availability;
  }
}

// Class representing a user
class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
    this.cart = new Cart(this); // User has a cart instance
  }

  // Method to display user information
  displayInfo() {
    console.log(
      `Name: ${this.name}, Email: ${this.email}, User ID: ${this.userId}`
    );
  }
}

// Class representing a shopping cart
class Cart {
  constructor(user) {
    this.user = user;
    this.cartItems = [];
  }

  // Method to add a book to the cart
  addItem(book) {
    if (book.checkAvailability()) {
      this.cartItems.push(book);
      console.log(`${book.title} added to ${this.user.name}'s cart.`);
    } else {
      console.log(`${book.title} is currently unavailable.`);
    }
  }

  // Method to remove a book from the cart
  removeItem(book) {
    const index = this.cartItems.findIndex((item) => item.isbn === book.isbn);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      console.log(`${book.title} removed from ${this.user.name}'s cart.`);
    } else {
      console.log(`${book.title} is not in ${this.user.name}'s cart.`);
    }
  }

  // Method to calculate total price of items in the cart
  calculateTotal() {
    let totalPrice = 0;
    this.cartItems.forEach((item) => (totalPrice += item.price));
    return totalPrice;
  }

  // Method to display cart contents
  displayCart() {
    if (this.cartItems.length === 0) {
      console.log(`${this.user.name}'s cart is empty.`);
    } else {
      console.log(`${this.user.name}'s Cart:`);
      this.cartItems.forEach((item) =>
        console.log(`  - ${item.title} by ${item.author}`)
      );
      console.log(`  Total Price: $${this.calculateTotal()}`);
    }
  }
}

// Class representing an order
class Order {
  constructor(user, books) {
    this.user = user;
    this.books = books;
    this.totalPrice = this.calculateTotal();
  }

  // Method to calculate total price of order
  calculateTotal() {
    let totalPrice = 0;
    this.books.forEach((item) => (totalPrice += item.price));
    return totalPrice;
  }

  // Method to display order details
  displayOrder() {
    console.log(`Order for ${this.user.name}:`);
    this.books.forEach((item) =>
      console.log(`  - ${item.title} by ${item.author}`)
    );
    console.log(`  Total Price: $${this.totalPrice}`);
  }
}

//
//
// Optionals
// Class representing a Science Fiction Book (example of inheritance)
class ScienceFictionBook extends Book {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.genre = "Science Fiction";
  }
}
// Function to search for books by title (example)
function searchBooks(books, title) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
}

// Examples:
//
// Example usage with interaction demonstration
const book1 = new Book(
  "The Lord of the Rings",
  "J.R.R. Tolkien",
  "9780261102694",
  15.99,
  true
);
const book2 = new Book(
  "Pride and Prejudice",
  "Jane Austen",
  "9780140439516",
  9.99,
  false
);
const book3 = new Book(
  "La Resistencia",
  "Ernesto Sabato",
  "9780441014111",
  11.99,
  true
);
const book4 = new Book(
  "Sobre Heroes y Tumbas",
  "Ernesto Sabato",
  "9780441444111",
  15.99,
  true
);

const user1 = new User("Andres Listorti", "alistorti.laba@solvd.com", 1);
const user2 = new User("Alexandrina Poida", "apoida@solvd.com", 2);

// User interacts with cart: adding and removing items
user1.cart.addItem(book1);
user1.cart.displayCart(); // Display cart contents after adding book1
user1.cart.addItem(book2); // Unavailable
//
user1.cart.addItem(book3);
user1.cart.displayCart(); // Display cart contents after adding book3
//
user1.cart.removeItem(book1);
user1.cart.displayCart(); // Display cart contents after removing book1
//
// Example usage with additional features
const book5 = new ScienceFictionBook(
  "Dune",
  "Frank Herbert",
  "9780441014041",
  12.99,
  true
); // Polymorphism example

// Search for books
const searchResults = searchBooks(
  [book1, book2, book3, book4, book5],
  "heroes"
);
console.log("Search results:");
searchResults.forEach((book) => console.log(`  - ${book.title}`));

// User interacts with cart again
user1.cart.addItem(book4);
user1.cart.addItem(book5);
user1.cart.displayCart();

//
// User placing an order
const order1 = new Order(user1, user1.cart.cartItems); // Create order from user's cart items
console.log("Order placed:----------------------------------------");
order1.displayOrder(); // Display order details
