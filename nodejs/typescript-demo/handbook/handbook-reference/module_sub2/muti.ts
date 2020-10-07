/**
 * Demonstrate how to import the entire module into a single variable, and use it to access the module exports
 */
export class ModuleSub2Person {
    username = 'kevin';
    getUsername(): string {
        return this.username;
    }
}

export const moudleSub2Name = 'This is module sub2.';
