/**
 * Collection all advanced usage of typescript.
 */
export class AdvanceGeneric {
    testGeneric() {
        /**
         * Junior type defination
         */
        type Partial2<T> = {
            [k: string]: T;
        };
        let partial2: Partial2<number> = { key1: 1 /* key2: '2', key3: true */ };
        console.log(`testGeneric.partial2: ${partial2}`);

        /**
         * Make all properties in T optional
         */
        type Partial<T> = {
            [P in keyof T]?: T[P];
        };
        interface Person {
            name: string;
            age?: number;
        }
        let partial: Partial<Person> = { age: 23 };
        console.log(`testGeneric.partial: ${partial.age} | ${partial.name}`);
        interface PartialExt extends Partial<Person> {
            extraField: string;
        }
        let partialExt: PartialExt = { age: 23, extraField: 'This is common' };
        console.log(`testGeneric.partialExt: ${partialExt.name} | ${partialExt.age} | ${partialExt.extraField}`);

        /**
         * Generic extent
         */
        interface ServiceSettingSchema {
            loggerLevel: 'debug' | 'info' | 'warn' | 'error';
        }
        interface ServiceSchema<S = ServiceSettingSchema> {
            name: string;
            version?: string | number;
            settings?: S;
        }
        let serviceSchema: ServiceSchema = { name: 'pet', settings: { loggerLevel: 'error' } };
        console.log(`testGeneric.serviceSchema: ${serviceSchema.settings} | ${serviceSchema.version}`);
        interface Options extends Partial<ServiceSchema> {
            name2?: string;
        }
        // Usage
        let opts: Options = {}; // Empty object is Okay.
        opts = { name: 'planet', name2: 'planet2', version: '1.2.3', settings: { loggerLevel: 'error' } };
        console.log(`testGeneric.opts: ${JSON.stringify(opts)}`);
    }

    testClass() {
        class Peron {
            name: string;
        }
        class Man extends Peron {
            constructor(public age: number) {
                super();
            }
        }
    }

}

let advanceGeneric = new AdvanceGeneric();
advanceGeneric.testGeneric();
