/**
 * Types by Inference
 */
let helloWorld = 'Hello World';
let helloWorld2: string = 'Hello World';

/**
 * Defining Types
 */
const user = {
    name: 'Hayes',
    id: 0,
};
interface User {
    name: string;
    id: number;
}
// Declare explicitly
// Field name sensitive but not sequence sensitive
const user2: User = {
    id: 0,
    name: 'Hayes',
};
const user3: User = {
    // userName: 'Hayes',
    name: 'Hayes',
    id: 0,
};
// You can use an interface declaration with classes, as long as they have the same field names
interface User {
    name: string;
    id: number;
}
class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}
const user4: User = new UserAccount('Murphy', 1);
// You can use interfaces to annotate parameters and return values to functions:
function getAdminUser(): User {
    return {
        name: 'kevin',
        id: 2,
    };
}
function deleteUser(u: User) {
    console.log(u);
}

/**
 * Composing Types
 */
// Unions
type MyBool = true | false;
type WindowStates = 'open' | 'closed' | 'minimized';
type LockStates = 'locked' | 'unlocked';
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

let mb: MyBool = true;
// let mb2: MyBool = 'kevin';
let ws: WindowStates = 'open';
// let ws2: WindowStates = 'open2';

// Unions provide a way to handle different types too.
function getLength(obj: string | string[]) {
    return obj.length;
}
console.log(getLength('Hello!'));
console.log(getLength(['1', '2', '5']));
// console.log(getLength([1, 2, 5]));
// Make a function return different values depending on whether it is passed a string or an array:
function wrapInArray(obj: string | string[]) {
    if (typeof obj === 'string') {
        return [obj];
        //          ^ = (parameter) obj: string
    } else {
        return obj;
    }
}
console.log(wrapInArray('hello'));
console.log(wrapInArray(['1', '2', '6']));
// Generics
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

let sa: StringArray = ['aa'];
let owna: ObjectWithNameArray = [{ name: 'kevin' }, { name: 'jack' }];
// let owna2: ObjectWithNameArray = [{name: 'kevin'}, {name: 'jack', age: 23}];
// You can declare your own types that use generics:
interface Backpack<Type2> {
    add: (obj: Type2) => void;
    get: () => Type2;
}
// declare const backpack: Backpack<string>;
// const backpack2: Backpack<string>;
// let backpack3: Backpack<string>;
// Implementation for interface Backpack
let backpack: Backpack<string> = {
    add: (obj: string) => {
        console.log(`Add obj: ${obj}`);
    },
    get: () => {
        // return 12;
        return 'Jack';
    },
};
const object = backpack.get();
console.log(object);
// backpack.add(23);
backpack.add('23');
