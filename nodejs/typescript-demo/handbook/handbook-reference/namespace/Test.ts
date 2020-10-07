/**
 * Note. This file can't be executed directly. To do so, firstly, we can use concatenated output using the --outFile flag
 * to compile all of the input files into a single JavaScript output file, and then execute the js file directly using node.
 * $ tsc --outFile sample.js Test.ts
 * $ node sample.js
 */
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// Some samples to try
let strings = ['Hello', '98052', '101'];

// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators['ZIP code'] = new Validation.ZipCodeValidator();
validators['Letters only'] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(`"${s}" - ${validators[name].isAcceptable(s) ? 'matches22' : 'does not match'} ${name}`);
    }
}
