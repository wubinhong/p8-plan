/**
 * A major part of software engineering is building components that not only have well-defined and consistent APIs, but are also reusable.
 * Components that are capable of working on the data of today as well as the data of tomorrow
 * will give you the most flexible capabilities for building up large software systems.
 * In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is generics,
 * that is, being able to create a component that can work over a variety of types rather than a single one.
 * This allows users to consume these components and use their own types.
 */
export class HandbookGeneric {
    /**
     * Hello world of Generic
     */
    testHelloWorld() {
        function identity<T>(arg: T): T {
            // Property 'length' does not exist on type 'T'.
            // console.log(arg.length);
            return arg;
        }
        console.log(identity<string>('Hello, world!'));
        // Argument of type 'number' is not assignable to parameter of type 'string'
        // console.log(identity<string>(23))
    }
    /**
     * Working with Generic Type Variables
     */
    testGenericTypeVariable() {
        function loggingIdentity<T>(arg: T[]): T[] {
            console.log(arg.length);
            return arg;
        }
        let ret = loggingIdentity([{ name: 'kevin', age: 23 }, 'Good']);
        console.log(`testGenericTypeVariableloggingIdentity: ${JSON.stringify(ret)}`);
        function loggingIdentity2<T>(arg: Array<T>): Array<T> {
            console.log(arg.length); // Array has a .length, so no more error
            return arg;
        }
        ret = loggingIdentity2([{ name: 'kevin', age: 23 }, 'Good2']);
        console.log(`testGenericTypeVariable.loggingIdentity2: ${JSON.stringify(ret)}`);
    }
    /**
     * Generic Types
     * In this section, we’ll explore the type of the functions themselves and how to create generic interfaces.
     */
    testGenericTypes() {
        // function based generic types
        function identity<T>(arg: T): T {
            console.log(`identity: ${arg}`);
            return arg;
        }
        let myIdentity: <U>(arg: U) => U = identity;
        console.log(myIdentity);
        myIdentity('Hello');
        myIdentity(33);
        // Argument of type 'string' is not assignable to parameter of type 'number'.
        // myIdentity<number>('Hello');
        myIdentity<number>(29);
        let myIdentity2: { <U>(arg: U): U } = identity; // Interesting, very special!
        console.log(myIdentity2);
        /**
         * Abstracted up to interface level
         */
        interface GenericIdentityFn {
            <T>(arg: T): T; // Note: this is not a member method but a method presenting the interface itself.
        }
        let myIdentity3: GenericIdentityFn = identity;
        console.log(myIdentity3);
        myIdentity3('gg');
        interface GenericIdentityFn2<T> {
            (arg: T): T;
        }
        let myIdentity4: GenericIdentityFn2<number> = identity;
        console.log(myIdentity4);
        myIdentity4(23);
        // Argument of type 'string' is not assignable to parameter of type 'number'.
        // myIdentity4('gg')
    }

    /**
     * Generic Classes
     * A generic class has a similar shape to a generic interface.
     * Generic classes have a generic type parameter list in angle brackets (<>) following the name of the class.
     */
    testGenericClasses() {
        class GenericNumber<T> {
            zeroValue: T;
            add: (x: T, y: T) => T;
        }
        // Define generic type as primitive type "number"
        let myGenericNumber = new GenericNumber<number>();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function (x, y) {
            console.log(`testGenericClasses.add: ${x} + ${y}`);
            return x + y;
        };
        myGenericNumber.add(12, 33);
        // Define generic type as primitive type "string"
        let myGenericNumber2 = new GenericNumber<string>();
        myGenericNumber2.zeroValue = '';
        myGenericNumber2.add = function (x, y) {
            console.log(`testGenericClasses.add: ${x} + ${y}`);
            return x + y;
        };
        myGenericNumber2.add('kevin', 'jack');

        /**
         * Multiple generic types
         */
        class GenericMulti<X, Y> {
            add: (x: X, y: Y) => string;
        }
        let genericMulti = new GenericMulti<string, number>();
        genericMulti.add = (x, y): string => {
            console.log(`testGenericClasses.genericMulti.add: ${x} + ${y}`);
            return 'Add method finished!';
        };
        console.log(genericMulti.add('Kevin', 23));
        /**
         * Do something directly in generic method.
         */
        class GenericMulti2<X, Y> {
            add(x: X, y: Y): Y {
                console.log(`testGenericClasses.genericMulti.add directly in generic class's method: ${x} + ${y}`);
                return y;
            }
        }
        let genericMulti2 = new GenericMulti2<string, number>();
        console.log(genericMulti2.add('Jack', 88));
    }
    /**
     * Generic Constraints
     * Constrain generic type with reserved word "extends".
     */
    testGenericConstraints() {
        interface Lengthwise {
            length: number;
        }
        function loggingIdentity<T extends Lengthwise>(arg: T): T {
            console.log(arg.length); // Now we know it has a .length property, so no more error
            return arg;
        }
        // Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.
        // console.log(loggingIdentity(3));
        console.log(loggingIdentity({ length: 10, value: 3 }));

        /**
         * Using Type Parameters in Generic Constraints
         */
        function getProperty<T, K extends keyof T>(obj: T, key: K) {
            return obj[key];
        }
        let x = { a: 1, b: 2, c: 3, d: 4 };
        getProperty(x, 'a');
        // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
        // getProperty(x, 'm');
    }
    /**
     * Using Class Types in Generics
     * When creating factories in TypeScript using generics, it is necessary to refer to class types by their constructor functions.
     */
    testClassTypesInGenerics() {
        /**
         * An generic factory example.
         */
        function create<T>(c: { new (): T }): T {
            return new c(); // Refer to class's constructor function.
        }
        class Person {
            username: string;
            // age: 23;    // This will be defined as enum
            age = 23; // Default value, which can be altered after constructor is executed.
            // Argument of type 'typeof Person' is not assignable to parameter of type 'new () => Person'.
            // Only works for constructor with no parameter.
            // constructor(public password: string) {}
        }
        const p = create<Person>(Person);
        console.log(`testClassTypesInGenerics.create: ${JSON.stringify(p)}`);
        p.age = 25;
        console.log(`testClassTypesInGenerics.create after age is reassigned: ${JSON.stringify(p)}`);

        /**
         * This is derive to the coding pattern of full type of function.
         */
        let fullTypeFunc: { (x: number, y: string): boolean } = (a: number, b: string): boolean => {
            console.log(`testClassTypesInGenerics.fullTypeFunc: ${a} | ${b}`);
            return true;
        };
        console.log(fullTypeFunc(23, 'good'));
        // So the constructor above can also be written in another manner.
        function create2<U>(c: new () => U): U {
            return new c();
        }
        /**
         * A more advanced example uses the prototype property to infer and constrain relationships
         * between the constructor function and the instance side of class types.
         */
        class BeeKeeper {
            hasMask: boolean;
        }
        class ZooKeeper {
            nametag: string;
        }
        class Animal {
            numLegs: number;
        }
        class Bee extends Animal {
            keeper: BeeKeeper;
        }
        class Lion extends Animal {
            keeper: ZooKeeper;
        }
        function createInstance<A extends Animal>(c: new () => A): A {
            return new c();
        }
        function aa<A extends Animal>(c: { new (): A }): A {
            return new c();
        }
        // The two following line of code will cause error, since no init value for class property member "keeper".
        // Cannot read property 'nametag' of undefined
        // console.log(createInstance(Lion).keeper.nametag);
        // console.log(createInstance(Bee).keeper.hasMask);
    }
}

let handbookGeneric = new HandbookGeneric();
handbookGeneric.testHelloWorld();
handbookGeneric.testGenericTypeVariable();
handbookGeneric.testGenericTypes();
handbookGeneric.testGenericClasses();
handbookGeneric.testClassTypesInGenerics();
