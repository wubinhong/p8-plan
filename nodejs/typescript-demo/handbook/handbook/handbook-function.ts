/**
 * All demonstration relevent with function
 */
export class HandbookFunction {
    /**
     * Functions
     */
    testFuncType() {
        function add(x: number, y: number): number {
            return x + y;
        }
        console.log(add(2, 3));
        let myAdd = function (x: number, y: number): number {
            return x + y;
        };
        console.log(myAdd(2, 3));
        // Let’s write the full type of the function out by looking at each piece of the function type.
        let myAdd2: (a: number, b: number) => number = function (x: number, y: number): number {
            return x + y;
        };
        console.log(myAdd2(2, 3));
        // Another coding pattern for full type of function. Interesting, hug?
        let myAdd22: { (a: number, b: number): number } = myAdd2;
        console.log(myAdd22(2, 3));
        // Variation of the typed function above.
        let myAdd3: (a: number, b: number) => number = function (x: number): number {
            return x;
        };
        console.log(myAdd3(2, 3));
    }

    /**
     * Optional and Default Parameters
     */
    testOptAndDefaultPara() {
        function buildName(firstName: string, lastName?: string): string {
            if (lastName) return firstName + ' ' + lastName;
            else return firstName;
        }
        console.log(buildName('kevin'));
        console.log(buildName('kevin', 'wu'));
        // console.log(buildName('kevin', 'wu', 'other'));

        function buildName2(firstName: string, lastName = 'Smith') {
            return firstName + ' ' + lastName;
        }
        console.log(buildName2('kevin'));
        console.log(buildName2('kevin', 'wu'));
    }

    /**
     * Rest Parameters / Variable Parameters
     */
    testRestPara() {
        function buildName(firstName: string, ...restOfName: string[]) {
            return firstName + ' ' + restOfName.join(' ');
        }
        // employeeName will be "Joseph Samuel Lucas MacKinzie"
        console.log(buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie'));
        let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
        console.log(buildNameFun('Joseph', 'Samuel', 'Lucas', 'MacKinzie'));

        function buildName2(firstName: string, restOfName: string[]) {
            return firstName + ' ' + restOfName.join(' ');
        }
        console.log(buildName2('Joseph', ['Samuel', 'Lucas', 'MacKinzie']));
    }

    /**
     * This
     */
    testThis() {
        let deck = {
            suits: ['hearts', 'spades', 'clubs', 'diamonds'],
            cards: Array(52),
            createCardPicker: function () {
                // createCardPicker: function (this: void) {    // // make sure `this` is unusable in this standalone function
                // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
                console.log('createCardPicker ');
                return () => {
                    console.log('createCardPicker func execute');
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);
                    return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
                };
            },
        };

        let cardPicker = deck.createCardPicker();
        console.log(cardPicker);
        console.log(cardPicker());
    }
}

let handbookFunction = new HandbookFunction();
handbookFunction.testFuncType();
handbookFunction.testOptAndDefaultPara();
handbookFunction.testRestPara();
handbookFunction.testThis();
