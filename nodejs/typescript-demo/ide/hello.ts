/**
 * Classic TypeScripe file
 */

interface Animal {
    name: string;
    id: number;
}

class Dog {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    bark = () => {
        console.log(`Bark...! ${this.name}`);
    };
}

class Launcher {
    helloTestCase = function (acount: Animal): { name: string; score: number } {
        return {
            name: acount.name,
            score: Math.round(Math.random() * 100),
        };
    };

    getAdminUser = function (): Animal {
        return {
            name: 'kevin',
            id: 2,
        };
    };
    deleteUser = function (u: Animal) {
        console.log(u);
    };
}

// Start up
console.log(new Launcher().helloTestCase(new Dog('Kevin', 12)));
