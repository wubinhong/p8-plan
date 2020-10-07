/**
 * Enums are one of the few features TypeScript has which is not a type-level extension of JavaScript.
 * Enums allow a developer to define a set of named constants. Using enums can make it easier to document intent,
 * or create a set of distinct cases. TypeScript provides both numeric and string-based enums.
 */
export class HandbookEnum {
    /**
     * Numeric enums
     */
    testNumbericEnums() {
        // All of the following members are auto-incremented from that point on.
        enum Direction {
            Up,
            Down,
            Left,
            Right,
        }
        console.log(Direction);
        console.log(Direction['1'], Direction.Down);
        enum Direction2 {
            Up = 1,
            Down,
            Left = 5,
            Right,
        }
        console.log(Direction2.Down);
        console.log(Direction2.Right);

        enum UserResponse {
            No = 0,
            Yes = 1,
        }
        function respond(recipient: string, message: UserResponse): void {
            console.log(recipient, message);
        }
        respond('Princess Caroline', UserResponse.Yes);
    }
    /**
     * String enums
     */
    testStringEnums() {
        enum Direction {
            Up = 'UP',
            Down = 'DOWN',
            Left = 'LEFT',
            Right = 'RIGHT',
        }
        console.log(Direction.Down);

        // Heterogeneous enums
        enum BooleanLikeHeterogeneousEnum {
            No = 0,
            Yes = 'YES',
        }
        console.log(BooleanLikeHeterogeneousEnum.No, BooleanLikeHeterogeneousEnum.Yes);

        // Computed and constant members
        // All enum members in 'E1' and 'E2' are constant.
        enum E1 {
            X,
            Y,
            Z,
        }
        enum E2 {
            A = 1,
            B,
            C,
        }
        console.log(E1.Z, E2.B);
        // console.log(E1.Z == E2.B);
        enum FileAccess {
            // constant members
            None,
            Read = 1 << 1,
            Write = 1 << 2,
            ReadWrite = Read | Write,
            // computed member
            G = '123'.length,
        }
        console.log(FileAccess.None, FileAccess.G);
    }

    /**
     * Union enums and enum member types
     */
    testUnionAndMemberTypes() {
        enum ShapeKind {
            Circle,
            Square,
        }
        interface Circle {
            kind: ShapeKind.Circle;
            radius: number;
        }
        interface Square {
            kind: ShapeKind.Square;
            sideLength: number;
        }
        let c: Circle = {
            // kind: ShapeKind.Square,
            kind: ShapeKind.Circle,
            radius: 100,
        };
        console.log(c);

        enum E {
            Foo,
            Bar,
            Jack,
        }
        function f(x: E) {
            /* // This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
            if (x !== E.Foo || x !== E.Bar) {
                //
            } */
        }
    }

    /**
     * Enums at runtime or compile time.
     */
    testEnumsAtRunOrCompileTime() {
        // Enums at runtime
        enum E {
            X,
            Y,
            Z,
        }
        function f(obj: { X: number }) {
            return obj.X;
        }
        // Works, since 'E' has a property named 'X' which is a number.
        f(E);

        // Enums at compile time
        /**
         * {
            '0': 'ERROR',
            '1': 'WARN',
            '2': 'INFO',
            '3': 'DEBUG',
            ERROR: 0,
            WARN: 1,
            INFO: 2,
            DEBUG: 3
            }
         */
        enum LogLevel {
            ERROR,
            WARN,
            INFO,
            DEBUG,
        }
        /**
         * This is equivalent to:
         * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
         */
        type LogLevelStrings = keyof typeof LogLevel;
        function printImportant(key: LogLevelStrings, message: string) {
            const num = LogLevel[key];
            if (num <= LogLevel.WARN) {
                console.log('Log level key is:', key);
                console.log('Log level value is:', num);
                console.log('Log level message is:', message);
            }
        }
        printImportant('ERROR', 'This is a message');
    }
    /**
     * Reverse mappings
     */
    testReverseMappings() {
        // Source
        function src() {
            enum Enum {
                A,
            }
            console.log(Enum);
            let a = Enum.A;
            let nameOfA = Enum[a]; // "A"
            console.log(nameOfA);
        }
        src();

        // Inspect the source process in typescript.
        // TypeScript compiles this down to the following JavaScript:
        function compiled() {
            'use strict';
            var Enum;
            (function (E) {
                E[(E['A'] = 0)] = 'A';
            })(Enum || (Enum = {}));
            console.log(Enum);
            let a = Enum.A;
            let nameOfA = Enum[a]; // "A"
            console.log(nameOfA);
        }
        compiled();
    }
    /**
     * const
     */
    testConst() {
        const enum Enum {
            A = 3,
            B = A * 2,
        }
        // 'const' enums can only be used in property or index access expressions
        // or the right hand side of an import declaration or export assignment or type query.
        // console.log(Enum);
        console.log(Enum.A, Enum.B);

        const enum Direction {
            Up,
            Down,
            Left,
            Right,
        }
        let directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
        console.log(directions);
    }
}

let handbookEnum = new HandbookEnum();
handbookEnum.testNumbericEnums();
handbookEnum.testStringEnums();
handbookEnum.testUnionAndMemberTypes();
handbookEnum.testEnumsAtRunOrCompileTime();
handbookEnum.testReverseMappings();
handbookEnum.testConst();
