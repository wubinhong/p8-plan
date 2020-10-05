import { Color, Car, identity } from './sub';

const newCar = new Car<string>(Color.GREEN, 300, 'This is comment!');
console.log(`color: ${newCar.color}`);
console.log(`price: ${newCar.price}`);
newCar.addEgg('New Egg!');
newCar.switchEgg('Kevin Egg');
console.log(newCar.getEgg());
let r = identity(newCar);
console.log(`Identify result`);
console.log(r);

class Grid {
    static origin = { x: 0, y: 0 };

    calculateDistanceFromOrigin(point: { x: number; y: number }) {
        let xDist = point.x - Grid.origin.x;
        let yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }

    constructor(public scale: number) {}
}

let grid1 = new Grid(1.0); // 1x scale
let grid2 = new Grid(5.0); // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));

