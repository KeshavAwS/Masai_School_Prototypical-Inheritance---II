// Base User Class
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getDetails() {
    console.log(`Name: ${this.name}, Email: ${this.email}`);
  }
}

// Student Class (Inherits from User)
class Student extends User {
  constructor(name, email, studentId) {
    super(name, email);
    this.studentId = studentId;
  }

  enroll() {
    console.log(`Student ${this.name} has enrolled.`);
  }
}

// Instructor Class (Inherits from User)
class Instructor extends User {
  constructor(name, email, instructorId) {
    super(name, email);
    this.instructorId = instructorId;
  }

  assignGrade() {
    console.log(`Instructor ${this.name} assigned a grade.`);
  }
}

// Demonstration
const student1 = new Student("Alice Johnson", "alice@example.com", "S12345");
const instructor1 = new Instructor("Dr. Smith", "smith@example.com", "I67890");

// Calling Methods
student1.getDetails(); // Logs student details
student1.enroll(); // Logs enrollment message

instructor1.getDetails(); // Logs instructor details
instructor1.assignGrade(); // Logs grade assignment message
