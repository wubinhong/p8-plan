/**
 * Structural Type System
 */
// In a structural type system, if two objects have the same shape, they are considered to be of the same type.
// Same shape is defined to have the same field with field name and field type all the same.
interface Point {
    x: number;
    y: number;
}
function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}
// prints "12, 26"
const point = { x: 12, y: 26 };
printPoint(point);
// The compatibility of structural type.
const point3 = { x: 12, y: 26, z: 89 };
printPoint(point3); // prints "12, 26"
const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint(rect); // prints "33, 3"
const color = { hex: '#187ABF' };
// printPoint(color);

// There is no difference between how classes and objects conform to shapes:
class VirtualPoint {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
const newVPoint = new VirtualPoint(13, 56);
printPoint(newVPoint); // prints "13, 56"

/**
 * Some other interesting features learned/extracted from the TypeScript Handbook.
 */
// Declare a tuple type
let x: [string, number];
x = ['hello', 10]; // OK
// x = [10, "hello"]; // Error
console.log(x[0].substring(1));
// console.log(x[1].substring(1));  // Error

// Enum
enum Color {
    Red,
    Green,
    Blue,
}
let c: Color = Color.Green;
console.log(c);
console.log(`Color.Color: ${Color.Red}`);
// Change numbering index
enum Color2 {
    Red = 2,
    Green,
    Blue = 8,
    Blue2,
}
console.log(Color2.Red);
console.log(Color2.Blue);
console.log(Color2.Blue2);
// Get name by index
let colorName: string = Color2[2];
console.log(colorName);

// Unknown
let notSure: unknown = 4;
notSure = 'maybe a string instead';
// OK, definitely a boolean
notSure = false;
console.log(notSure);

// Any
declare function getValue(key: string): any;
// const str: string = getValue("myString");   // Unavailable actually. ReferenceError: getValue is not defined

let looselyTyped: any = 4;
// OK, ifItExists might exist at runtime
// looselyTyped.ifItExists();
// OK, toFixed exists (but the compiler doesn't check)
// looselyTyped.toFixed();
// let strictlyTyped: unknown = 4;
// strictlyTyped.toFixed();

// Void
function warnUser(): void {
    console.log('This is my warning message');
}

// Never
// Function returning never must not have a reachable end point
function error(message: string): never {
    throw new Error(message);
    // return 'kk'
}
// Inferred return type is never
function fail() {
    return error('Something failed');
}
// Function returning never must not have a reachable end point
function infiniteLoop(): never {
    while (true) {}
}

// Type assertions
// One is the as-syntax:
let someValue: unknown = 'this is a string';
let strLength: number = (someValue as string).length;
// he other version is the “angle-bracket” syntax:
let strLength2: number = (<string>someValue).length;

// These types, Number, String, Boolean, Symbol, or Object, do not refer to the language primitives however, and almost never should be used as a type.
function reverse(s: String): String {
    return s.split('').reverse().join('');
}
console.log(reverse('hello world'));


