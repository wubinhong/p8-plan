/**
 * This is a sub module playing a support role for the module.ts
 */
// Export original validator but rename it
import { ZipCodeValidator as ZipCodeValidator2 } from './module_sub2/index';

export function hello(w = 'Hello!'): string {
    console.log(`Sub module say invoked! ${w}`);
    return w;
}

export interface StringValidator {
    isAcceptable(s: string): boolean;
}

export function getZipCodeValidator2() {
    return ZipCodeValidator2;
}
