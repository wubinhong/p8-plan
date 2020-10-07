/**
 * All interface related topics.
 */
export class HandbookInterface {
    /**
     * Interface Section
     */
    testInterfaceBase() {
        interface LabeledValue {
            label: string;
        }
        function printLabel(labeledObj: LabeledValue) {
            console.log(labeledObj.label);
        }
        let myObj = { size: 10, label: 'Size 10 Object' };
        printLabel(myObj);
        printLabel({ label: 'Hey' });
        // printLabel({size: 10, label: 'Hey'});    // Excess Property Checks
        // Getting around these checks is actually really simple. The easiest method is to just use a type assertion:
        printLabel({ size: 10, label: 'Hey' } as LabeledValue);

        // ReadOnly properties
        interface PointReadOnly {
            readonly x: number;
            readonly y: number;
        }
        let p1: PointReadOnly = { x: 10, y: 20 };
        console.log(p1);
        // let p1: PointReadOnly = { x: 10, y: 20, z: 20 }; // Excess Property Checks
        // p1.x = 5; // error!
        let a: number[] = [1, 2, 3, 4];
        let ro: ReadonlyArray<number> = a;
        a[0] = 12;
        // ro[0] = 12; // error!
        // ro.push(5); // error!
        // a = ro; // error!
        console.log(a);
        console.log(ro);
        // Assign the entire ReadonlyArray back to a normal array is illegal
        a = ro as number[];
        // readonly vs const: Variables use const whereas properties use readonly.
    }
    /**
     * Instant interface in real time.
     */
    testInterfaceUseInRealTime() {
        interface Person {
            username: string;
            age: number;
            talk(word: string): string;
        }
        let p: Person = {
            username: 'kevin',
            talk: function (w = 'Hello'): string {
                return '';
            },
        } as Person;
        console.log(p);
        p.age = 25;
        console.log(p);

        // Interface with anonymous method
        interface Person2 {
            username: string;
            (username?: string): string;
            talk(word?: string): string;
        }
        let p2 = function (username: string = 'Sam'): string {
            console.log('Invoke interface anonymous method', this, username);
            return username + ' comming!';
        } as Person2;
        console.log(p2);
        p2();
        p2('Girl');
        p2.talk = function (w = 'The nature!') {
            console.log(this);
            console.log(`My name is ${this.name}, and I'm going to talk about: ${w}`);
            return `I'm finished my speech!`;
        };
        console.log(p2);
        console.log(p2.talk());
        console.log(p2.talk('The animals!'));
    }

    // Function Types
    testFuncTypes() {
        interface SearchFunc {
            (source: string, subString: string): boolean;
        }
        let mySearch: SearchFunc;
        mySearch = function (source: string, subString: string): boolean {
            let result = source.search(subString);
            return result > -1;
            // return 'string value';
        };
        console.log(mySearch('kevin is a man', 'iss'));
        mySearch = (source: string, subString: string): boolean => {
            let result = source.search(subString);
            return result > -1;
        };
        console.log(mySearch('kevin is a man', 'is'));
        // Function types with multi functions
        interface SearchFuncInterface {
            subStr(source: string, subString: string): boolean;
            append(src: string, sub: string): string;
        }
        // Instant object implement pattern.
        let mySearch2 = {
            subStr(src: string, sub: string): boolean {
                return src.search(sub) > -1;
            },
            // Not authentic method defining pattern, which is considered as a property by the compiler.
            append: (src: string, sub: string): string => {
                return src + sub;
            },
        };
        console.log(mySearch2.subStr('kevin is a man', ' good'));
        console.log(mySearch2.append('kevin is a man', ' good'));
        // Class based implement pattern.
        class SearchFuncIImpl implements SearchFuncInterface {
            subStr(src: string, sub: string): boolean {
                return src.search(sub) > -1;
            }
            append(src: string, sub: string): string {
                return src + sub;
            }
        }
        let searchFuncImpl = new SearchFuncIImpl();
        console.log(`Class implementation: ${searchFuncImpl.subStr('go go girl', 'go')}`);
    }

    // Indexable Types
    testIndexableTypes() {
        interface StringArray {
            [index: number]: string;
        }
        let myArray: StringArray;
        myArray = ['Bob', 'Fred'];
        let myStr: string = myArray[0];
        console.log(myStr);
        let k: string[] = ['Bob', 'Fred'];
        console.log(k[0]);

        interface Animal {
            name: string;
        }
        interface Dog extends Animal {
            breed: string;
        }
        // Error: indexing with a numeric string might get you a completely separate type of Animal!
        // This two types of index are mutually exclusive, which means they can't exist at the same time.
        interface NotOkay {
            // Numeric index type 'Animal' is not assignable to string index type 'Dog'.
            // [x: number]: Animal;    // [{ name: 'kevin' }]
            [x: string]: Dog; // {'0': { name: 'kevin', breed: 'dd' }}
        }
        let animal: Animal = { name: 'kevin' };
        console.log(animal);
        let dog: Dog = { name: 'kevin', breed: 'breeding.' };
        console.log(dog);
        // let no: NotOkay = [{ name: 'kevin' }];
        let no: NotOkay = { '0': { name: 'kevin', breed: 'dd' }, 2: { name: 'kevin', breed: 'ggg' } };
        console.log(no);
        interface NumberDictionary {
            [index: string]: number;
            length: number; // ok, length is a number
            // name: string; // error, the type of 'name' is not a subtype of the indexer
            //   Property 'name' of type 'string' is not assignable to string index type 'number'.
        }
        let nd: NumberDictionary = { '1': 12, 2: 22, name: 4, name2: 67, length: 2 };
        console.log(nd);
        interface NumberOrStringDictionary {
            [index: string]: number | string;
            length: number; // ok, length is a number
            name: string; // ok, name is a string
            // age: Dog;   // Not ok.
        }
        interface ReadonlyStringArray {
            readonly [index: number]: string;
        }
        let rosArray: ReadonlyStringArray = ['Alice', 'Bob'];
        console.log(rosArray);
        // rosArray[2] = 'Mallory'; // error!
    }

    // Class Types
    testClassTypes() {
        interface ClockInterface {
            currentTime: Date;
            setTime(d: Date): void;
            tick(): void;
        }
        class Clock implements ClockInterface {
            currentTime: Date = new Date();
            constructor(h: number, m: number) {}
            setTime(d: Date): void {
                this.currentTime = d;
            }
            tick() {
                console.log('tick...');
            }
        }
        interface ClockConstructor {
            // Create an interface with a construct signature.
            new (hour: number, minute: number): ClockInterface;
            // Not constructor but anonymous function
            (hour: number, minute: number): ClockInterface;
        }

        /* class Clock2 implements ClockConstructor {
        // Class 'Clock' incorrectly implements interface 'ClockConstructor'. Type 'Clock' provides no match for the signature 'new (hour: number, minute: number): any'.
        currentTime: Date;
        constructor(h: number, m: number) {}
    } */
        // Usage for an interface with a construct signature.
        // Can't use it directly.
        // let ctor: ClockConstructor;
        // console.log(new ctor(12, 25));
        let c = function (hour: number, minute: number): ClockInterface {
            return new Clock(hour, minute);
        } as ClockConstructor;
        console.log(c);
        console.log(c(12, 24));
        interface ClockConstructor2 {
            new (hour: number, minute: number): ClockInterface2;
        }
        interface ClockInterface2 {
            tick(): void;
        }
        function createClock(ctor: ClockConstructor2, hour: number, minute: number): ClockInterface2 {
            return new ctor(hour, minute);
        }
        class DigitalClock implements ClockInterface2 {
            constructor(h: number, m: number) {}
            // Only the clock with the same constructor as ClockConstructor2 can match the ctor parameter defined in function createClock
            // constructor(h: number, m: number, k: string) {}
            tick() {
                console.log('beep beep');
            }
        }
        class AnalogClock implements ClockInterface2 {
            constructor(h: number, m: number) {}
            tick() {
                console.log('tick tock');
            }
        }
        let digital = createClock(DigitalClock, 12, 17);
        let analog = createClock(AnalogClock, 7, 32);
        console.log(digital);
        console.log(analog);
        digital.tick();
        analog.tick();
    }

    // Extending Interfaces
    testExtendInterface() {
        interface Shape {
            color: string;
        }
        interface Square extends Shape {
            sideLength: number;
        }
        let square = {} as Square; // Avoid excess property checks by using reserved as.
        square.color = 'blue';
        square.sideLength = 10;
    }

    // Hybrid Types
    testHybridTypes() {
        interface Counter {
            (start: number): string;
            interval: number;
            reset(): void;
        }
        function getCounter(): Counter {
            // A trick to implement an interface.
            let counter = function (start: number) {
                console.log('start...');
            } as Counter;
            counter.interval = 123;
            counter.reset = function () {};
            return counter;
        }
        let c = getCounter();
        console.log(c);
        console.log(c(10));
        c.reset();
        c.interval = 5.0;
        console.log(c);
    }

    testInterfacesExtendingClasses() {
        class Control {
            private state: any;
        }
        interface SelectableControl extends Control {
            select(): void;
        }
        class Button extends Control implements SelectableControl {
            select() {}
        }
        class TextBox extends Control {
            select() {}
        }
        /* class ImageControl implements SelectableControl {
        // Class 'ImageControl' incorrectly implements interface 'SelectableControl'.
        // Types have separate declarations of a private property 'state'.
            private state: any;
            select() {}
        } */
    }
}

let handbookInterface = new HandbookInterface();
handbookInterface.testInterfaceBase();
handbookInterface.testInterfaceUseInRealTime();
handbookInterface.testFuncTypes();
handbookInterface.testIndexableTypes();
handbookInterface.testClassTypes();
handbookInterface.testExtendInterface();
handbookInterface.testHybridTypes();
handbookInterface.testInterfacesExtendingClasses();
