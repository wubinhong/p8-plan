import { Person, calcNumber, Animal } from 'myLib';

console.log(calcNumber(123));

let p = new Person();
console.log(p);
console.log(p.saySomething('Hello'));

let a = new Animal('Jack');
console.log(a);
console.log(a.bark('Sam'));
