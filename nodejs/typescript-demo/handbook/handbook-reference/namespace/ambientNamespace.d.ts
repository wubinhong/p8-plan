/**
 * We call declarations that don’t define an implementation “ambient”. Typically these are defined in .d.ts files.
 * If you’re familiar with C/C++, you can think of these as .h files. Let’s look at a few examples.
 */
declare namespace D3 {
    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }
}

declare var d3: D3.Base;
