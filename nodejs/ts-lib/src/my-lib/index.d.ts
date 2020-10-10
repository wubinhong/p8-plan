/**
 * Implementation of myLib
 */
/**
 * Calculate the number given.
 * @param {number} number
 */
export function calcNumber(number: number): string;
/**
 * Construct a class named Person
 * @param {string} name
 */
export function Person(name?: string): void;
export class Person {
    /**
     * Construct a class named Person
     * @param {string} name
     */
    constructor(name?: string);
    name: string;
    age: number;
    saySomething(word: string): boolean;
    doSomething(sth: string): void;
}
/**
 * Animal class
 */
export class Animal {
    /**
     * Construct an animal
     * @param {string} name The name of animal
     */
    constructor(name: string);
    name: string;
    /**
     * Bark to sb
     * @param {string} sb The Person being barked.
     */
    bark(sb: string): boolean;
}