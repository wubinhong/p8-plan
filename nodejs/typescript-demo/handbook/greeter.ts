/**
 * Interfaces
 */
interface Person {
    firstName: string;
    lastName: string;
}

// function greeter(person: any) {
// function greeter(person: string) {
function greeter(person: Person) {
    // return 'Hello, ' + person;
    return `Hello, ${person.firstName} ${person.lastName}`;
}

// let guser = 'Jane User';
// let guser = [0, 1, 2];
let guser = {
    // firtname: 'Jane',    // The names of properties should be consistent with that of the fields declared/defined in interface Person
    firstName: 'Jane',
    lastName: 'User',
    abundantField: 'A',
};

// console.log(greeter());
console.log(greeter(guser));

/**
 * Classes
 */
class Student {
    fullName: string;
    constructor(firstName: string, middleInitial: string, lastName: string) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}

// Also of note, the use of public on arguments to the constructor is a shorthand that allows us to automatically create properties with that name.
class Student2 {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}

// Compare the difference
console.log(new Student('Jane', 'M.', 'User'));
console.log(new Student2('Jane', 'M.', 'User'));


// Property 'abundantField' is missing in type 'Student2' but required in type '{ firstName: string; lastName: string; abundantField: string; }'.
// user = new Student2('Jane', 'M.', 'User');

let guser2 = {
    firstName: 'Jane',
    lastName: 'User',
};

// Type 'Student' is missing the following properties from type '{ firstName: string; lastName: string; }': firstName, lastName
// guser2 = new Student('Jane', 'M.', 'User');

// Create fields firtName, middleInitial and lastName automatically via the use of access decorator public.
guser2 = new Student2('Jane', 'M.', 'User');
// Both guser and guser2 is valid/authenticated to access function greeter.
console.log(greeter(guser))
console.log(greeter(guser2))
