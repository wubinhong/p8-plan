/**
 * Calculate the number given.
 * @param {number} number
 */
function calcNumber(number) {
    console.log(`Start calculate number: ${number}`);
    return `success: ${number + 1}`;
}

/**
 * Construct a class named Person
 * @param {string} name
 */
function Person(name = 'Kevin') {
    this.name = name;
    this.age = 23;
}

/**
 * Say something
 * @param {string} word
 * @returns {boolean} Finished
 */
Person.prototype.saySomething = function (word) {
    console.log(`${this.name} say: ${word}`);
    return true;
};

/**
 * Do something
 * @param {string} sth
 */
Person.prototype.doSomething = function (sth) {
    console.log("Yeah, I'm doing");
};

/**
 * Animal class
 */
class Animal {
    /**
     * Construct an animal
     * @param {string} name The name of animal
     */
    constructor(name) {
        this.name = name;
    }

    /**
     * Bark to sb
     * @param {string} sb The Person being barked.
     */
    bark(sb) {
        console.log(`${this.name} is barking for: ${sb}`);
        return true;
    }
}

new Animal('Loo').bark();

module.exports = {
    calcNumber,
    Person,
    Animal,
};
