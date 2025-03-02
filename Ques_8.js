// Book Constructor
function Book(title, author) {
  this.title = title;
  this.author = author;
  this.isAvailable = true; // Default: available
}

// Member Constructor
function Member(name) {
  this.name = name;
  this.borrowedBooks = [];
}

// Borrow Book Method for Regular Members
Member.prototype.borrowBook = function (book) {
  if (!book.isAvailable) {
    console.log(`${book.title} is already borrowed.`);
    return;
  }

  if (this.borrowedBooks.length >= 3) {
    console.log(`${this.name} cannot borrow more than 3 books.`);
    return;
  }

  book.isAvailable = false;
  this.borrowedBooks.push(book.title);
  console.log(`${this.name} borrowed "${book.title}".`);
};

// Premium Member Constructor (Inheriting from Member)
function PremiumMember(name) {
  Member.call(this, name); // Call Parent Constructor
  this.specialCollectionAccess = true;
}

// Inherit Methods from Member
PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

// Override borrowBook for Premium Members
PremiumMember.prototype.borrowBook = function (book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} cannot borrow more than 5 books.`);
    return;
  }

  // Use Member's borrowBook method with PremiumMember's context
  Member.prototype.borrowBook.call(this, book);
};

// Function to return a book
Member.prototype.returnBook = function (book) {
  const index = this.borrowedBooks.indexOf(book.title);
  if (index === -1) {
    console.log(`${this.name} has not borrowed "${book.title}".`);
    return;
  }

  book.isAvailable = true;
  this.borrowedBooks.splice(index, 1);
  console.log(`${this.name} returned "${book.title}".`);
};

// Creating Book Instances
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
const book2 = new Book("1984", "George Orwell");
const book3 = new Book("Moby-Dick", "Herman Melville");
const book4 = new Book("The Catcher in the Rye", "J.D. Salinger");
const book5 = new Book("To Kill a Mockingbird", "Harper Lee");
const book6 = new Book("The Hobbit", "J.R.R. Tolkien");

// Creating Member Instances
const regularMember = new Member("Alice");
const premiumMember = new PremiumMember("Bob");

// Regular Member Borrowing Books
regularMember.borrowBook(book1);
regularMember.borrowBook(book2);
regularMember.borrowBook(book3);
regularMember.borrowBook(book4); // Should fail (limit 3)

// Premium Member Borrowing Books
premiumMember.borrowBook(book5);
premiumMember.borrowBook(book6);
premiumMember.borrowBook(book1); // Already borrowed by Alice
premiumMember.borrowBook(book2);
premiumMember.borrowBook(book3);
premiumMember.borrowBook(book4); // Should fail (limit 5)

// Regular Member Returning a Book
regularMember.returnBook(book1);

// Using bind to create a borrowed function for a member
const borrowForAlice = regularMember.borrowBook.bind(regularMember, book4);
borrowForAlice(); // Alice should be able to borrow after returning

// Output Demonstration
console.log("Alice's Borrowed Books:", regularMember.borrowedBooks);
console.log("Bob's Borrowed Books:", premiumMember.borrowedBooks);
