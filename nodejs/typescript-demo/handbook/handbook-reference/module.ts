import { hello, getZipCodeValidator2 } from './module_sub';
import { ZipCodeValidator, mainValidator } from './module_sub2';
import * as multi from './module_sub2/muti';

class HandbookReferModule {
    testModuleFunc() {
        hello();
        hello('Hey, 你好啊!');
    }
    testValidator() {
        console.log(mainValidator === ZipCodeValidator);
        console.log(mainValidator === getZipCodeValidator2());
    }
    testMulti() {
        let p = new multi.ModuleSub2Person();
        console.log(`testMulti: ${JSON.stringify(p)} | ${p.getUsername()}`);
    }
}

// Execution begin from here.
let handbookReferModule = new HandbookReferModule();
handbookReferModule.testModuleFunc();
handbookReferModule.testValidator();
handbookReferModule.testMulti();
