/**
 * Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.
 */
export class HandbookReferenceDecorator {
    /**
     * Decorators, Decorator Factories, Decorator Composition
     */
    testDecoratorFactoryComposition() {
        function f() {
            console.log('f(): evaluated');
            return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
                console.log('f(): called');
            };
        }

        function g() {
            console.log('g(): evaluated');
            return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
                console.log('g(): called');
            };
        }
        // function k(target) {   // At least two parameter. Othewise, error may occur: Unable to resolve signature of method decorator when called as an expression.
        // function k(target, propertyKey: string) {   // At least two parameter
        function k(target, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log(`k(): called: ${JSON.stringify(target)} | ${propertyKey} | ${JSON.stringify(descriptor)}`);
        }

        class C {
            @f()
            @g()
            @k
            // Experimental support for decorators is a feature that is subject to change in a future release.
            // Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.
            method(a: number) {}
        }
        // Note: 执行顺序按堆栈算法执行的
        new C().method(23);
    }
    /**
     * A Class Decorator is declared just before a class declaration.
     * he class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition.
     */
    testClassDecorator() {
        function sealed(constructor: Function) {
            console.log('testClassDecorator.sealed decorator invoked!');
            Object.seal(constructor);
            Object.seal(constructor.prototype);
        }
        @sealed
        class Greeter {
            greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }
            greet() {
                return 'Hello, ' + this.greeting;
            }
        }
        console.log(new Greeter('Jack!').greet());

        /**
         * Real world example. Mixed with generic types.
         */
        function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
            return class extends constructor {
                newProperty = 'new property';
                hello = 'override';
            };
        }
        @classDecorator
        class Greeter2 {
            property = 'property';
            hello: string;
            constructor(m: string, public k?: number) {
                console.log(`testClassDecorator.Greeter2.constructor invoked: ${m}, ${k}`);
                this.hello = m;
            }
        }
        console.log(new Greeter2('world'));
        console.log(new Greeter2('world', 23));
    }
}

let handbookReferenceDecorator = new HandbookReferenceDecorator();
handbookReferenceDecorator.testDecoratorFactoryComposition();
handbookReferenceDecorator.testClassDecorator();
