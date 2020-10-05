export enum Color {
    RED,
    GREEN,
    BLUE,
    BLACK,
}

export class Car<T> {
    egg: T;
    score: number;
    private desc: string;
    constructor(public color: Color, public price: number, comment: string) {
        console.log(`Create new field price: ${price}`);
        this.desc = `Color: ${color} | ${price} | ${comment}`;
    }

    getDesc() {
        return this.desc;
    }

    addEgg(egg: T) {
        console.log(`Receive egg: ${egg}`);
        this.egg = egg;
    }

    switchEgg(anotherEgg: T): T {
        console.log(`Switch new egg and old egg: ${anotherEgg} | ${this.egg}`);
        return anotherEgg;
    }

    getEgg() {
        return this.egg;
    }

}

export function identity<T>(arg: Car<T>): Car<T> {
    console.log(`Identity entity: ${JSON.stringify(arg)}`);
    return arg;
}
