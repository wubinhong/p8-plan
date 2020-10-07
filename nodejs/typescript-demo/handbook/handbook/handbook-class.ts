/**
 * Traditional JavaScript uses functions and prototype-based inheritance to build up reusable components,
 * but this may feel a bit awkward to programmers more comfortable with an object-oriented approach,
 * where classes inherit functionality and objects are built from these classes.
 * Starting with ECMAScript 2015, also known as ECMAScript 6, JavaScript programmers can build their applications using this object-oriented class-based approach.
 * In TypeScript, we allow developers to use these techniques now, and compile them down to JavaScript that works across all major browsers and platforms,
 * without having to wait for the next version of JavaScript.
 */
export class HandbookClass {
    /**
     * Let’s take a look at a simple class-based example:
     */
    testClass() {
        class Greeter {
            greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }
            greet() {
                return 'Hello, ' + this.greeting;
            }
        }
        let greeter = new Greeter('world');
        console.log(greeter);
        console.log(greeter.greeting);
        console.log(greeter.greet());
    }
    /**
     * Inheritance
     */
    testInheritance() {
        class Animal {
            name: string;
            constructor(public initName: string = null) {
                console.log('Animal constructor invoked!');
                this.name = initName;
            }
            move(distanceInMeters: number = 0) {
                console.log(`Animal moved ${distanceInMeters}m. Animal info: ${this.initName} | ${this.name}`);
            }
        }
        class Dog extends Animal {
            bark() {
                console.log(`I'm ${this.name}! Woof! Woof!`);
            }
        }
        const dog = new Dog();
        dog.name = 'JackDog';
        dog.bark();
        dog.move(10);
        new Dog('KevinDog').move();

        class Snake extends Animal {
            constructor(name: string) {
                console.log('Snake constructor invoked!');
                super(name);
            }
            move(distanceInMeters = 5) {
                console.log('Slithering...');
                super.move(distanceInMeters);
            }
        }
        let sam = new Snake('Sammy the Python');
        console.log(sam);
        sam.move();
        sam.move(100);
    }
    /**
     * Public, private, and protected modifiers
     */
    testModifier() {
        class Animal {
            public name: string; // The default identifier was public
            private privateName: string;
            // #fullName: string;   // ECMAScript Private Fields
            public constructor(theName: string) {
                this.name = theName;
            }
            public move(distanceInMeters: number) {
                console.log(`${this.name} moved ${distanceInMeters}m. ${this.privateName}`);
            }
        }
        let a = new Animal('Dog2');
        console.log(`pulblic name: ${a.name}`);
        // console.log(`private name: ${a.privateName}`);
        /**
         * For two types to be considered compatible, if one of them has a private member,
         * then the other must have a private member that originated in the same declaration.
         */
        class Animal2 {
            private name: string;
            constructor(theName: string) {
                this.name = theName;
            }
        }
        class Rhino extends Animal2 {
            constructor() {
                super('Rhino');
            }
        }
        class Bird {
            private name: string;
            constructor(theName: string) {
                this.name = theName;
            }
        }
        let animal = new Animal2('Goat');
        let rhino = new Rhino();
        let bird = new Bird('Bob');
        animal = rhino;
        // animal = bird;  // If the identifier of property 'name' was altered to public, then it works.
        /**
         * Understanding protected
         */
        class Person {
            protected name: string;
            /**
             * If the constructor was marked protected, constructor of class 'Person' is protected and only accessible within the class declaration.
             * let john = new Person("John");   // This line of code will report error by the compiler.
             */
            // protected constructor(name: string) {
            protected constructor(name: string) {
                this.name = name;
            }
        }
        class Employee extends Person {
            private department: string;
            constructor(name: string, department: string) {
                super(name);
                this.department = department;
            }
            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}.`;
            }
        }
        let howard = new Employee('Howard', 'Sales');
        console.log(howard.getElevatorPitch());
        // Property 'name' is protected and only accessible within class 'Person' and its subclasses.
        // console.log(howard.name);
        /**
         * Readonly modifier: Readonly properties must be initialized at their declaration or in the constructor.
         */
        class Octopus {
            readonly name: string;
            readonly numberOfLegs: number = 8;
            readonly numberOfLegs2 = 10;
            private _innerAge = 23;
            // The 'readonly' modifier make the value of theName accessible after the Octopus constructor is executed.
            constructor(readonly theName: string) {
                this.name = theName;
            }
        }
        let dad = new Octopus('Man with the 8 strong legs');
        console.log(dad);
        console.log(dad.name);
        // dad.name = 'Man with the 3-piece suit'; // Cannot assign to 'name' because it is a read-only property.
        console.log(dad.theName);
        // dad.theName = 'kkk';    // Cannot assign to 'theName' because it is a read-only property

        /** Static Properties */
        class Grid {
            static origin = { x: 0, y: 0 };
            calculateDistanceFromOrigin(point: { x: number; y: number }) {
                let xDist = point.x - Grid.origin.x;
                let yDist = point.y - Grid.origin.y;
                return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
            }
            constructor(public scale: number) {}
        }
        let grid1 = new Grid(1.0); // 1x scale
        let grid2 = new Grid(5.0); // 5x scale
        // Property 'origin' is a static member of type 'Grid', so it is unaccessible to an instance.
        // console.log(grid1.origin);
        console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
        console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
    }

    /**
     * Abstract Classes
     */
    testAbstractClass() {
        abstract class Department {
            constructor(public name: string) {}
            printName(): void {
                console.log('Department name: ' + this.name);
            }
            abstract printMeeting(): void; // must be implemented in derived classes
        }
        class AccountingDepartment extends Department {
            constructor() {
                super('Accounting and Auditing'); // constructors in derived classes must call super()
            }
            printMeeting(): void {
                console.log('The Accounting Department meets each Monday at 10am.');
            }
            generateReports(): void {
                console.log('Generating accounting reports...');
            }
        }
        let department: Department; // ok to create a reference to an abstract type
        // department = new Department(); // error: cannot create an instance of an abstract class
        department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
        department.printName();
        department.printMeeting();
        // department.generateReports();   // Property 'generateReports' does not exist on type 'Department'.
    }

    /**
     * Advanced Techniques
     */
    testAdvancedTechniques() {
        let Greeter = (function () {
            function G(message) {
                console.log('Constructor invoked.');
                this.greeting = message;
            }
            G.prototype.greet = function () {
                return 'Hello, ' + this.greeting;
            };
            return G;
        })();
        let greeter = new Greeter('world');
        console.log(greeter.greet()); // "Hello, world"
        console.log(new Greeter('world2'));
    }
    testAdvancedTechniques2() {
        class Greeter {
            static standardGreeting = 'Hello, there';
            greeting: string;
            greet() {
                if (this.greeting) {
                    return 'Hello, ' + this.greeting;
                } else {
                    return Greeter.standardGreeting;
                }
            }
        }

        let greeter1: Greeter = new Greeter();
        console.log(greeter1.greet()); // "Hello, there"

        // that is “give me the type of the Greeter class itself” rather than the instance type.
        let greeterMaker: typeof Greeter = Greeter;
        greeterMaker.standardGreeting = 'Hey there2!';
        console.log(`typeof Greeter: ${greeterMaker}`);

        let greeter2: Greeter = new greeterMaker();
        console.log(greeter2.greet()); // "Hey there!"
        console.log(greeter2);
        let greeter3: Greeter = new Greeter();
        console.log(greeter3);
    }
    /**
     * Using a class as an interface
     */
    testUseClassAsInterface() {
        class Point {
            x: number;
            y: number;
        }

        interface Point3d extends Point {
            z: number;
        }

        let point3d: Point3d = { x: 1, y: 2, z: 3 };
        console.log(point3d);
    }
}
let handbookClass: HandbookClass = new HandbookClass();
handbookClass.testClass();
handbookClass.testInheritance();
handbookClass.testModifier();
handbookClass.testAdvancedTechniques();
handbookClass.testAdvancedTechniques2();
handbookClass.testUseClassAsInterface();
